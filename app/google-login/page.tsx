"use client";

import { supabase } from "@/lib/supabase";

export default function GoogleLoginPage() {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-800 p-8">
        <h1 className="mb-6 text-3xl font-bold">
          Google Login
        </h1>

        <button
          onClick={signInWithGoogle}
          className="w-full rounded bg-blue-600 py-3"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}