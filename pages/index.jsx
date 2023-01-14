/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { getDatabase, ref, set, onValue } from "firebase/database";
import firebaseApp from "../helpers/firebaseApp";
import Switch from "@mui/material/Switch";

export default function Home() {
  const [database, setDatabase] = useState(null);
  const [ledState, setLedState] = useState(null);
  const [connected, setConnected] = useState(false);

  const label = { inputProps: { "aria-label": "Switch demo" } };

  useEffect(() => {
    (async () => {
      const database_ = getDatabase(firebaseApp);
      setDatabase(database_);
    })();
  }, []);

  useEffect(() => {
    if (database) {
      const starCountRef = ref(database, "/board/14");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setLedState(data);
        setConnected(true);
      });
    }
  }, [database]);

  const handleLedState = (state) => {
    const starCountRef = ref(database, "/board/14");
    set(starCountRef, state);
    setLedState(state);
  };

  return (
    <div className="h-screen bg-neutral-50">
      {connected ? (
        <div className="">
          <div className="fixed inset-0 z-10">
            <div className="p-5">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 9h16.5m-16.5 6.75h16.5"
                  />
                </svg>
                <button className="ml-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
              <h1 className="text-3xl font-bold text-neutral-700 mt-5">
                Home control
              </h1>
              <div className="mt-10 grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleLedState(ledState == 1 ? 0 : 1)}
                  className={`${
                    ledState == 1 ? "bg-green-500" : "bg-white"
                  } shadow-lg active:shadow-none shadow-slate-100 rounded-lg flex items-center p-5 transition-all`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class={`w-7 h-7 ${
                      ledState == 1 ? "text-white" : "text-sky-500"
                    }`}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                    />
                  </svg>
                  <div className="text-left ml-4">
                    <h1
                      className={`${
                        ledState == 1 ? "text-white" : "text-neutral-700"
                      } font-semibold text-lg`}
                    >
                      Led green
                    </h1>
                    <p
                      className={`${
                        ledState == 1 ? "text-neutral-100" : "text-neutral-500"
                      } text-xs mt-1`}
                    >
                      Connected
                    </p>
                  </div>
                </button>
                <button className="bg-white shadow-lg shadow-slate-100 rounded-lg flex items-center p-5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8101/8101858.png"
                    className="h-7 w-7"
                    alt=""
                  />
                  <div className="text-left">
                    <h1 className="text-neutral-700 font-semibold text-lg ml-5">
                      Fan
                    </h1>
                    <p className="text-neutral-500 text-xs ml-5 mt-1">
                      Connected
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
