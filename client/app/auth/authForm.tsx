"use client";
import Image from "next/image";
import React, { useState } from "react";
import google from "@/public/google.png";
import { setCookies } from "@/lib/actions/AuthCookies";
import Link from "next/link";
import { Button, Checkbox, Divider, Input, button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { RiEyeFill } from "react-icons/ri";
import { RiEyeCloseFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+!]).{8,}$/, {
        message: (obj) => {
          const value = obj.value;
          const missingChars = [];
          const requiredChars = [
            "lowercase letter",
            "uppercase letter",
            "number",
            "special character",
          ];

          // Check for missing character categories
          if (!/[a-z]/.test(value)) missingChars.push(requiredChars[0]);
          if (!/[A-Z]/.test(value)) missingChars.push(requiredChars[1]);
          if (!/\d/.test(value)) missingChars.push(requiredChars[2]);
          if (!/[@#$%^&*()_+!]+/.test(value))
            missingChars.push(requiredChars[3]);

          // Construct a clear and informative error message
          let message = "Password must contain: ";
          if (missingChars.length === 1) {
            message += missingChars[0];
          } else if (missingChars.length > 1) {
            message +=
              missingChars.slice(0, -1).join(", ") +
              " and " +
              missingChars[missingChars.length - 1];
          }
          return message;
        },
      }),
  })
  .required();

export default function Form({ isSignIn }: { isSignIn?: boolean }) {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = (e: any) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  // sign in with google provider
  const signInWithGoogle = () => {};

  function validatePassword(password: string): boolean {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+!]).{8,}$/.test(
        password
      )
    ) {
      const invalidRules: string[] = [];
      if (password.length < 8) {
        invalidRules.push("Password should be at least 8 characters long.");
      }
      if (!/[a-z]/.test(password)) {
        invalidRules.push(
          "Password should contain at least one lowercase letter."
        );
      }
      if (!/[A-Z]/.test(password)) {
        invalidRules.push(
          "Password should contain at least one uppercase letter."
        );
      }
      if (!/\d/.test(password)) {
        invalidRules.push("Password should contain at least one digit.");
      }
      if (!/[@#$%^&*()_+!]/.test(password)) {
        invalidRules.push(
          "Password should contain at least one special character (e.g., @#$%^&*()_+!)."
        );
      }
      setError(`Password is not valid. ${invalidRules.join(" ")}`);
      return false;
    }
    return true;
  }

  // sign in with email and password
  const signInWithPassWord = handleSubmit(async (data) => {
    console.log(data);
    // make a data object using form data

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
      body: JSON.stringify(data),
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
  });
  return (
    <div className="text-foreground flex w-full max-w-sm flex-col items-center gap-4 p-4">
      <div className="w-full text-left">
        <h1 className="pb-2 text-xl font-medium">
          {!isSignIn ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-small text-default-500">
          {isSignIn
            ? "Log in to your account to continue"
            : "Sign up for a new account to get started"}
        </p>
      </div>
      <div className="flex w-full flex-col gap-2">
        <Button startContent={<FcGoogle size={23} />} variant="bordered">
          Continue with Google
        </Button>
        <Button startContent={<FaGithub size={23} />} variant="bordered">
          Continue with Github
        </Button>
      </div>
      <div className="flex w-full items-center gap-4 py-2">
        <Divider className="bg-divider border-none w-full h-divider flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="bg-divider border-none w-full h-divider flex-1" />
      </div>
      <form
        onSubmit={signInWithPassWord}
        className="flex w-full flex-col gap-3"
      >
        {Boolean(error) && (
          <div className="text-danger text-small">{error}</div>
        )}

        <Input
          variant="underlined"
          type="email"
          isInvalid={Boolean(errors.email)}
          {...register("email")}
          radius="none"
          placeholder="Enter your email"
          errorMessage={errors.email?.message}
          label="Email Address"
        />
        <Input
          variant="underlined"
          type={isVisible ? "text" : "password"}
          {...register("password")}
          isInvalid={Boolean(errors.password)}
          errorMessage={errors.password?.message}
          radius="none"
          endContent={
            !isVisible ? (
              <button onClick={toggleVisibility}>
                <RiEyeFill size={20} />
              </button>
            ) : (
              <button onClick={toggleVisibility}>
                <RiEyeCloseFill size={20} />
              </button>
            )
          }
          placeholder={isSignIn ? "Enter your password" : "Create password"}
          label="Password"
        />
        {!isSignIn ? (
          <Checkbox className="py-4" isRequired defaultSelected size="sm">
            I agree with the <span className="text-primary">Terms</span> and{" "}
            <span className="text-primary">Privacy Police</span>
          </Checkbox>
        ) : (
          <div className="flex justify-between items-center text-default-500">
            <Checkbox className="py-4" isRequired defaultSelected size="sm">
              Remember for 15 days
            </Checkbox>
            <Link href="#" className="text-small">
              Forget your password?
            </Link>
          </div>
        )}
        <Button isLoading={isLoading} type="submit" color="primary">
          {isSignIn ? "Log In" : "Sign Up"}
        </Button>
      </form>
      <div className="text-center text-small">
        <span>
          {isSignIn ? "Need to create an account?" : "Already have account ?"}
        </span>{" "}
        <Link
          className="text-primary"
          href={`/auth/${isSignIn ? "signup" : "login"}`}
        >
          {isSignIn ? "Sign Up" : "Log In"}
        </Link>
      </div>
    </div>
  );
}
