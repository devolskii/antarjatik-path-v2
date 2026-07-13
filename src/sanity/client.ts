import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "nplxmv1o",
  dataset: "production",
  apiVersion: "2025-07-09",
  useCdn: false,
});
