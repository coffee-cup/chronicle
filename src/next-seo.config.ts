import { DefaultSeoProps } from "next-seo";

const title = "Chronicle";
const url = "";
const description = "";
const image = "";

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [
      {
        url: image,
        width: 1024,
        height: 1024
      }
    ]
  },
  twitter: {
    handle: "@jakerunzer",
    cardType: "summary"
  }
};

export default config;
