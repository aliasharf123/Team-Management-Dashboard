"use client";
import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import React, { useState } from "react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isSelected, setIsSelected] = useState(theme == "dark " ? false : true);

  const changeTheme = () => {
    if (isSelected) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setIsSelected(!isSelected);
  };

  return (
    <Switch
      defaultSelected
      size="md"
      color="primary"
      className=" px-6 "
      onClick={changeTheme}
      thumbIcon={({ className }) =>
        isSelected ? (
          <FiSun onClick={() => setTheme("dark")} className={className} />
        ) : (
          <FaMoon onClick={() => setTheme("light")} className={className} />
        )
      }
    >
      {theme} mode
    </Switch>
  );
}
