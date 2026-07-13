import Title from "@/components/Title";
import { client } from "@/sanity/client";
import { defineQuery } from "next-sanity";
import PostCard from "@/components/PostCard";
import { CardType } from "@/sanity/types";

const CARD_QUERY = defineQuery(
  `
  *[_type=="year" && slug.current==$slug][0]{
  name, 
  posts[]->{
    _id,
    title,
    slug,
    description,
    date,
    mainImage,
    topic[]->{
      _id,
      name,
      slug
    }
  }
}
  `
);

const TITLE_QUERY = defineQuery(
  `*[_type == "year" && slug.current == $slug][0]{name}`
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { name: title } = await client.fetch(TITLE_QUERY, await params);
  return await { title };
}

export default async function YearPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { name, posts } = await client.fetch(CARD_QUERY, await params);
  //   console.log(await posts);

  return (
    <>
      <Title title={name} />
      <hr className="mb-4" />
      <div className="fade-in">
        {!posts ? (
          <h2>{name} বছরের কোনো লেখা নেই </h2>
        ) : (
          <ul>
            {posts.map((card: CardType) => (
              <li key={card._id} className="mx-auto my-4 hover:shadow-xl block">
                <PostCard
                  title={card.title}
                  description={card.description}
                  date={new Date(card.date).toLocaleDateString("bn-in", {
                    month: "long",
                    year: "numeric",
                  })}
                  mainImage={card.mainImage}
                  topic={card.topic}
                  slug={card.slug}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
