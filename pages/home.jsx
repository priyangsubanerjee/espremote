import { Switch } from "@mui/material";
import { getDatabase, ref, set, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import firebaseApp from "../helpers/firebaseApp";

function Home() {
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
              <p className="text-xs text-neutral-500 leading-5 mt-2">
                Take control of your home with this app.
              </p>
              <div className="mt-10 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => handleLedState(ledState == 1 ? 0 : 1)}
                  className={`${
                    ledState == 1
                      ? "bg-green-500 shadow-lg active:shadow-none shadow-green-200"
                      : "bg-white shadow-lg active:shadow-none shadow-slate-100"
                  } s rounded-lg flex flex-col space-y-4 items-center py-4 transition-all`}
                >
                  <i
                    class={`bi bi-lightbulb text-3xl ${
                      ledState == 1 ? "text-white" : "text-green-500"
                    }`}
                  ></i>
                  <div className="text-left">
                    <p
                      className={`${
                        ledState == 1 ? "text-white" : "text-neutral-600"
                      } text-sm font-medium`}
                    >
                      Led Green
                    </p>
                  </div>
                </button>
                <button
                  className={`${
                    false == 1
                      ? "bg-sky-500 shadow-lg active:shadow-none shadow-sky-200"
                      : "bg-white shadow-lg active:shadow-none shadow-slate-100"
                  } s rounded-lg flex flex-col space-y-4 items-center py-4 transition-all`}
                >
                  <i class="bi bi-fan text-3xl text-green-500"></i>
                  <div className="text-left">
                    <p
                      className={`${
                        false == 1 ? "text-white" : "text-neutral-600"
                      } text-sm font-medium`}
                    >
                      Fan
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

export default Home;
