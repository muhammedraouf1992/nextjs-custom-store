"use client";

import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/next.svg";
import { cn } from "@/lib/utils";
const MobileMenu = ({ category, pathname }) => {
  return (
    <div className="mobileMenu">
      <Sheet>
        <SheetTrigger>
          <MenuIcon className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-primary-foreground rounded-lg lg:hidden hover:bg-background hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-200" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              <Image src={logo} width={"100"} height={"100"} alt="logo" />
            </SheetTitle>
            <SheetDescription asChild>
              <div className="font-bold flex flex-col py-2 mt-4 items-start">
                <SheetClose asChild>
                  <Link
                    className={cn(
                      "p-4  hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
                      pathname == "/" && "bg-primary-foreground text-primary"
                    )}
                    href={"/"}
                  >
                    Home
                  </Link>
                </SheetClose>

                {category.map((c) => (
                  <SheetClose asChild key={c.id}>
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
                  </SheetClose>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileMenu;
