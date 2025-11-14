"use client";

import { useState } from "react";
import { PortableText } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";


const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source).auto("format").fit("max");

export default function HomeClient({ data }: { data: any[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="header">
      <div className="container">
        <div className="logo">
          <img src="/appLogo.png" alt="appLogo" />
        </div>
        <div className="tagline">Taste the Hops</div>
        <div className="main-title">Feel the Craft</div>
      </div>

      {data.map((beer: any, index: number) => (
        <div className="accordion-item" key={beer.beerName}>
          
          {/* HEADER NA KOJI SE KLIKĆE */}
          <div 
            className="accordion-header" 
            onClick={() => toggleAccordion(index)}
          >
            <div className="beer-logo">
                {beer.breweryLogo && (
                    <img 
                    src={urlFor(beer.breweryLogo).width(80).height(80).url()} 
                    alt={beer.beerName} 
                    />
                )}
            </div>

            <div className="beer-info">
              <div className="beer-category">{beer.beerName}</div>

              {beer.soldBeer ? (
                <div className="status out-of-stock">SOLD OUT</div>
              ) : (
                <div className="status on-tap">ON TAP</div>
              )}

              <div className="beer-specs">
                {beer.beerType}<br />
                {beer.beerABV} ABV | {beer.beerIBU} IBU
              </div>
            </div>

            <div className="status price">
              {beer.beerLowPrice}/{beer.beerHighPrice}
            </div>

            <div className="more-btn">more</div>
          </div>

          {/* SADRŽAJ */}
          <div className={`accordion-content ${activeIndex === index ? "active" : ""}`}>
            <div className="beer-description">
              <div className="beer-info">
                <div className="beer-category">{beer.beerName}</div>
                <div className="beer-specs">
                  IPA - New England / Hazy<br />
                  6.4% ABV | 50 IBU | 10% EKS
                </div>
              </div>
             <PortableText value={beer.beerDetails} />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}
