"use client";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { Search } from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({
  mobile = false,
  onSearch,
}: {
  mobile?: boolean;
  onSearch?: () => void;
}) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!query.trim()) return;
      onSearch?.();
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <InputGroup className="shadow-none rounded-none max-h-full w-full border-none bg-white m-0">
      <InputGroupInput
        placeholder="বাংলায় খুঁজুন..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="font-sans text-sm text-black placeholder:text-black placeholder:italic placeholder:text-sm "
      />
      <InputGroupAddon className={mobile ? "text-black" : ""}>
        <Search className={mobile ? "text-black" : ""} />
      </InputGroupAddon>
    </InputGroup>
  );
}
