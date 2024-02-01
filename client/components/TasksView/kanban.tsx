"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TaskCardContainer from "../TaskCardContainer";
import TaskCard from "../TaskCard";
import { motion } from "framer-motion";

const TASK_CARD_SIZE = 270;
const GAP = 32;

export default function Kanban() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<any>();

  const items = useMemo(() => [" ", " ", " ", " ", " ", " ", " "], []);
  useEffect(() => {
    setWidth(
      (TASK_CARD_SIZE + GAP) * items.length - carousel.current.offsetWidth
    );
  }, [items.length]);

  return (
    <motion.div
      ref={carousel}
      className="overflow-x-scroll element bg-[#F9F9FB] pt-2"
      whileTap={{ cursor: "grabbing" }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        className="flex  mt-4 "
      >
        {items.map((index) => (
          <TaskCardContainer key={index}>
            <TaskCard />
            <TaskCard files />
            <TaskCard note />
          </TaskCardContainer>
        ))}
      </motion.div>
    </motion.div>
  );
}
