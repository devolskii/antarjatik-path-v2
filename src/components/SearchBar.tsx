"use client";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ mobile = false }: { mobile?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!query.trim()) return;
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <InputGroup
      className={
        mobile
          ? "shadow-none rounded-none border-none bg-white mb-8 mx-3"
          : "flex max-w-sm rounded-none"
      }
    >
      <InputGroupInput
        placeholder="বাংলায় খুঁজুন..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="font-sans text-sm text-black placeholder:text-white placeholder:italic"
      />
      <InputGroupAddon className={mobile ? "text-black" : ""}>
        <Search className={mobile ? "text-black" : ""} />
      </InputGroupAddon>
    </InputGroup>
  );
}
