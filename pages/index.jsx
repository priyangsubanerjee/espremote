import { TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    //router.push("/home");
  }, []);
  return (
    <div className="h-screen w-screen bg-neutral-50 overflow-auto">
      <div className="p-5 bg-transparent mt-10 flex flex-col items-center justify-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/9346/9346603.png"
          alt=""
          className="h-20 w-20"
        />
        <h1 className="text-2xl font-bold mt-8">Welcome to Home Control</h1>
        <p className="text-neutral-500 mt-2 text-sm leading-6">
          Take control of your home from anywhere.
        </p>

        <form action="">
          <div className="mt-10 w-full bg-white rounded-xl border overflow-hidden">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="p-4 border-b w-full"
              name=""
              id=""
            />
            <input
              type="password"
              placeholder="Enter your account password"
              className="p-4 border-b-0 w-full"
              name=""
              id=""
            />
          </div>
          <button className="w-full mt-5 text-center p-3 active:bg-blue-600 text-white rounded-xl bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
