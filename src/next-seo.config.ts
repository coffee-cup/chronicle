import { DefaultSeoProps } from "next-seo";

const title = "Chronicle";
const url = "https://chronicle.ink";
const description =
  "Lightweight journaling app where you record highlights of your day";
const image = "https://chronicle.ink/og.png";

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
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    handle: "@chronicle_ink",
    cardType: "summary",
  },
};

export default config;
