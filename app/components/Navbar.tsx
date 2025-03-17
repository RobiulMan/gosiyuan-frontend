"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, Search, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import ThemeToggleBtn from "./ThemeToggleBtn";
import AnimationButton from "./AnimationButton";

const categoiresMenu = [
  {
    name: "Home Chargers",
    href: "/home-charger",
  },
  {
    name: "Car Chargers",
    href: "/car-charger",
  },
  {
    name: " Wireless Chargers",
    href: "/wireless-charger",
  },
  {
    name: " Power Bank",
    href: "/power-bank",
  },
  {
    name: " Data Cable",
    href: "/data-cable",
  },

  {
    name: " Earphones & Speaker",
    href: "/earphones-speaker",
  },

  {
    name: " Aux Cable",
    href: "/aux-cable",
  },
];

const NavBar = () => {
  return (
    <nav className="w-full  bg-green-200 dark:bg-gray-800 sticky py-6  px-4 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between ">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-2">
          <div className=" rounded-md p-1">
            <Store />
          </div>
          <span className="text-xl font-bold text-foreground">
            EXCELLUSENSE LLC
          </span>
        </div>

        {/* Desktop Navigation */}

        <div
          className="
   bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  
          
         p-2 hidden md:flex items-center  border border-gray-100 rounded-4xl space-x-6 fixed  left-1/2 transform -translate-x-1/2"
        >
          <Link className="p-3 dark:text-gray-200  text-sm  " href="/">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center dark:hover:bg-transparent dark:hover:text-underline  dark:text-gray-200 space-x-1 text-muted-foreground hover:text-foreground"
              >
                <span>Categories</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categoiresMenu.map((category, index) => (
                <Link href={category.href} key={index}>
                  <DropdownMenuItem className="cursor-pointer">
                    {category.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/about"
            className="  text-sm dark:text-gray-200 text-muted-foreground hover:text-foreground"
          >
            About
          </Link>

          <Link
            href={"/contact"}
            className="  text-sm dark:text-gray-200 text-muted-foreground hover:text-foreground p-3"
          >
            Contact
          </Link>
        </div>

        <div className="flex">
          {/* Search Button */}
          <div className="hidden md:block">
            <Button className=" bg-transparent  dark:bg-transparent dark:text-white  cursor-pointer text-gray-900 hover:text-gray-500 hover:bg-transparent ">
              <Search size={20} />
            </Button>
          </div>

          {/* Theme Toggle Button */}
          <div className="hidden md:block">
            <ThemeToggleBtn />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <Button variant="ghost" className="justify-start">
                  Getting started
                </Button>
                <Button variant="ghost" className="justify-start">
                  Components
                </Button>
                <Button variant="ghost" className="justify-start">
                  Documentation
                </Button>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
                  Get Started
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
