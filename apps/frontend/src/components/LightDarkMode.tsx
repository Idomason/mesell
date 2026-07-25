"use client";

import { Sun } from "lucide-react";
import { Button } from "./ui/button";
import { BsMoonFill } from "react-icons/bs";
import { useState } from "react";

export default function LightDarkMode() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="p-1 bg-gray-50 rounded-full">
      {isDark ? (
        <Button
          onClick={() => setIsDark((prev) => !prev)}
          className="h-8 w-8 rounded-full bg-gray-300 border border-gray-300"
          size={"icon"}
        >
          <Sun />
        </Button>
      ) : (
        <Button
          onClick={() => setIsDark((prev) => !prev)}
          className="h-8 w-8 rounded-full bg-gray-500 border border-gray-300"
          size={"icon"}
        >
          <BsMoonFill />
        </Button>
      )}
    </div>
  );
}
