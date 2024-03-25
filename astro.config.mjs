import starlight from "@astrojs/starlight";
import { defineConfig } from "astro/config";
import fs from "node:fs";
import path from "node:path";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

const DirectoryOrder = 1;
const FileOrder = 10;

const excludes = ["Home.md", "index.mdx"];

const orderMap = {
  "/ToBeContinue": 2,
};

const docPrefix = "./src/content/docs";

function serializedPath(str) {
  return str
    .replaceAll(" ", "-")
    .replaceAll(".", "")
    .replaceAll(",", "")
    .toLowerCase();
}

function generateSlider(p) {
  const ap = path.join(docPrefix, p);

  if (!fs.existsSync(ap) || excludes.includes(path.basename(ap))) {
    return undefined;
  }

  const state = fs.statSync(ap);

  // 文件夹
  if (state.isDirectory()) {
    const files = fs.readdirSync(ap);

    return {
      label: path.basename(p),
      collapsed: true,
      order: orderMap[p] || DirectoryOrder,
      items: files
        .map((file) => {
          return generateSlider(p + "/" + file);
        })
        .filter((item) => !!item)
        .sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }

          if (a.ctimeMs && b.ctimeMs) {
            return a.ctimeMs - b.ctimeMs;
          }

          return a.label - b.label;
        }),
    };
  }

  const ext = path.extname(p);

  if (ext !== ".md") {
    return undefined;
  }

  // 文件
  return {
    label: path.basename(p, ext),
    link: serializedPath(p.replace(ext, "/")),
    order: FileOrder,
    ctimeMs: state.ctimeMs,
  };
}

const sidebar = generateSlider("").items;

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "知识库",
      customCss: ["./src/styles/index.css"],
      social: {
        // github: "https://github.com/withastro/starlight",
      },

      sidebar: sidebar,
    }),
  ],
  image: {
    domains: [],
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
});
