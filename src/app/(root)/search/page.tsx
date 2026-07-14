import PostCard from "@/components/PostCard";
import { toBengaliNumber } from "@/lib/utils";
import { client } from "@/sanity/client";
import { CardType } from "@/sanity/types";
import { defineQuery } from "next-sanity";

const SEARCH_QUERY = defineQuery(`
*[_type == "post"][title match $searchQuery]|order(date desc){
  _id, 
  title, 
  slug, 
  description, 
  date, 
  mainImage, 
  topic[]{
    _key, 
    _ref, 
    "slug": @->slug, 
    "name": @->name
  }
}
`);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const params = await searchParams;
  const query = params.query;
  const sanitizedQuery = query.trim().replace(/\s+/g, " ");
  const postCards = await client.fetch(SEARCH_QUERY, {
    searchQuery: `*${sanitizedQuery}*`,
  });
  // console.log(postCards);
  const { projectId, dataset } = client.config(); //HERE

  return (
    <div className="fade-in">
      <div className="mt-6">
        <div className="w90 mx-auto flex justify-between">
          <div>
            <h1 className="font-semibold font-sans">
              "{query}" অনুসন্ধানের ফলাফল
            </h1>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {toBengaliNumber(postCards.length)}-টি ফলাফল
            </p>
          </div>
        </div>
        <hr className="mb-4 w90 mx-auto" />
        {postCards.length ? (
          <ul>
            {postCards.map((card: CardType) => (
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
        ) : (
          <h2 className="mt-6 font-sans">কিছু নেই</h2>
        )}
      </div>
    </div>
  );
}
