import React from "react";
import CardComponent, { SampleCardData } from "@components/Reusable/Card/Card";
import { NextPageWithLayout } from "../_app.page";

const About: NextPageWithLayout<{}> = () => {
  return (
    <div>
      <h1>About</h1>
      <CardComponent card_data={SampleCardData} />
    </div>
  );
};

//noinspection JSUnusedGlobalSymbols
export default About;
