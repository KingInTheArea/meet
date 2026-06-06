// app/api/transcribe/route.ts
import { NextResponse } from "next/server";
import { DeepgramClient } from "@deepgram/sdk";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // 1. Locate the file in your project's public folder
    const filePath = path.join(process.cwd(), "public", "sample.mp3");

    // Check if the file actually exists to avoid unexpected errors
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found at: ${filePath}. Please make sure 'sample.mp3' is in your public folder.` },
        { status: 404 }
      );
    }

    // 2. Read the file into a Node.js Buffer
    const buffer = fs.readFileSync(filePath);

    // 3. Initialize Deepgram
    const deepgram = new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY });

    // 4. Send the local file buffer to Deepgram
    const result = await deepgram.listen.v1.media.transcribeFile(
      buffer,
      {
        model: "nova-2",
        smart_format: true,
      },
    //   {
    //     mimetype: "audio/mp3", // Change this to match your file extension (e.g., audio/wav)
    //   }
    );

    return NextResponse.json(result);
  } catch (err: any) {
    console.error("Deepgram Backend Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}