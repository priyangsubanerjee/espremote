/* eslint-disable @next/next/no-img-element */
import { getDatabase, ref, set, onValue } from "firebase/database";
import React, { useEffect, useState } from "react";
import checkIfUserExists from "../helpers/account";
import firebaseApp from "../helpers/firebaseApp";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await checkIfUserExists();
      if (user) {
        const database_ = getDatabase(firebaseApp);
        const accRef = ref(database_, "/account");
        onValue(accRef, (snapshot) => {
          const data = snapshot.val();
          if (data.email === user.email && data.password === user.password) {
            router.push("/home");
          } else {
            setLoggedIn(false);
          }
        });
      } else {
        setLoggedIn(false);
      }
    })();
  }, []);

  return (
    <div className="h-screen w-screen bg-neutral-50 overflow-auto">
      {!loggedIn && (
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

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const database = getDatabase(firebaseApp);
              const accRef = ref(database, "/account/");
              onValue(accRef, (snapshot) => {
                const data = snapshot.val();
                if (data.email === email && data.password === password) {
                  localStorage.setItem("auth", JSON.stringify(data));
                  window.location.href = "/home";
                }
              });
            }}
          >
            <div className="mt-10 w-full bg-white rounded-xl border overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                className="p-4 border-b w-full outline-none"
                name=""
                id=""
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your account password"
                className="p-4 border-b-0 w-full outline-none"
                name=""
                id=""
              />
            </div>
            <button
              type="submit"
              className="w-full mt-5 text-center p-3 active:bg-blue-600 text-white rounded-xl bg-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
