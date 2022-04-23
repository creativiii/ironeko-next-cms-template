import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import slugify from "slugify";
import markdownToHtml from "./markdownToHtml";

const directory = content => join(process.cwd(), `_posts/${content}`);

export const getSlugs = content => {
  const dir = directory(content);
  return fs.readdirSync(dir);
};

export const getBySlug = ({ type, slug, fields = [] }) => {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = join(directory(type), `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {} as any;

  // Ensure only the minimal needed data is exposed
  for (let field of fields) {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = markdownToHtml(content || "");
    }
    if (field === "markdown") {
      items[field] = content.toString();
    }
    if (data[field]) {
      items[field] = data[field];
    }

    if (field === "date") {
      items[field] = data.date.toISOString();
    }

    if (field === "author") {
      items[field] = getBySlug({
        type: "authors",
        slug: slugify(data.author, { lower: true }),
        fields: ["name", "avatar", "content"]
      });
    }
    if (field === "categories") {
      items.categories_extended = [];
      data.categories.map((category, i) => {
        items.categories_extended[i] = getBySlug({
          type: "categories",
          slug: slugify(category, { lower: true }),
          fields: ["name", "description", "slug"]
        });
      });
    }
  }

  return items;
};

export const getAll = ({ type, fields = [] }) => {
  const slugs = getSlugs(type);
  const posts = slugs
    .map(slug => getBySlug({ type, slug, fields }))
    // @ts-ignore
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
};
