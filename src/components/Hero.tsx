import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { MainImage, Slug } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";
import { YouTubeEmbed } from "@next/third-parties/google";

const Hero = ({
  title,
  description,
  date,
  mainImage,
  slug,
  projectId,
  dataset,
}: {
  title: string;
  description: string;
  date: string;
  mainImage: MainImage;
  slug: Slug;
  projectId: string;
  dataset: string;
}) => {
  // console.log("mainImage", mainImage);
  const urlFor = (source: SanityImageSource) =>
    projectId && dataset
      ? createImageUrlBuilder({ projectId, dataset }).image(source)
      : null;

  const imageUrl = mainImage
    ? (urlFor(mainImage)
        ?.height(310)
        .width(550)
        .quality(80)
        .auto("format")
        .url() ?? "https://placehold.co/550x310/png")
    : "https://placehold.co/550x310/png";
  // console.log("Image: ", imageUrl);
  return (
    <div className="md:flex md:gap-2">
      <div className="md:w-1/2">
        <div className="pt-3">
          <Link href={`/posts/${slug.current}`} className="cursor-pointer">
            <Image src={imageUrl} alt={title} height="310" width="550" />
          </Link>
        </div>
        <Link
          href={`/posts/${slug.current}`}
          className="text-[#DB261D] cursor-pointer"
        >
          <div className="text-3xl font-extrabold  py-3 font-serif">
            <h1>{title}</h1>
          </div>
        </Link>
        <div className="pb-1 font-serif">
          <p>{description}</p>
        </div>
        <div className="text-[#DB261D] pb-3 font-extrabold font-serif">
          <p>{date}</p>
        </div>
      </div>
      <div className="pt-3 md:w-1/2">
        <YouTubeEmbed videoid="H5u1GtMJbeg" />
        <div className="text-3xl font-extrabold text-[#DB261D] py-3 font-serif md:text-right">
          "আজকের এই কমিউনিস্ট পার্টি গুলোর অধঃপতনের জন্য দায়ী কে এবং ট্রটস্কি
          প্রসঙ্গ: অভিজিৎ রায়।"
        </div>
        <div className="pb-1 font-serif">
          <p className="md:text-right">
            বর্তমান সময়ের প্রেক্ষাপটে ভারতীয় কমিউনিস্ট আন্দোলনের সংকট ও
            ট্রটস্কিবাদী রাজনীতির প্রাসঙ্গিকতা নিয়ে এক গভীর ও বিতর্কিত আলোচনা
            শুনতে ভিডিওটি দেখুন।
          </p>
        </div>
        <div className="text-[#DB261D] pb-3 font-extrabold font-serif">
          <p className="md:text-right">ফেব্রুয়ারী ২০২৬</p>
        </div>
      </div>
    </div>
  );
};
export default Hero;
