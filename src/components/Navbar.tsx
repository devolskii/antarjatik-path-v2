// "use client";

import { Menu } from "lucide-react";
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
import Link from "next/link";
import { Slug } from "@/sanity/types";
import SearchBar from "./SearchBar";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };

interface NavbarProps {
  tags: Tag[];
  years: Year[];
}

const Navbar = ({ tags, years }: NavbarProps) => {
  return (
    <div>
      <Menubar className="bg-[#DB261D] rounded-none flex justify-evenly text-white">
        <MenubarMenu>
          <MenubarTrigger className="rounded-none text-lg hover:text-black w-md flex justify-center">
            বিষয়
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
                বছর অনুযায়ী
              </MenubarSubTrigger>
              <MenubarSubContent className="rounded-none">
                {years.map((year) => (
                  <Link key={year._id} href={`/year/${year.slug.current}`}>
                    <MenubarItem className="font-sans">{year.name}</MenubarItem>
                  </Link>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger className="rounded-none text-lg hover:text-black w-lg flex justify-center">
            বই/পত্রিকা PDF
          </MenubarTrigger>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <SearchBar />
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger className="rounded-none text-lg hover:text-black w-md flex justify-center">
            আমাদের সম্পর্কে
          </MenubarTrigger>
        </MenubarMenu>
        <Separator orientation="vertical" />
        <MenubarMenu>
          <MenubarTrigger className="rounded-none text-lg hover:text-black w-md flex justify-center">
            English
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default Navbar;
