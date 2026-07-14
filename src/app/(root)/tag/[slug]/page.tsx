import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import PostCard from "@/components/PostCard";
import { CardType } from "@/sanity/types";
import Title from "@/components/Title";

const TAG_QUERY = defineQuery(`
*[_type == "tag" && slug.current == $slug][0]{
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
`);

const TITLE_QUERY = defineQuery(
  `*[_type == "tag" && slug.current == $slug][0]{name}`
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { name: title } = await client.fetch(TITLE_QUERY, await params);
  return await { title };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { name, posts } = await client.fetch(TAG_QUERY, await params);
  //   console.log(await posts);
const { projectId, dataset } = client.config();
  return (
    <>
      <Title title={name} />
      <hr className="mb-4" />
      <div className="fade-in">
        <ul>
          {posts.map((card: CardType) => (
            <li key={card._id} className="mx-auto my-4 block">
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
                projectId={projectId ?? ""}
                dataset={dataset ?? ""}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
