import * as React from "react";
import { DefaultSeo } from "next-seo";
import defaultConfig from "../next-seo.config";
import Head from "next/head";

export interface Props {
  title?: string;
  description?: string;
}

const SEO: React.FC<Props> = props => {
  const title =
    props.title != null
      ? `${props.title} | ${defaultConfig.title}`
      : defaultConfig.title;
  const description = props.description || defaultConfig.description;

  return (
    <>
      <DefaultSeo {...defaultConfig} />

      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
    </>
  );
};

export default SEO;
