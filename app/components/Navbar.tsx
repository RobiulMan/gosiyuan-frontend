import { ChevronDown, Heart, Menu, Search, Store } from "lucide-react";
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

const categoiresMenu = [
  {
    name: "Home Chargers",
    href: "/categories/home-chargers",
  },
  {
    name: "Car Chargers",
    href: "/categories/car-chargers",
  },
  {
    name: " Wireless Chargers",
    href: "/categories/wireless-chargers",
  },
  {
    name: " Power Bank",
    href: "/categories/power-bank",
  },
  {
    name: " Data Cable",
    href: "/categories/data-cable",
  },
  {
    name: " Earphones & Speaker",
    href: "/categories/earphones-and-speaker",
  },
  {
    name: " Multi Funcaitonal",
    href: "/categories/multi-funcaitonal",
  },
  {
    name: " Aux Cable",
    href: "/categories/aux-cable",
  },
  {
    name: "Car Phone Holder",
    href: "/categories/car-phone-holder",
  },
  {
    name: "Tempered Glass",
    href: "/categories/tempered-glass",
  },
];

const Navbar = () => {
  return (
    <nav className=" w-full  bg-green-200 dark:bg-gray-800 sticky py-6  px-4 z-50 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between ">
        {/* Logo and Brand */}
        <Link href="/">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground uppercase">
              gosiyuan
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <div
          className="
   bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-10  
          
         p-2 hidden md:flex items-center  border border-gray-100 rounded-4xl space-x-6 fixed  left-1/2 transform -translate-x-1/2"
        >
          <Link className="p-3 dark:text-gray-200  text-sm  " href="/">
            Home
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center  dark:hover:bg-transparent dark:hover:text-underline  dark:text-gray-200 space-x-1 text-gray-800 hover:text-gray-500 hover:bg-transparent "
              >
                <span>All Products</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-transparent dark:border-gray-600 backdrop-blur-2xl ">
              {categoiresMenu.map((category, index) => (
                <Link href={category.href} key={index}>
                  <DropdownMenuItem className="cursor-pointer hover:bg-gray-300">
                    {category.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/about"
            className="  text-sm dark:text-gray-200 hover:text-gray-500 "
          >
            About
          </Link>

          <Link
            href={"/contact"}
            className="  text-sm dark:text-gray-200  hover:text-gray-500 p-3"
          >
            Contact
          </Link>
        </div>

        <div className="flex items-center">
          {/* Search Button */}
          <div className="hidden md:block">
            <Button className=" bg-transparent  dark:bg-transparent dark:text-white  cursor-pointer text-gray-900 hover:text-gray-500 hover:bg-transparent ">
              <Search size={20} />
            </Button>
          </div>
          <div className="hidden md:block" >
            <Link href="/wishlist"
              className=""
            >
              <Heart size={20} />
            </Link>
          </div>
          {/* Theme Toggle Button */}
          <div className="hidden md:block">
            <ThemeToggleBtn />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2">
          <div className="flex items-center justify-center space-x-2">
            {/* Search Button */}
            <div className="">
              <Button className=" bg-transparent  dark:bg-transparent dark:text-white  cursor-pointer text-gray-900 hover:text-gray-500 hover:bg-transparent ">
                <Search size={20} />
              </Button>
            </div>
            {/* Wishlist Button */}
            <div >
              <Link href="/wishlist"
              className=""
              >
                <Heart size={20} />
              </Link>
            </div>
            {/* Theme Toggle Button */}
            <div className="">
              <ThemeToggleBtn />
            </div>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <Link className="p-3 dark:text-gray-200  text-sm  " href="/">
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-center  dark:hover:bg-transparent dark:hover:text-underline  dark:text-gray-200 space-x-1 text-muted-foreground hover:text-foreground">
                      <span>All Products</span>
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="dark:bg-transparent dark:border-gray-600 backdrop-blur-2xl
"
                  >
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
                  className="  text-sm dark:text-gray-200 text-gray-800 "
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
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
