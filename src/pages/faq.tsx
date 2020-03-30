/** @jsx jsx */
import * as React from "react";
import { Box, Text, Flex, jsx, Styled } from "theme-ui";
import Layout from "../components/Layout";
import Link from "../components/Link";

const Question: React.FC<{ title: string }> = props => (
  <Box sx={{ pt: 2 }}>
    <Styled.h3>{props.title}</Styled.h3>
    <Box>{props.children}</Box>
  </Box>
);

const Faq = () => {
  return (
    <Layout title="FAQ">
      <Flex
        sx={{
          py: 5,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: [null, "measure"],
          }}
        >
          <Styled.h1 sx={{ mb: 3 }}>FAQ</Styled.h1>

          <Question title="Why is this a thing?">
            <Styled.p>
              Chronicle started because I noticed that most people (myself
              especially) are terrible at remembering what they did on a
              specific day in the past. However, with a few high level reference
              points, most people start remembering a lot more about the
              specifics.
            </Styled.p>

            <Styled.p>
              For example, the question, "what did you do 3 weeks ago Monday?",
              is not that easy to answer. But if you have the reference points
              that on the day before you went for a pub quiz with your friends
              and on the Tuesday you made fresh pasta, it becomes much easier to
              remember what you did on the Monday.
            </Styled.p>

            <Styled.p>
              Chronicle was created to store these reference points. Whenever
              you have time and remember, you can quickly jot down some key
              things that happened that day or any day in the past.
            </Styled.p>
          </Question>

          <Question title="Why are entries limited to 140 characters?">
            <Styled.p>
              We encourage entries to be short and to the point. You shouldn't
              be writing paragraphs about a specific event, but rather just
              writing that the event took place.
            </Styled.p>
          </Question>

          <Question title="Where can I give feedback and request features?">
            <Styled.p>
              Feedback and feature requests are encouraged! Please tweet at or
              send a DM to{" "}
              <Link href="https://twitter.com/chronicle_ink">
                @chronicle_ink
              </Link>{" "}
              on Twitter.
            </Styled.p>
          </Question>

          <Question title="What data is being tracked?">
            <Styled.p>
              Views to this website are recorded with{" "}
              <Link href="https://simpleanalytics.com">Simple Analytics</Link>,
              a privacy focused alternative to Google Analytics. We{" "}
              <b>do not</b> track events or anything that you enter in your
              journal.
            </Styled.p>
          </Question>

          <Question title="How do I delete my account">
            <Styled.p>
              Head to <Link href="/pref">/profile</Link> and there are options
              for deleting all your entires or all your entries+account. Careful
              though, these actions are permanant.
            </Styled.p>
          </Question>

          <Question title="Why is the domain .ink?">
            <Styled.p>
              Mainly, because it was available. Good domains are hard to come
              by. If you think hard about it though, ink is used to write stuff
              down permanatley, and that is <em>(sort of)</em> what Chronicle is
              about.
            </Styled.p>
          </Question>

          <Question title="How is this made?">
            <Styled.p>
              Chronicle is a <Link href="https://nextjs.org/">NextJS</Link>{" "}
              application. If you <b>do not</b> have an account, the logs are
              stored locally in{" "}
              <Link href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">
                IndexedDB
              </Link>
              . If you <b>have</b> an account, the logs are stored in{" "}
              <Link href="https://firebase.google.com/docs/firestore">
                Cloud Firestore
              </Link>
              .
            </Styled.p>
          </Question>
        </Box>
      </Flex>
    </Layout>
  );
};

export default Faq;
