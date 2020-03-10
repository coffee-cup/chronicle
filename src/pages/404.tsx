/** @jsx jsx */
import Layout from "../components/Layout";
import Link from "../components/Link";
import SEO from "../components/SEO";
import { jsx } from "theme-ui";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not Found" />
    <div>
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;
