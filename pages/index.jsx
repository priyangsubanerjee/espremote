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
    <div className="h-screen">
      {connected ? (
        <div className="p-10">
          <h1 className="text-3xl text-slate-800 font-medium">
            Led state:{" "}
            <span className="text-blue-500">
              {ledState == 1 ? "ON" : "OFF"}
            </span>
          </h1>
          <div className="flex h-36 w-36 border items-center justify-center bg-neutral-50 rounded-lg mt-7">
            <Switch
              checked={ledState == 1}
              onChange={() => {
                handleLedState(ledState == 1 ? 0 : 1);
              }}
              {...label}
            />
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}
