import { TextField } from "@mui/material";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-white">
      <div className="relative">
        <img
          src="https://wallpaperaccess.com/full/4888668.jpg"
          className="brightness-50"
          alt=""
        />
        <div className="p-5 absolute bottom-0">
          <h1 className="text-3xl font-bold text-white mt-5">
            Login to Home control
          </h1>
          <p className="text-xs text-neutral-300 leading-5 mt-2">
            Take control of your home with this app.
          </p>
        </div>
      </div>

      <div className="p-5 mt-5">
        <div className="space-y-4">
          <TextField type={"email"} fullWidth label="Enter your email" />
          <TextField
            type={"password"}
            fullWidth
            label="Enter account password"
          />
        </div>
        <button className="bg-slate-900 w-full h-14 mt-7 rounded-full text-white font-semibold">
          Login
        </button>
      </div>
    </div>
  );
}
