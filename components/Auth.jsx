import { TextField } from "@mui/material";
import React from "react";

function Auth() {
  return (
    <div className="h-screen w-screen bg-white z-20 fixed inset-0">
      <img
        src="https://lightrun.com/wp-content/uploads/2021/04/Lightrun_-_Blog_hero__top_10_build_automation_tools_1.jpeg"
        alt=""
      />
      <div className="p-5">
        <h1 className="text-3xl font-bold text-neutral-700 mt-5">
          Login to Home control
        </h1>
        <p className="text-xs text-neutral-500 leading-5 mt-2">
          Take control of your home with this app.
        </p>
        <div className="mt-10">
          <TextField fullWidth label="Enter password" />
          <button className="text-lg font-semibold w-full bg-blue-500 p-3 mt-4 text-white rounded">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
