import { Slug } from "@/sanity/types";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useTranslations } from "next-intl";

type Tag = { _id: string; name: string; slug: Slug };
type Year = { _id: string; name: string; slug: Slug };

interface HeaderProps {
  tags: Tag[];
  years: Year[];
}

const Header = ({ tags, years }: HeaderProps) => {
  const t = useTranslations("nav");
  return (
    <header className="">
      <div className="md:hidden">
        <MobileHeader
          tags={tags}
          years={years}
          src={t("banner")}
          subject={t("subject")}
          by_year={t("by_year")}
          pdf={t("pdf")}
          about_us={t("about_us")}
          lang={t("lang")}
          search={t("search")}
          drawer={t("drawer")}
        />
      </div>
      <div className="hidden md:block">
        <DesktopHeader
          tags={tags}
          years={years}
          src={t("banner")}
          subject={t("subject")}
          by_year={t("by_year")}
          pdf={t("pdf")}
          about_us={t("about_us")}
          lang={t("lang")}
          search={t("search")}
        />
      </div>
    </header>
  );
};
export default Header;
