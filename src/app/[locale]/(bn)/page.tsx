import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import { CardType } from "@/sanity/types";
import Hero from "../../../components/Hero";
import SectionTitle from "../../../components/SectionTitle";
import PostCard from "../../../components/PostCard";

const HOME_QUERY = `*[
  _type == "post"
  && _id != (*[_type == "hero"][0].heroPost->._id)
  && !(_id in *[_type == "recents"][0].recentPosts[]->._id)
] | order(date desc) {
  _id,
  title,
  slug,
  description,
  date,
  mainImage,
}`;

const HERO_QUERY = `*[_type == "hero"][0]{
  ...heroPost -> {
    title,
    slug, 
    description,
    mainImage,
    date
  }
}
`;

const RECENT_POSTS_QUERY = `*[_type == "recents"][0].recentPosts[]->{
  _id,
  title,
  slug,
  description,
  date,
  mainImage
}`;

const home = async () => {
  const postCards = await client.fetch<SanityDocument>(HOME_QUERY);
  //console.log(postCards);
  const hero = await client.fetch<SanityDocument>(HERO_QUERY);
  //console.log("here's hero", hero);
  const recentPosts = await client.fetch<CardType[]>(RECENT_POSTS_QUERY);
  //console.log("here's recentPosts", recentPosts);

  const { projectId, dataset } = client.config(); //HERE
  return (
    <div className="fade-in w90 mx-auto">
      <Hero
        title={hero.title}
        description={hero.description}
        date={new Date(hero.date).toLocaleDateString("bn-in", {
          month: "long",
          year: "numeric",
        })}
        mainImage={hero.mainImage}
        slug={hero.slug}
        projectId={projectId ?? ""}
        dataset={dataset ?? ""}
      />
      <SectionTitle text="নতুন আপলোড..." />
      <ul>
        {recentPosts.map((card: CardType) => (
          <li key={card._id} className="mx-auto block">
            <PostCard
              title={card.title}
              description={card.description}
              date={new Date(card.date).toLocaleDateString("bn-in", {
                month: "long",
                year: "numeric",
              })}
              mainImage={card.mainImage}
              slug={card.slug}
              projectId={projectId ?? ""}
              dataset={dataset ?? ""}
            />
          </li>
        ))}
      </ul>
      <SectionTitle text="আরও লেখা..." />
      <ul>
        {postCards.map((card: CardType) => (
          <li key={card._id} className="mx-auto block">
            <PostCard
              title={card.title}
              description={card.description}
              date={new Date(card.date).toLocaleDateString("bn-in", {
                month: "long",
                year: "numeric",
              })}
              mainImage={card.mainImage}
              slug={card.slug}
              projectId={projectId ?? ""}
              dataset={dataset ?? ""}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default home;
