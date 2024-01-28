"use client";
import useUser from "@/hooks/useUser";
import { getCookies } from "@/lib/actions/AuthCookies";
import { set } from "mongoose";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
export default function Page() {
  const params = useParams<{ projectId: string }>();
  const { data, loading, error, accessToken } = useUser<any>(
    `project/findProject/${params.projectId}`
  );
  const [loading1, setIsLoading] = useState(false);
  const [project, setProject] = useState(data);
  const [error1, setError] = useState<any>("");
  const [makeChange, setMakeChnage] = useState("");
  const [title, setTitle] = useState("");
  const socketRef = useRef<any>(null);
  const vis = project ?? data;

  const submit = (e: any) => {
    e.preventDefault();

    console.log(socketRef.current);
    socketRef.current?.emit("updateProject", {
      id: data._id,
      title: title,
    });
  };
  useEffect(() => {}, []);
  // event name 'projectUpdated'
  useEffect(() => {
    const socket = io("http://localhost:3333", {
      auth: {
        token: "Bearer " + accessToken,
      },
    }); // Replace with your server URL
    socketRef.current = socket;
    const projectUpdated = (value: any) => {
      console.log(value);
      setProject(value.updatedProject);
      setMakeChnage(value.updatedBy);
    };
    const exception = (value: any) => {
      console.log(value);
      setError(value.message);
    };
    socket.on("projectUpdated", projectUpdated);
    socket.on("exception", exception);
    return () => {
      socket.disconnect();
    };
  }, [accessToken]);

  if (loading1 || loading) return <h1>loading</h1>;
  if (error1 || error) return <h1>{error1 || error}</h1>;
  return (
    <div>
      <h1>{vis.title}</h1>
      {makeChange && <h1>{makeChange}</h1>}
      <form onSubmit={submit}>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">edit</button>
      </form>
    </div>
  );
}
