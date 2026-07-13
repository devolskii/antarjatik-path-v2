import { defineQuery, PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import {
  Block,
  Blocks,
  Content,
  MarkDef,
  PullQuote,
  TOCType,
} from "@/sanity/types";

import Image from "next/image";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

import TOC from "@/components/TOC";
import Title from "@/components/Title";
import { Metadata } from "next";

const POST_QUERY = defineQuery(`
  *[_type == "post" &&
    slug.current == $slug
  ][0]{title, content, date, mainImage}
  `);

const METADATA_QUERY = defineQuery(`
*[_type == "post" && slug.current == $slug][0]{title, description, mainImage}
`);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await client.fetch(METADATA_QUERY, { slug });
  if (!data) {
    return { title: "Post Not Found" };
  }
const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
  const imageURL = data.mainImage ? urlFor(data.mainImage)?.height(500).width(700).quality(80).auto("format").url() : null;
  return {
    title: data.title,
    description: data.description,
    openGraph: imageURL ? {
      title: data.title,
      description: data.description,
      images: [
        {
          url: imageURL,
          width: 700,
          height: 500,
          alt: data.title,
        },
      ],
    } : undefined,
    twitter: imageURL ? {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [imageURL],
    } : undefined,
  };
}

function extractEndnotes(content: Content) {
  const notes: MarkDef[] = [];
  const seen: Map<string, number> = new Map();

  function walkBlocks(blocks: Blocks) {
    blocks.forEach((block: Block) => {
      if (block._type === "block" && block.markDefs?.length) {
        block.markDefs.forEach((def) => {
          if (def._type === "endnote" && !seen.has(def._key)) {
            seen.set(def._key, notes.length + 1);
            notes.push(def);
          }
        });
      }
    });
  }

  walkBlocks(content);

  return { notes, seen };
}

const extractHeadings = (content: Content) => {
  const headings: TOCType[] = [];

  content.forEach((block: Block) => {
    if (block.style == "h1") {
      headings.push({ title: block.children[0].text, link: block._key });
    }
  });
  return headings;
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await client.fetch(POST_QUERY, await params);
  if (!post) {
    notFound();
  }

  const { title, date, content, mainImage } = await post;
const { projectId, dataset } = client.config();
  const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;
  const imageUrl = mainImage
    ? (urlFor(mainImage)?.height(500).width(700).quality(80).auto("format").url() ??
        "https://placehold.co/550x310/png")
    : "https://placehold.co/550x310/png";

  const { notes, seen } = extractEndnotes(content);

  const headings = extractHeadings(content);

  //console.log(headings);

  const components = {
    marks: {
      endnote: ({
        //children,
        value,
      }: {
        //children?: React.ReactNode;
        value?: MarkDef;
      }) => {
        const noteNumber = value?._key ? seen.get(value._key) : undefined;
        return (
          <sup>
            <a
              href={`#endnote-${noteNumber}`}
              id={`ref-${noteNumber}`}
              className="text-gray-500"
            >
              [{noteNumber}]
            </a>
          </sup>
        );
      },
    },
    block: {
      normal: ({ children }: { children?: React.ReactNode }) => (
        <p className="text-justify text-[1.06rem] lg:text-lg leading-relaxed mb-4">
          {children}
        </p>
      ),
      h1: ({
        children,
        value,
      }: {
        children?: React.ReactNode;
        value?: { _key?: string };
      }) => {
        //console.log("Value: ", value);
        //console.log("Children: ", children);
        return (
          <a id={value?._key} href={`#${value?._key}`} className="scroll-mt-10">
            <h1 className="text-2xl font-bold py-2 text-[#DB261D]">
              {children}
            </h1>
          </a>
        );
      },
      h2: ({ children }: { children?: React.ReactNode }) => (
        <h2 className="text-xl font-semibold">{children}</h2>
      ),
    },
    types: {
      pullQuote: ({ value }: { value: PullQuote }) => (
        <aside className="p-4 italic my-6 text-xl/8 text-center bg-[url('/bg.png')] bg-contain bg-center bg-no-repeat pointer-events-none">
          {value.quote}
        </aside>
      ),
    },
    list: {
      bullet: ({ children }: { children?: React.ReactNode }) => (
        <ul className="list-disc ml-6 text-lg">{children}</ul>
      ),
      number: ({ children }: { children?: React.ReactNode }) => (
        <ol className="list-decimal ml-6 text-lg">{children}</ol>
      ),
    },
  };

  return (
    <article className="font-serif fade-in">
      <Title title={title} headings={headings} />

      <p className="w90 mx-auto text-sm mt-2">
        {new Date(date).toLocaleDateString("bn-in", {
          month: "long",
          year: "numeric",
        })}
      </p>
      <hr className="mb-4 w90 mx-auto" />
      <div className="w90 mx-auto">
        <div className="flex">
          <div className={`xl:w-4/6 {headings.length ? "mx-auto" : ""}`}>
            <figure className="mb-4">
              <Image
                src={imageUrl}
                alt={title}
                className="mx-auto overflow-hidden object-cover object-center "
                height="500"
                width="700"
              />

              <figcaption className="text-gray-500 text-center text-sm mt-2">
                {mainImage.caption}
              </figcaption>
            </figure>

            <PortableText value={content} components={components} />
          </div>
          {headings.length ? (
            <nav className="hidden xl:w-2/6 ml-3 h-fit sticky top-4 self-start xl:block">
              <TOC headings={headings} />
            </nav>
          ) : (
            ""
          )}
        </div>
        {notes.length > 0 && (
          <section className="mt-8 mb-10">
            <h2 className="text-lg font-semibold">টীকা</h2>
            {notes.map((note, i) => (
              <ul key={note._key} id={`endnote-${i + 1}`}>
                <a href={`#ref-${i + 1}`} className="underline text-gray-700">
                  {i + 1}
                </a>
                {"  "}
                {note.note}
              </ul>
            ))}
          </section>
        )}
      </div>
    </article>
  );
}
