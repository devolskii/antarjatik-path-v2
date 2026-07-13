import { Slug } from "@/sanity/types";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };

interface HeaderProps {
  tags: Tag[];
  years: Year[];
}

const Header = ({ tags, years }: HeaderProps) => {
  return (
    <header className="">
      <div className="md:hidden">
        <MobileHeader tags={tags} years={years} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader tags={tags} years={years} />
      </div>
    </header>
  );
};
export default Header;
