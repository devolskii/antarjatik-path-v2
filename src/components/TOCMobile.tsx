"use client";
import { TOCType } from "@/sanity/types";
import { useState, useEffect } from "react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";

const TOCMobile = ({ headings }: { headings: TOCType[] }) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.1,
      },
    );

    headings.forEach(({ link }) => {
      const el = document.getElementById(link);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <DropdownMenuContent className="w-56 font-serif" align="start">
      <DropdownMenuGroup>
        <DropdownMenuLabel className="text-xl">সূচি</DropdownMenuLabel>
        {headings.map(({ title, link }) => (
          <DropdownMenuItem key={link}>
            <a
              href={`#${link}`}
              className={` ${
                activeId === link ? "font-bold" : ""
              } hover:underline`}
            >
              {title}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
};
export default TOCMobile;
