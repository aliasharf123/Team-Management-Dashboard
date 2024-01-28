"use client";
import Image from "next/image";
import React, { useState } from "react";
import google from "@/public/google.png";
import { setCookies } from "@/lib/actions/AuthCookies";
export default function Form() {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // sign in with google provider
  const signInWithGoogle = () => {};

  // function validatePassword(password: string): boolean {
  //   if (
  //     !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+!]).{8,}$/.test(
  //       password
  //     )
  //   ) {
  //     const invalidRules: string[] = [];
  //     if (password.length < 8) {
  //       invalidRules.push("Password should be at least 8 characters long.");
  //     }
  //     if (!/[a-z]/.test(password)) {
  //       invalidRules.push(
  //         "Password should contain at least one lowercase letter."
  //       );
  //     }
  //     if (!/[A-Z]/.test(password)) {
  //       invalidRules.push(
  //         "Password should contain at least one uppercase letter."
  //       );
  //     }
  //     if (!/\d/.test(password)) {
  //       invalidRules.push("Password should contain at least one digit.");
  //     }
  //     if (!/[@#$%^&*()_+!]/.test(password)) {
  //       invalidRules.push(
  //         "Password should contain at least one special character (e.g., @#$%^&*()_+!)."
  //       );
  //     }
  //     setError(`Password is not valid. ${invalidRules.join(" ")}`);
  //     return false;
  //   }
  //   return true;
  // }

  // sign in with email and password
  const signInWithPassWord = async (event: any) => {
    event.preventDefault();
    // make a data object using form data
    const form = new FormData(event.target);
    const formData: { email: string; password: string } = Object.fromEntries(
      form.entries()
    ) as any;

    if (formData.email && formData.password) {
      // // vaildate a password
      // if (!validatePassword(formData.password)) {
      //   return;
      // }

      // start loading
      setIsLoading(true);
      // made a url according to `isSignIn` state
      const fetchUrl =
        process.env.NEXT_PUBLIC_Server_Url +
        "auth/" +
        `${isSignIn ? "signin" : "signup"}`;
      // post fetch request
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const error = await res.json();
        setError(error.message);
        setIsLoading(false);
        return;
      }
      // return a jwt access token
      const jwtToken = await res.json();
      await setCookies(jwtToken.access_token);
      // remove error
      setError("");
      // end loading
      setIsLoading(false);
    } else {
      setError("insert your details");
    }
  };
  return (
    <div className="flex flex-col gap-7 w-[25rem] ">
      {/* title and navigate to another auth method */}
      <div className="font-semibold w-full flex justify-between">
        <h1 className="text-3xl">{isSignIn ? "Sign In" : "Sign up"}</h1>
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-blue-600 "
        >
          <span className="text-Secondary-text-silver">or </span>
          {isSignIn ? "create an account " : "aleardy have account"}
        </button>
      </div>
      {/* sign in with google section */}
      <div className=" flex flex-col gap-3 ">
        <button
          onClick={signInWithGoogle}
          className="bg-SeaSalt shadow rounded-md w-full p-2 text-black flex font-bold justify-center items-center gap-2"
        >
          <Image src={google} width={20} height={20} alt="google" />
          <h1>Log in with Google</h1>
        </button>
      </div>
      {/* Break */}
      <div className="text-Secondary-text-silver text-center">
        <span>or</span>
      </div>
      {/* Form with email and password */}
      <form onSubmit={signInWithPassWord} className="flex flex-col gap-4">
        <input
          name="email"
          type="email"
          className="inputAuth"
          placeholder="Email"
        />
        <input
          name="password"
          type="password"
          className="inputAuth"
          placeholder="Password"
        />
        {/* error meesage */}
        {Boolean(error) && (
          <h1 className="text-red-600 font-semibold">{error}</h1>
        )}
        <div className="flex justify-between items-center">
          <button className="text-Secondary-text-silver underline text-sm">
            Forget your password?
          </button>
          {!isLoading ? (
            <button
              type="submit"
              className="bg-Blue-NCS text-white font-semibold px-5 rounded-md hover:brightness-90 duration-200 py-2"
            >
              {isSignIn ? "Sign In" : "Sign up"}
            </button>
          ) : (
            <button className="bg-Secondary-text-silver text-white font-semibold px-5 rounded-md hover:brightness-90 duration-200 py-2">
              {isSignIn ? "Signing In..." : "Signing up..."}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
