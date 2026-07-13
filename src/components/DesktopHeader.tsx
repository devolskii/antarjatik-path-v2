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
      <div className="w-full bg-white pb-1">
        <div className="w90 mx-auto">
          <div className="flex items-center justify-center">
            <div>
              <Link href="/">
                <Image
                  src="/header.jpeg"
                  alt="header"
                  width={400}
                  height={70}
                />
              </Link>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-serif text-sm text-center">
              বলশেভিক লেনিনবাদী পার্টির মুখপত্র
            </p>
            <hr className="mt-3" />
            <div className="hidden md:block">
              <Navbar mobile={false} tags={tags} years={years} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
