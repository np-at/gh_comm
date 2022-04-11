import Link from "next/link";
import React from "react";
import styled from "styled-components";

export interface CardData {
  title: string;
  card_body: string;
  image: string;
  image_alt?: string;
  link: string;
}

export const SampleCardData: CardData[] = [
  {
    title: "Card Title",
    image: "https://picsum.photos/500/300/?image=10",
    card_body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit lkj;j lsajflkjsfdljla;djsf;lajksdf;ljasd;flkjasd;lfkja;sdlkj",
    link: "/"
  },
  {
    title: "Card 2 Title",
    image: "https://picsum.photos/500/300/?image=14",
    image_alt: "Card 2 Image",
    card_body:
      "Cum nuptia prarere, omnes ususes fallere germanus, raptus demissioes. ",
    link: "/"
  },
  {
    title: "Card 3 Title",
    image: "https://picsum.photos/500/300/?image=15",
    image_alt: "Card 3 Image",
    card_body:
      "Cum agripeta peregrinationes, omnes lacteaes carpseris camerarius, clemens itineris tramitemes. ",
    link: "/"
  },
  {
    title: "Card 4 Title",
    image: "https://picsum.photos/500/300/?image=16",
    image_alt: "Card 4 Image",
    card_body:
      "Altus, secundus pulchritudines aliquando imperium de albus, magnum cedrium. ",
    link: "/"
  },
  {
    title: "Card 5 Title",
    image: "https://picsum.photos/500/300/?image=17",
    image_alt: "Card 5 Image",
    card_body:
      "Fatalis, altus cobaltums satis imitari de azureus, flavum luba. ",
    link: "/"
  },
  {
    title: "Card 6 Title",
    image: "https://picsum.photos/500/300/?image=18",
    image_alt: "Card 6 Image",
    card_body:
      "Lotus, raptus repressors sapienter aperto de festus, grandis guttus. ",
    link: "/"
  },
  {
    title: "Card 7 Title",
    image: "https://picsum.photos/500/300/?image=19",
    image_alt: "Card 7 Image",
    card_body:
      "Cum palus peregrinationes, omnes abactores resuscitabo neuter, fortis nomenes. ",
    link: "/"
  },
  {
    title: "Card 8 Title",
    image: "https://picsum.photos/500/300/?image=20",
    image_alt: "Card 8 Image",
    card_body:
      "Fortis, barbatus terrors tandem imitari de domesticus, superbus historia. ",
    link: "/"
  },
  {
    title: "Card 9 Title",
    image: "https://picsum.photos/500/300/?image=21",
    image_alt: "Card 9 Image",
    card_body:
      "Cum fluctus ortum, omnes lanistaes talem bi-color, germanus byssuses. ",
    link: "/"
  },
  {
    title: "Card 10 Title",
    image: "https://picsum.photos/500/300/?image=22",
    image_alt: "Card 10 Image",
    card_body:
      "Cum cacula accelerare, omnes barcases imperium audax, velox vigiles. ",
    link: "/"
  }
];
const CardComponent: React.FC<{ cardData: CardData[] }> = ({ cardData }) => (
  <CardsCollectionWrapper>
    {cardData.map((card) => (
      <CardsItem key={`${card.title}-${card.image}`}>
        <Card>
          <CardImageWrapper>
            <img src={card.image} alt={card.image_alt} />
          </CardImageWrapper>
          <CardBody>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.card_body}</CardText>
            <Link href={card.link} passHref={true}>
              <ReadMoreBtn>Read More</ReadMoreBtn>
            </Link>
          </CardBody>
        </Card>
      </CardsItem>
    ))}
  </CardsCollectionWrapper>
);
const CardText = styled.div`
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  padding-bottom: 1.25rem;

  font-weight: 400;

  text-align: center;
  overflow: auto;
  overflow-wrap: break-word;
`;
const CardBody = styled.div`
  padding: 1rem;
  background: linear-gradient(to bottom left, #ef8d9c 40%, #ffc39e 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const CardImageWrapper = styled.div`
  & > img {
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }
`;
const Card = styled.div`
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const CardsItem = styled.li`
  //@media (prefers-reduced-motion: no-preference) {
  //  transition: box-shadow 0.2s linear;
  //  &:hover {
  //    //transform: scale(1.01);
  //    box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  //  }
  //}
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  display: flex;
  padding: 1.5rem;
  justify-content: space-around;

  @media (min-width: 64rem) {
    flex-basis: calc(50% - 2rem);
    padding: 2rem;
    max-width: 35rem;
  }
  @media (min-width: 56rem) {
    width: calc(33.3333% - 1.5rem);
  }
  @media (min-width: 44rem) {
    width: 40%;
  }
  @media (max-width: 44rem) {
    max-width: 34rem;
    width: 100%;
  }
`;
const CardsCollectionWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 2rem 0;
  padding: 0;
  justify-content: center;
`;
const CardTitle = styled.h2`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 0;
`;
const ReadMoreBtn = styled.a`
  //margin-bottom: 0;;
  bottom: 0;
  margin-top: auto;
  color: #ffffff;
  padding: 0.8rem;
  font-size: 14px;
  text-transform: uppercase;
  border-radius: 4px;
  font-weight: 400;
  display: block;
  width: 100%;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;
export default CardComponent;
