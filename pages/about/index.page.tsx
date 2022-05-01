import React from "react";
import CardComponent, { SampleCardData } from "@components/Reusable/Card/Card";
import type { NextPageWithLayout } from "../_app.page";

const About: NextPageWithLayout<{}> = () => <div>
  <h1>Cards Testing</h1>
  <CardComponent cardData={SampleCardData} />
</div>;

//noinspection JSUnusedGlobalSymbols
export default About;
