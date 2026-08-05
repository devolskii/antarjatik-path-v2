"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

import { Slug } from "@/sanity/types";
import { ChevronsUpDown, Menu, Languages } from "lucide-react";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };

interface HeaderProps {
  tags: Tag[];
  years: Year[];
}

const MobileHeader = ({ tags, years }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const iconButtonClass =
    "p-0 rounded-none bg-transparent text-white hover:bg-transparent hover:text-white active:bg-transparent active:text-white focus-visible:bg-transparent focus-visible:text-white aria-expanded:bg-transparent aria-expanded:text-white";
  return (
    <div>
      <div className="h-15 w-full flex items-center justify-end p-2 bg-[#DB261D]">
        <div className="w-[5%]">
          <div>
            <Drawer
              open={open}
              onOpenChange={setOpen}
              showSwipeHandle={true}
              swipeDirection="left"
            >
              <DrawerTrigger
                render={
                  <Button
                    variant="ghost"
                    aria-expanded={open}
                    aria-label={open ? "Hide Menu" : "Show Menu"}
                    className={iconButtonClass}
                    onClick={() => setOpen(!open)}
                  >
                    <Menu className="stroke-[3px] size-6" />
                  </Button>
                }
              />
              <DrawerContent className="bg-[#DB261D] text-white border-none font-serif rounded-none pb-4">
                <DrawerHeader className="mb-8 pl-0 ml-0">
                  <DrawerTitle className="sr-only">আন্তর্জাতিক পথ</DrawerTitle>
                  <DrawerDescription className="sr-only">
                    বলশেভিক লেনিনবাদী পার্টির মুখপত্র
                  </DrawerDescription>
                  <div className="ml-0 pl-0.1 pr-0.1 flex rounded-none contain-content ">
                    <Button className="bg-transparent rounded-none ml-0 h-full w-full">
                      <Link href="/">
                        <Image
                          src="/drawer_image.jpeg"
                          alt="BLPI Logo Drawer"
                          width={280}
                          height={75}
                        />
                      </Link>
                    </Button>
                  </div>
                </DrawerHeader>
                <div className="w-full pl-2 mb-4">
                  <SearchBar mobile={true} onSearch={() => setOpen(false)} />
                </div>
                <ScrollArea className="h-full w-full">
                  <div className="h-full">
                    <Collapsible>
                      <div className="flex items-center justify-between gap-4 px-4">
                        <h2 className="font-bold font-sans">বিষয়</h2>
                        <CollapsibleTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <ChevronsUpDown />
                            </Button>
                          }
                        />
                      </div>
                      <CollapsibleContent className="flex flex-col gap-2 ml-2 items-start">
                        {tags.map((tag) => (
                          <Button
                            type="button"
                            variant="link"
                            key={tag._id}
                            className="text-white font-sans"
                            onClick={() => setOpen(false)}
                          >
                            <Link href={`/tag/${tag.slug?.current}`}>
                              {tag.name}
                            </Link>
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <Collapsible>
                      <div className="flex items-center justify-between gap-4 px-4 mt-4">
                        <h2 className="font-bold font-sans">বছর অনুযায়ী</h2>
                        <CollapsibleTrigger
                          render={
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                            >
                              <ChevronsUpDown />
                            </Button>
                          }
                        />
                      </div>
                      <CollapsibleContent className="flex flex-col gap-2 ml-2 items-start">
                        {years.map((year) => (
                          <Button
                            type="button"
                            variant="link"
                            key={year._id}
                            className="text-white font-sans"
                            onClick={() => setOpen(false)}
                          >
                            <Link href={`/year/${year.slug?.current}`}>
                              {year.name}
                            </Link>
                          </Button>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                    <h2 className="font-bold font-sans ml-4 mt-4">
                      বই/পত্রিকা PDF
                    </h2>
                    <h2 className="font-bold font-sans ml-4 mt-4">
                      আমাদের সম্পর্কে
                    </h2>
                    <h2 className="font-bold font-sans ml-4 mt-4">English</h2>
                  </div>
                </ScrollArea>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="w-[95%]">
          <Button className="bg-transparent rounded-none ml-0 h-full w-full">
            <Link href="/">
              <Image
                src="/mobile-banner.png"
                alt="BLPI Logo Header"
                width={430}
                height={56}
              />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
