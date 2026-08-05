"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./Navbar";

import { Slug } from "@/sanity/types";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };

interface HeaderProps {
  tags: Tag[];
  years: Year[];
}

const DesktopHeader = ({ tags, years }: HeaderProps) => {
  return (
    <div className="">
      <div className="w-full mb-1">
        <div className="w90  mx-auto mb-1">
          <Link href="/">
            <Image
              src="/desktop-banner.png"
              alt="header"
              width={3464}
              height={469}
            />
          </Link>
        </div>
      </div>
      <div className="w-full py-1">
        <div className="hidden md:block">
          <Navbar tags={tags} years={years} />
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
