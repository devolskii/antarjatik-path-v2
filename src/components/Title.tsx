"use client";
import { List } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { TOCType } from "@/sanity/types";
import TOCMobile from "./TOCMobile";
import Image from "next/image";
import Link from "next/link";

export default function Title({
  title,
  headings,
}: {
  title: string;
  headings?: TOCType[];
}) {
  const [isSticky, setIsSticky] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { rootMargin: "-10px 0px 0px 0px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Use mounted to derive classes so server and first client render match
  const sticky = mounted && isSticky;

  return (
    <>
      <div ref={sentinelRef} className="h-2" aria-hidden="true" />

      <div
        id="sticky-header"
        className={`flex justify-between items-center sticky top-0 z-50 xl:relative transition-all duration-300 ease-out ${
          sticky
            ? "gap-x-3 px-2 h-10 w-full bg-[#DB261D] text-white"
            : "h-auto w90 mx-auto bg-white text-[#DB261D]"
        }`}
      >
        <Link
          href="/"
          aria-hidden={!sticky}
          className={`transition-all duration-300 ease-out shrink-0 ${
            sticky ? "opacity-100 w-6.25" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          <Image
            src="/yellogo.svg"
            alt="logo"
            width={25}
            height={25}
            priority
          />
        </Link>

        <div className="transition-all duration-300 flex-1 ease-out min-w-0">
          <h1
            className={`font-serif font-bold transition-all duration-300 ease-out ${
              sticky
                ? "truncate text-sm"
                : "mt-2 pr-3 text-2xl md:text-3xl xl:text-4xl"
            }`}
          >
            {title}
          </h1>
        </div>
        {headings?.length ? (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <List className="mt-1 size-6 stroke-3" />
                </button>
              </DropdownMenuTrigger>
              <TOCMobile headings={headings} />
            </DropdownMenu>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
