import Footer from "../../components/Footer";
import HeaderWrapper from "../../components/HeaderWrapper";
import ScrollToTop from "../../components/ScrollToTop";
import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}){
  return (
    <main className="min-h-screen flex flex-col">
      <ScrollToTop />
      <HeaderWrapper />
      <div className="flex-1">{children}</div>
      <Footer />
    </main>
  );
}
