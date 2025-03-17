"use client";

import React from "react";
import Link from "next/link";

type AnimationStyle =
  | "slide-right"
  | "slide-left"
  | "slide-center"
  | "grow"
  | "fade";

interface AnimatedButtonProps {
  href: string;
  children: React.ReactNode;
  animationStyle?: AnimationStyle;
  className?: string;
}

const AnimatedButton = ({
  href,
  children,
  animationStyle = "slide-right",
  className = "",
}: AnimatedButtonProps) => {
  // Different border animation styles
  const borderAnimations = {
    "slide-right": `
      after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 
      after:bg-blue-500 dark:after:bg-blue-400 
      after:transition-all after:duration-300 after:ease-out 
      hover:after:w-full
    `,
    "slide-left": `
      after:absolute after:right-0 after:bottom-0 after:h-0.5 after:w-0 
      after:bg-blue-500 dark:after:bg-blue-400 
      after:transition-all after:duration-300 after:ease-out 
      hover:after:w-full hover:after:right-auto hover:after:left-0
    `,
    "slide-center": `
      after:absolute after:left-1/2 after:bottom-0 after:h-0.5 after:w-0 
      after:bg-blue-500 dark:after:bg-blue-400 
      after:transition-all after:duration-300 after:ease-out 
      hover:after:w-full hover:after:left-0
    `,
    grow: `
      after:absolute after:left-0 after:bottom-0 after:h-0 after:w-full 
      after:bg-blue-500 dark:after:bg-blue-400 
      after:transition-all after:duration-300 after:ease-out 
      hover:after:h-0.5
    `,
    fade: `
      after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full 
      after:bg-blue-500 dark:after:bg-blue-400 
      after:opacity-0 after:transition-opacity after:duration-300 
      hover:after:opacity-100
    `,
  };

  return (
    <Link
      href={href}
      className={`
        relative inline-block px-6 py-3 overflow-hidden group
        bg-white dark:bg-transparent text-gray-800 dark:text-gray-200
        transition-colors duration-300 border border-transparent
        ${borderAnimations[animationStyle]}
        ${className}
      `}
    >
      <span className="relative inline-block z-10">{children}</span>
    </Link>
  );
};

export default AnimatedButton;
