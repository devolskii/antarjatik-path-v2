"use client";
import { TOCType } from "@/sanity/types";
import { useState, useEffect } from "react";

const TOC = ({ headings }: { headings: TOCType[] }) => {
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
      }
    );

    headings.forEach(({ link }) => {
      const el = document.getElementById(link);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  return (
    <div className="border font-serif p-3 w-fit">
      <h1 className="text-2xl font-bold mb-2">সূচি</h1>
      <ul className="space-y-1">
        {headings.map(({ title, link }) => (
          <li key={link} className="mb-2">
            <a
              href={`#${link}`}
              className={`text-xl ${
                activeId === link ? "font-bold" : ""
              } hover:underline`}
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default TOC;
