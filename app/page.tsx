import { sanityClient } from "@/sanity/client";
import HomeClient from "./HomeClient";

const POSTS_QUERY = `*[_type == "beers"]|order(publishedAt desc)[0...12]{
  beerName,
  beerType,
  beerDetails,
  beerABV,
  beerIBU,
  beerLowPrice,
  beerHighPrice,
  breweryLogo,
  newBeer,
  soldBeer
}`;

export default async function Home() {
  const data = await sanityClient.fetch(POSTS_QUERY, {}, { cache: "no-store" });

  if (!data) {
    return <div>Nema sadržaja (dokument još nije napravljen).</div>;
  }

  return <HomeClient data={data} />;
}