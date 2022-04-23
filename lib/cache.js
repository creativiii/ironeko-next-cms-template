const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const getAll = dir => {
  const directory = path.join(process.cwd(), `_posts/${dir}`);
  const fileNames = fs.readdirSync(directory);
  const content = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(directory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      slug,
      ...matterResult
    };
  });
  return JSON.stringify(content);
};

const allPosts = getAll("blog");

const postFileContents = `${allPosts}`;

const allCategories = getAll("categories");

const categorytFileContents = `${allCategories}`;

try {
  fs.readdirSync("public/cache");
} catch (e) {
  fs.mkdirSync("public/cache");
}

fs.writeFile("public/cache/posts.json", postFileContents, err => {
  if (err) return console.log(err);
  console.log("Posts cached.");
});

fs.writeFile("public/cache/categories.json", categorytFileContents, err => {
  if (err) return console.log(err);
  console.log("Categories cached.");
});
