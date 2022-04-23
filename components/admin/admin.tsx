import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
} from "react";
import * as runtime from "react/jsx-runtime";
import CMS from "netlify-cms-app";
import { PreviewTemplateComponentProps } from "netlify-cms-core";
import Head from "next/head";
import { useMDXComponents } from "@mdx-js/react";
import React from "react";
import { evaluate } from "@mdx-js/mdx";
import ArticleProvider from "components/article/provider";

const PrewviewContext = createContext({} as PreviewTemplateComponentProps);
export const usePreview = () => useContext(PrewviewContext);

export const useArticleProvider = () => {
  const { getAsset } = usePreview();
  const provider = useMDXComponents({
    img: (props) => {
      return <img src={getAsset(props.src).url} />;
    },
  });
  return provider;
};

const HOCPreview = (props: PreviewTemplateComponentProps) => {
  return (
    <PrewviewContext.Provider value={props}>
      <ArticleProvider>
        <Preview {...props} />
      </ArticleProvider>
    </PrewviewContext.Provider>
  );
};

function useMDX(content) {
  // @ts-ignore
  const [exports, setExports] = useState({ default: runtime.Fragment });

  useEffect(() => {
    // @ts-ignore
    evaluate(content, {
      ...runtime,
      useMDXComponents: useArticleProvider,
    })
      .then((exports) => setExports(exports))
      .catch((err) => console.log("errored, not updating"));
  }, [content]);

  return exports;
}

const Preview = (props: PreviewTemplateComponentProps) => {
  const entry = props.entry;
  const title = entry.getIn(["data", "title"]) || "";
  const body = entry.getIn(["data", "body"]);

  const exports = useMDX(body);
  const Content = exports.default;

  useEffect(() => {
    // @ts-ignore
    YOAST.setContent({
      title: title,
      description: entry.getIn(["data", "description"]) || "",
      keyword: entry.getIn(["data", "yoast_keyword"]) || "",
      text: body,
      titleWidth: title.split("").length * 5, // 5px is an average width of each character ;)
    });
  }, [
    body,
    title,
    entry.getIn(["data", "description"]) || "",
    entry.getIn(["data", "yoast_keyword"]) || "",
  ]);

  return (
    <>
      <h1>{props.widgetFor("title")}</h1>
      <Content />
      {/* @ts-ignore */}
      {YOAST.getScoresAsHTML(React.createElement)}
    </>
  );
};

const Admin = () => {
  useEffect(() => {
    CMS.init();
    CMS.registerPreviewStyle("/css/typography.css");
    CMS.registerPreviewStyle("/css/dracula.css");
    CMS.registerPreviewStyle(
      "https://unpkg.com/tailwindcss@2.1.0/dist/tailwind.css"
    );
    CMS.registerPreviewStyle(
      "https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.css"
    );

    CMS.registerEditorComponent({
      id: "notice-block",
      label: "Notice Block",
      fields: [
        {
          name: "details",
          label: "Details",
          widget: "markdown",
        },
      ],
      pattern: /^<Notice>$\s*?\n(.*?)\n^<\/Notice>$/ms,
      fromBlock: function(match) {
        return {
          details: match[1],
        };
      },
      toBlock: function(data) {
        return `<Notice>\n\n${data.details}\n\n</Notice>
        `;
      },
      toPreview: function(data) {
        return `<Notice>${data.details}</Notice>
        `;
      },
    });

    CMS.registerEditorComponent({
      id: "tweet-block",
      label: "Tweet",
      fields: [
        {
          name: "id",
          label: "Tweet Id",
          widget: "string",
        },
      ],
      pattern: /<Tweet\sid="[0-9]+"\s\/>/g,
      fromBlock: function(match) {
        return {
          details: match[1],
        };
      },
      toBlock: function(data) {
        return `<Tweet id="${data.id}" />`;
      },
      toPreview: function(data) {
        return `<Tweet id="${data.id}" />`;
      },
    });

    CMS.registerEditorComponent({
      id: "pros-block",
      label: "Pros",
      fields: [
        {
          name: "children",
          label: "Children",
          widget: "markdown",
        },
      ],
      pattern: /^<List type="tick">$\s*?\n(.*?)\n^<\/List>$/ms,
      fromBlock: function(match) {
        return {
          children: match[1],
        };
      },
      toBlock: function(data) {
        return `<List type="tick">\n\n${data.children}\n\n</List>
        `;
      },
      toPreview: function(data) {
        return `<List type="tick">${data.children}</List>
        `;
      },
    });

    CMS.registerEditorComponent({
      id: "const-block",
      label: "Cons",
      fields: [
        {
          name: "children",
          label: "Children",
          widget: "markdown",
        },
      ],
      pattern: /^<List type="cross">$\s*?\n(.*?)\n^<\/List>$/ms,
      fromBlock: function(match) {
        return {
          children: match[1],
        };
      },
      toBlock: function(data) {
        return `<List type="cross">\n\n${data.children}\n\n</List>
        `;
      },
      toPreview: function(data) {
        return `<List type="cross">${data.children}</List>
        `;
      },
    });

    CMS.registerPreviewTemplate("blog", HOCPreview);
  }, []);

  return (
    <>
      <Head>
        <script src="https://unpkg.com/netlify-cms-yoast-seo@~1.0/dist/main.js"></script>
      </Head>
    </>
  );
};

export default Admin;
