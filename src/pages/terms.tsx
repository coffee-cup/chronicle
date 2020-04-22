/** @jsx jsx */
import * as React from "react";
import { Box, Text, Flex, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Terms = () => {
  return (
    <Layout title="Terms of Service">
      <Flex
        sx={{
          py: [4, 5],
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: [null, "measure"],
          }}
        >
          <Styled.h1 sx={{ mb: 3 }}>Terms of Service</Styled.h1>

          <Styled.h2>1. Terms</Styled.h2>
          <p>
            By accessing the website at{" "}
            <Link href="https://chronicle.ink">https://chronicle.ink</Link>, you
            are agreeing to be bound by these terms of service, all applicable
            laws and regulations, and agree that you are responsible for
            compliance with any applicable local laws. If you do not agree with
            any of these terms, you are prohibited from using or accessing this
            site. The materials contained in this website are protected by
            applicable copyright and trademark law.
          </p>
          <Styled.h2>2. Use License</Styled.h2>
          <Styled.ol type="a">
            <Styled.li>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on Chronicle's website for
              personal, non-commercial transitory viewing only. This is the
              grant of a license, not a transfer of title, and under this
              license you may not:
              <Styled.ol type="i">
                <Styled.li>modify or copy the materials;</Styled.li>
                <Styled.li>
                  use the materials for any commercial purpose, or for any
                  public display (commercial or non-commercial);
                </Styled.li>
                <Styled.li>
                  attempt to decompile or reverse engineer any software
                  contained on Chronicle's website;
                </Styled.li>
                <Styled.li>
                  remove any copyright or other proprietary notations from the
                  materials; or
                </Styled.li>
                <Styled.li>
                  transfer the materials to another person or "mirror" the
                  materials on any other server.
                </Styled.li>
              </Styled.ol>
            </Styled.li>
            <Styled.li>
              This license shall automatically terminate if you violate any of
              these restrictions and may be terminated by Chronicle at any time.
              Upon terminating your viewing of these materials or upon the
              termination of this license, you must destroy any downloaded
              materials in your possession whether in electronic or printed
              format.
            </Styled.li>
          </Styled.ol>
          <Styled.h2>3. Disclaimer</Styled.h2>
          <Styled.ol type="a">
            <Styled.li>
              The materials on Chronicle's website are provided on an 'as is'
              basis. Chronicle makes no warranties, expressed or implied, and
              hereby disclaims and negates all other warranties including,
              without limitation, implied warranties or conditions of
              merchantability, fitness for a particular purpose, or
              non-infringement of intellectual property or other violation of
              rights.
            </Styled.li>
            <Styled.li>
              Further, Chronicle does not warrant or make any representations
              concerning the accuracy, likely results, or reliability of the use
              of the materials on its website or otherwise relating to such
              materials or on any sites linked to this site.
            </Styled.li>
          </Styled.ol>
          <Styled.h2>4. Limitations</Styled.h2>
          <p>
            In no event shall Chronicle or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on Chronicle's website, even if
            Chronicle or a Chronicle authorized representative has been notified
            orally or in writing of the possibility of such damage. Because some
            jurisdictions do not allow limitations on implied warranties, or
            limitations of liability for consequential or incidental damages,
            these limitations may not apply to you.
          </p>
          <Styled.h2>5. Accuracy of materials</Styled.h2>
          <p>
            The materials appearing on Chronicle's website could include
            technical, typographical, or photographic errors. Chronicle does not
            warrant that any of the materials on its website are accurate,
            complete or current. Chronicle may make changes to the materials
            contained on its website at any time without notice. However
            Chronicle does not make any commitment to update the materials.
          </p>
          <Styled.h2>6. Links</Styled.h2>
          <p>
            Chronicle has not reviewed all of the sites linked to its website
            and is not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement by Chronicle of the
            site. Use of any such linked website is at the user's own risk.
          </p>
          <Styled.h2>7. Modifications</Styled.h2>
          <p>
            Chronicle may revise these terms of service for its website at any
            time without notice. By using this website you are agreeing to be
            bound by the then current version of these terms of service.
          </p>
          <Styled.h2>8. Governing Law</Styled.h2>
          <p>
            These terms and conditions are governed by and construed in
            accordance with the laws of London, UK and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
          <p>
            <Link href="https://getterms.io">
              Terms of Use created with GetTerms.
            </Link>
          </p>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Terms;
