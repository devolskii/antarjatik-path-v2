"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpToLine } from "lucide-react";

export default function ScrollToTopButton() {
  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className="sticky bottom-4 right-4 w-full flex flex-row-reverse">
      <Button
        type="button"
        onClick={handleClick}
        className="z-100 mr-4 bg-[#DB261D] rounded-none"
        aria-label="Scroll to top"
      >
        <ArrowUpToLine className="text-white" />
      </Button>
    </div>
  );
}
