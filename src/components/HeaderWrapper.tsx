import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";
import Header from "./Header";

const TOPIC_QUERY = defineQuery(`*[_type=="tag"]{_id, name, slug}`);
const YEAR_QUERY = defineQuery(`
  *[_type=="year"]|order(name desc){_id, name, slug,}
`);

const HeaderWrapper = async () => {
  const tags = await client.fetch(TOPIC_QUERY);
  const years = await client.fetch(YEAR_QUERY);

  return <Header tags={tags} years={years} />;
};

export default HeaderWrapper;
