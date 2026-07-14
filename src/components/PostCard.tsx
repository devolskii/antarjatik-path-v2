import { MainImage, Slug, Topic } from "@/sanity/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

import Image from "next/image";
import Link from "next/link";

const PostCard = ({
  title,
  description,
  date,
  mainImage,
  topic,
  slug,
  projectId,
  dataset
}: {
  title: string;
  description: string;
  date: string;
  mainImage: MainImage;
  topic: Topic[];
  slug: Slug;
  projectId: string;
  dataset: string;
}) => {
  
  const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

  const imageUrl = mainImage
    ? (urlFor(mainImage)?.height(310).width(550).quality(80).auto("format").url() ?? "https://placehold.co/550x310/png")
    : "https://placehold.co/550x310/png";
  //console.log(topic);

  return (
    <div>
      <Card className="bg-transparent font-sans shadow-none rounded-none border-none">
        <CardHeader>
          <Link href={`/posts/${slug.current}`}>
            <CardTitle className="text-[#DB261D] font-serif text-2xl font-bold">
              {title}
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="hidden md:block md:w-4/5 font-serif">
              <p>{description}</p>
            </div>
            <div className="">
              <Image
                src={imageUrl}
                alt={title}
                className="mx-auto aspect-video overflow-hidden object-cover object-center "
                height="200"
                width="350"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-[#DB261D] font-bold font-serif">{date}</p>
          {/*<ul className="flex flex-wrap">
            {topic?.map((eachTopic: Topic) => (
              <li key={eachTopic._id}>
                <Button variant="outline" className="ml-4">
                  <Link href={`/tag/${eachTopic.slug?.current}`} className="">
                    {eachTopic.name}
                  </Link>
                </Button>
              </li>
            ))}
          </ul>*/}
        </CardFooter>
      </Card>
    </div>
  );
};
export default PostCard;
