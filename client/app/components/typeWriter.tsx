"use client";
import React from "react";
import TypeWriter from "typewriter-effect";
export default function TypeWriterClient() {
  return (
    <TypeWriter
      onInit={(typeWriter) => {
        typeWriter
          .typeString("real time editing")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Share a tasks with people")
          .pauseFor(1000)
          .deleteAll()
          .typeString("Mange your own time")
          .start();
      }}
    />
  );
}
