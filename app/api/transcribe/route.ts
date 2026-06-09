// app/api/transcribe/route.ts

import { NextResponse } from "next/server";
import { DeepgramClient } from "@deepgram/sdk";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("audio") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // console.log("Uploaded file:", file.name);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const deepgram = new DeepgramClient({
      apiKey: process.env.DEEPGRAM_API_KEY,
    });

    const result = await deepgram.listen.v1.media.transcribeFile(
      buffer,
      {
        model: "nova-3",
        language: "multi",
        // detect_language: true,
        smart_format: true,
      }
    );
    // console.log(JSON.stringify(result, null, 2));

return NextResponse.json(result);

    
  } catch (err: any) {
    console.error("Deepgram Backend Error:", err);

    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}