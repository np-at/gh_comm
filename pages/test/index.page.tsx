import React from "react";
import { NextPageWithLayout } from "../_app.page";
import Timeline, { TimelineItempProps } from "@components/Timeline/Timeline";

const testItems: TimelineItempProps[] = [
  {
    date: "2020-01-01",
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
  }
];
const TestPage: NextPageWithLayout<{}> = () => {
  return (
    <div style={{  width: "100%" }}>
      <Timeline items={testItems} />
    </div>
  );
};

export default TestPage;
