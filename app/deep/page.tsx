'use client';

import { useState } from "react";

export default function DeepgramTranscript() {
  const [transcript, setTranscript] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranscribe = async () => {
    if (!file) {
      setError("Please select a file");
      return;
    }

    setLoading(true);
    setError("");
    setTranscript("");

    try {
      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Transcription failed");
      }

      const data = await response.json();

      const text =
        data?.results?.channels?.[0]?.alternatives?.[0]?.transcript;

      setTranscript(text || "No transcript found.");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Deepgram Audio Transcription</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTranscribe();
        }}
      >
        <input
          type="file"
          accept=".mp3,audio,.mp4/*"
          onChange={(e) => {
            setError("");

            if (e.target.files?.[0]) {
              setFile(e.target.files[0]);
            }
          }}
        />

        {file && (
          <p>
            Selected: <strong>{file.name}</strong>
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Transcribing..."
            : "Transcribe Audio"}
        </button>

        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
          }}
        >
          <h3>Result:</h3>
          <p>{transcript}</p>
        </div>
      </form>
    </div>
  );
}