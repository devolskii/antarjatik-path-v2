import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { MainImage, Slug } from "@/sanity/types";
import Image from "next/image";
import Link from "next/link";

const Hero = ({
  title,
  description,
  date,
  mainImage,
  slug,
  projectId,
  dataset
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
    ? urlFor(mainImage)?.height(310).width(550).quality(80).auto("format").url() ?? "https://placehold.co/550x310/png"
    : "https://placehold.co/550x310/png";
  // console.log("Image: ", imageUrl);
  return (
    <>
      <div className="pt-3">
        <Link href={`/posts/${slug.current}`} className="cursor-pointer">
          <Image
            src={imageUrl}
            alt={title}
            className="w-full"
            height="200"
            width="350"
          />
        </Link>
      </div>
      <Link
        href={`/posts/${slug.current}`}
        className="text-[#DB261D] cursor-pointer"
      >
        <div className="w90 px-3 text-3xl font-extrabold  py-3 font-serif">
          <h1>{title}</h1>
        </div>
      </Link>
      <div className="w90 px-3 pb-1 font-serif">
        <p>{description}</p>
      </div>
      <div className="w90 px-3 text-[#DB261D] pb-3 font-extrabold font-serif">
        <p>{date}</p>
      </div>
    </>
  );
};
export default Hero;
