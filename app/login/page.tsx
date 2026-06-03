"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const signUp = async () => {
  console.log("Trying signup...");

  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
  });

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created!");
};
const signIn = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

 if (error) {
  console.log(error);
  alert(error.message);
  return;
}

  alert("Logged in!");
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-xl border border-slate-800 p-8">
        <h1 className="text-3xl font-bold mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h1>
        <p className="mb-4">
  Current Mode: {isLogin ? "LOGIN" : "SIGNUP"}
</p>

        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 rounded bg-slate-900 p-3"
/>

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 rounded bg-slate-900 p-3"
        />

        <button
  onClick={isLogin ? signIn : signUp}
  className="w-full rounded bg-emerald-600 py-3"
>
  {isLogin ? "Sign In" : "Sign Up"}
</button>

<button
  onClick={async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);
  }}
  className="mt-4 w-full rounded border border-slate-700 py-3"
>
  Check User
</button>
<button
  onClick={() => setIsLogin(!isLogin)}
  className="mt-4 text-sm text-emerald-400"
>
  {isLogin
    ? "Need an account? Sign Up"
    : "Already have an account? Sign In"}
</button>
      </div>
    </div>
  );
}