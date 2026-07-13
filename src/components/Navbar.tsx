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
  mobile: boolean;
  tags: Tag[];
  years: Year[];
}

const Navbar = ({ mobile, tags, years }: NavbarProps) => {
  return (
    <div>
      <Menubar
        className={`rounded-none! ${mobile ? "border-none" : "md:flex justify-around font-sans h-12"}`}
      >
        {mobile ? (
          <MenubarMenu>
            <MenubarTrigger className="rounded-none p-0 m-0 border-none">
              <Menu />
            </MenubarTrigger>
            <MenubarContent className="rounded-none z-1000">
              <MenubarSub>
                <MenubarSubTrigger className="font-sans">
                  বিষয়
                </MenubarSubTrigger>
                <MenubarSubContent className="rounded-none">
                  {tags.map((tag) => (
                    <Link key={tag._id} href={`/tag/${tag.slug?.current}`}>
                      <MenubarItem className="font-sans">
                        {tag.name}
                      </MenubarItem>
                    </Link>
                  ))}
                  <MenubarSeparator />
                  <MenubarSub>
                    <MenubarSubTrigger className="font-sans">
                      বছর অনুযায়ী
                    </MenubarSubTrigger>
                    <MenubarSubContent className="rounded-none">
                      {years.map((year) => (
                        <Link
                          key={year._id}
                          href={`/year/${year.slug.current}`}
                        >
                          <MenubarItem className="font-sans">
                            {year.name}
                          </MenubarItem>
                        </Link>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarSeparator />
              <MenubarItem className="font-sans">বই/পত্রিকা PDF</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="font-sans">আমাদের সম্পর্কে</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="font-sans">English</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ) : (
          <>
            <MenubarMenu>
              <MenubarTrigger className="text-sm xl:text-lg">
                বিষয়
              </MenubarTrigger>
              <MenubarContent className="rounded-none">
                {tags.map((tag) => (
                  <Link key={tag._id} href={`/tag/${tag.slug?.current}`}>
                    <MenubarItem className="font-sans">{tag.name}</MenubarItem>
                  </Link>
                ))}
                <MenubarSeparator />
                <MenubarSub>
                  <MenubarSubTrigger className="font-sans">
                    বছর অনুযায়ী
                  </MenubarSubTrigger>
                  <MenubarSubContent className="rounded-none">
                    {years.map((year) => (
                      <Link key={year._id} href={`/year/${year.slug.current}`}>
                        <MenubarItem className="font-sans">
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
              <MenubarTrigger className="text-sm xl:text-lg">
                বই/পত্রিকা PDF
              </MenubarTrigger>
            </MenubarMenu>
            <Separator orientation="vertical" />
            <MenubarMenu>
              <SearchBar />
            </MenubarMenu>
            <Separator orientation="vertical" />
            <MenubarMenu>
              <MenubarTrigger className="text-sm xl:text-lg">
                আমাদের সম্পর্কে
              </MenubarTrigger>
            </MenubarMenu>
            <Separator orientation="vertical" />
            <MenubarMenu>
              <MenubarTrigger className="text-sm xl:text-lg">
                English
              </MenubarTrigger>
            </MenubarMenu>
          </>
        )}
      </Menubar>
    </div>
  );
};

export default Navbar;
