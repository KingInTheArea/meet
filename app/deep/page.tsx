// app/deep/deep.tsx
'use client'; // Required since we are using state and user interaction

import { useState } from "react";

export default function DeepgramTranscript() {
  const [transcript, setTranscript] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleTranscribe = async () => {
    setLoading(true);
    setTranscript("");
    
    try {
      // Call your backend API route
      const response = await fetch("/api/transcribe");
      const data = await response.json();

      // Extract the text string from Deepgram's nested response object
      const text = data?.results?.channels[0]?.alternatives[0]?.transcript;
      
      setTranscript(text || "No transcript found.");
    } catch (error) {
      console.error("Error fetching transcription:", error);
      setTranscript("Failed to fetch transcription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deepgram Audio Transcription</h1>
      <button 
        onClick={handleTranscribe} 
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Transcribing..." : "Transcribe Audio"}
      </button>

      <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
        <h3>Result:</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
}
