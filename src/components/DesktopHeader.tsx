"use client";
import Image from "next/image";
import Link from "next/link";

import { Slug } from "@/sanity/types";

import { ChartBarStacked, FileText, Info, Languages, Menu } from "lucide-react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./ui/menubar";
import { Separator } from "./ui/separator";
import SearchBar from "./SearchBar";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };
interface HeaderProps {
  tags: Tag[];
  years: Year[];
  src: string;
  subject: string;
  by_year: string;
  pdf: string;
  about_us: string;
  lang: string;
  search: string;
  home: string;
}
const DesktopHeader = ({
  tags,
  years,
  src,
  subject,
  by_year,
  pdf,
  about_us,
  lang,
  search,
  home,
}: HeaderProps) => {
  return (
    <div className="">
      <div className="w-full mb-1">
        <div className="w90  mx-auto mb-1">
          <Link href={home}>
            <Image
              src={src}
              alt="header"
              width={3464}
              height={469}
              loading="eager"
            />
          </Link>
        </div>
      </div>
      <div className="w-full py-1">
        <div className="hidden md:block">
          <div>
            <Menubar className="w90 mx-auto bg-[#DB261D] rounded-none flex justify-evenly text-white">
              <MenubarMenu>
                <MenubarTrigger className="rounded-none text-lg hover:text-black aria-expanded:text-black flex items-center gap-2 justify-center px-2">
                  <ChartBarStacked size={16} />
                  {subject}
                </MenubarTrigger>
                <MenubarContent className="rounded-none bg-[#DB261D] text-white">
                  {tags.map((tag) => (
                    <Link key={tag._id} href={`/tag/${tag.slug?.current}`}>
                      <MenubarItem className="font-sans rounded-none">
                        {tag.name}
                      </MenubarItem>
                    </Link>
                  ))}
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger className="font-sans rounded-none">
                      {by_year}
                    </MenubarSubTrigger>
                    <MenubarSubContent className="rounded-none bg-[#DB261D] text-white">
                      {years.map((year) => (
                        <Link
                          href={`/year/${year.slug.current}`}
                          className="font-sans"
                        >
                          <MenubarItem key={year._id} className="rounded-none">
                            {year.name}
                          </MenubarItem>
                        </Link>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <Separator orientation="vertical" />
              <MenubarMenu>
                <MenubarTrigger className="rounded-none text-lg whitespace-nowrap hover:text-black aria-expanded:text-black px-3 flex items-center gap-2 justify-center">
                  <FileText size={16} />
                  {pdf}
                </MenubarTrigger>
              </MenubarMenu>
              <Separator orientation="vertical" />
              <MenubarMenu>
                <SearchBar placeholder={search} />
              </MenubarMenu>
              <Separator orientation="vertical" />
              <MenubarMenu>
                <MenubarTrigger className="rounded-none text-lg whitespace-nowrap hover:text-black aria-expanded:text-black px-3 flex items-center gap-2 justify-center">
                  <Info size={16} />
                  {about_us}
                </MenubarTrigger>
              </MenubarMenu>
              <Separator orientation="vertical" />
              <MenubarMenu>
                <Link
                  href={lang === "English" ? "/en" : "/"}
                  className="flex items-center gap-2 justify-center"
                >
                  <MenubarTrigger className="rounded-none text-lg hover:text-black aria-expanded:text-black flex justify-center px-2">
                    <Languages size={16} />
                    {lang}
                  </MenubarTrigger>
                </Link>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
