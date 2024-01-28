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
        .sort((a, b) => a.order - b.order),
    };
  }

  const ext = path.extname(p);

  if (ext !== ".md") {
    return undefined;
  }

  return {
    label: path.basename(p, ext),
    link: serializedPath(p.replace(ext, "/")),
    order: FileOrder,
  };
}

export function getDirs() {
  const dirs = fs.readdirSync("./src/content/docs");
  return dirs
    .filter((item) => {
      return !excludes.includes(item);
    })
    .map((item) => {
      return {
        label: item,
        collapsed: true,
        autogenerate: {
          directory: item,
        },
      };
    });
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

      // {
      //   label: 'Guides',
      //   // 自动生成一个链接分组，用于 'guides' 目录。
      //   autogenerate: { directory: 'guides' },
      // },

      sidebar,
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
