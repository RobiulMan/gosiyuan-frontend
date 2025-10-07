"use client";
import { useEffect, useState } from "react";
import ThemeToggleBtn from "../ThemeToggleBtn";

export default function FloatingThemeToggle() {
  const [showWiggle, setShowWiggle] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWiggle(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in zoom-in duration-500">
      <div
        className={`
          shadow-lg rounded-full 
          hover:scale-110 transition-all duration-200
          ${showWiggle ? "animate-wiggle" : ""}
        `}
      >
        <ThemeToggleBtn />
      </div>
    </div>
  );
}
