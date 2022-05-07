import React from "react";
import { NextPageWithLayout } from "../_app.page";
import Timeline  from "@components/Timeline/Timeline";
import Layout from "@components/Layout/Layout";
import type {TimelineItempProps} from "@components/Timeline/TimelineItem";

const testItems: TimelineItempProps[] = [
  {
    date: "2019-01-20",
    title: "test",
    description: "test"
  },
  {
    date: "2020-02-02",
    title: "test",
    description: "test2"
  },
  {
    date: "2020-01-03",
    title: "test",
    description: "test3"
  },
  {
    date: "2020-01-04",
    title: "test",
    description: "test4"
  },
  {
    date: "2020-01-05",
    title: "test",
    description: "test5"
  }
];
const TestPage: NextPageWithLayout<{}> = () => {
  return (
    <div style={{  width: "100%", height: "100%" }}>
      <Timeline items={testItems} />
    </div>
  );
};
TestPage.getLayout = (page) => <Layout fixedPageSize={"calc(100vh - 3rem)"}>{page}</Layout>
export default TestPage;
