// Graph 1: name the file Bars.js
import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export function Bars() {
  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/rishikavikondala/internet-analysis/main/internet.csv"
  );

  const width = 4000;
  const height = 300;
  const scaleFactor = 5;
  const [selectedCountry, setSelectedCountry] = useState("Albania");
  const [selectedAttribute, setSelectedAttribute] = useState("internetuserate");

  if (loading) {
    return <h2>Loading ...</h2>;
  } else {
    const countryMap = {};
    data.forEach((point) => {
      const mapping = {
        internetuserate: parseFloat(point["internetuserate"]),
        urbanrate: parseFloat(point["urbanrate"]),
        continent: point["continent"],
      };
      countryMap[point["country"]] = mapping;
    });

    const getContinentPercentage = () => {
      let continent = countryMap[selectedCountry]["continent"];
      let sum = 0;
      let quantity = 0;
      data.forEach((point) => {
        if (point.continent == continent) {
          if (selectedAttribute == "internetuserate") {
            sum += parseFloat(point.internetuserate);
            quantity += 1;
          } else {
            sum += parseFloat(point.urbanrate);
            quantity += 1;
          }
        }
      });
      return sum / quantity;
    };

    const countryPercentage =
      countryMap[selectedCountry][selectedAttribute] * scaleFactor;
    const continentPercentage = getContinentPercentage() * scaleFactor;

    const countryDisplayPercentage = countryPercentage / scaleFactor;
    const continentDisplayPercentage = continentPercentage / scaleFactor;

    return (
      <div>
        <h3 className="pb-4">
          How does a country's <i>internet use</i> and <i>urban</i> rate compare
          to the average rates for the continent it is located on?
        </h3>
        <p className="pb-3">
          Looking deeper into urbanization, we can conduct a more
          individualistic investigation of internet use compared to urban rate
          of a specific country in comparison to the average internet use and
          urban rate of the continent it is located on. This provides more
          thorough and comprehensive insights as to how these two statistics
          compare in each specific country.
        </p>
        <br></br>
        <div>
          <h5>Select country:</h5>
          <select
            id="country"
            onChange={() => setSelectedCountry(country.value)}
          >
            {data.map((point) => (
              <option value={point.country}>{point.country}</option>
            ))}
          </select>
          <br />
          <h5 className="pt-4">Select statistic:</h5>
          <select
            id="attribute"
            onChange={() => setSelectedAttribute(attribute.value)}
          >
            <option value="internetuserate">Internet Use Rate</option>
            <option value="urbanrate">Urban Rate</option>
          </select>
        </div>
        <br />
        <svg
          style={{ display: "block", margin: "auto" }}
          width={width}
          height={height}
        >
          {/* One for country */}
          <text x="10" y="20" fill="black">
            COUNTRY: {selectedCountry} --{">"}{" "}
            {countryDisplayPercentage.toFixed(2)}%
          </text>
          <rect x={10} y={30} height={50} width={500} fill="black" />
          <rect
            x={10}
            y={30}
            height={50}
            width={countryPercentage}
            fill="blue"
          />
          {/* One for associated continent */}
          <text x="10" y="110" fill="black">
            CONTINENT: {countryMap[selectedCountry]["continent"]} --{">"}{" "}
            {continentDisplayPercentage.toFixed(2)}%
          </text>
          <rect x={10} y={120} height={50} width={500} fill="black" />
          <rect
            x={10}
            y={120}
            height={50}
            width={continentPercentage}
            fill="red"
          />
        </svg>
      </div>
    );
  }
}
