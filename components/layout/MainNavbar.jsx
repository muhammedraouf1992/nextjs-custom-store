"use client";
import React from "react";

import Image from "next/image";
import logo from "/public/next.svg";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ShoppingCart from "@/app/(frontend)/_components/ShoppingCart";

import UserButton from "./UserButton";

import MobileMenu from "@/app/(frontend)/_components/MobileMenu";

const MainNavbar = ({ cart, category }) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="bg-primary text-primary-foreground">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-8 px-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              width={40}
              height={40}
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              Flowbite
            </span>
          </Link>

          <div className="hidden w-full lg:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8  md:mt-0">
              <li>
                <Link
                  className={cn(
                    "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                    pathname == "/" && "bg-primary-foreground text-primary"
                  )}
                  href={"/"}
                >
                  Home
                </Link>
              </li>

              {category.map((c) => (
                <li key={c.id}>
                  <Link
                    className={cn(
                      "p-4 capitalize hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                      pathname == "/category" &&
                        "bg-primary-foreground text-primary"
                    )}
                    href={"/category/" + c.id}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className=" flex gap-2 items-center">
            <ShoppingCart cart={cart} />
            <UserButton />
            <MobileMenu category={category} pathname={pathname} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
