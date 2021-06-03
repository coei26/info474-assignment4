import React, { useState } from "react";
import { scaleLinear, scaleBand } from "d3-scale";
import { Axis, Orient } from "d3-axis-for-react";
import { useFetch } from "../hooks/useFetch";
const countryFinder = require("country-finder");

export const Latitude = () => {
  const [data, loading] = useFetch(
    "https://raw.githubusercontent.com/rishikavikondala/internet-analysis/main/internet.csv"
  );
  const width = 700;
  const height = 700;
  const margin = 50;

  const [displayContinents, setDisplayContinents] = useState([
    "North America",
    "South America",
    "Asia",
    "Africa",
    "Australia",
    "Europe",
  ]);

  const getLatitude = (country) => {
    try {
      const nameMap = {
        "Bosnia and Herzegovina": "Bosnia",
        "Cape Verde": "Cabo Verde",
        "Democratic Republic of the Congo": "DRC",
        "Republic of the Congo": "Congo",
        "Ivory Coast": 'Côte d"Ivoire',
        "South Korea": "S. Korea",
        Laos: 'Lao People"s Democratic Republic',
        Libya: "Libyan Arab Jamahiriya",
        "Federated States of Micronesia": "Micronesia",
        "Slovak Republic": "Slovakia",
        Syria: "Syrian Arab Republic",
        "United Arab Emirates": "UAE",
        "United Kingdom": "UK",
        "United States": "USA",
        "Czech Republic": "Czechia",
      };
      if (country in nameMap) {
        let newCountry = nameMap[country];
        return parseFloat(countryFinder.byName(newCountry)["lat"]);
      }
      return parseFloat(countryFinder.byName(country)["lat"]);
    } catch {
      console.log(country);
    }
  };

  const determineColorMap = () => {
    return {
      "North America": "red",
      "South America": "orange",
      Asia: "green",
      Africa: "blue",
      Australia: "purple",
      Europe: "grey",
    };
  };

  const modifyContinentDisplay = (continent) => {
    let newDisplayContinents = displayContinents.slice(0);
    if (newDisplayContinents.includes(continent)) {
      // remove continent if it exists
      newDisplayContinents = newDisplayContinents.filter((element) => {
        return element !== continent;
      });
    } else {
      newDisplayContinents.push(continent); // add continent if it doesn't exist
    }
    setDisplayContinents(newDisplayContinents);
  };

  if (loading) {
    return <h2>Loading ...</h2>;
  } else {
    const countryMap = {};
    data.forEach((point) => {
      const mapping = {
        continent: point["continent"],
        internetuserate: parseFloat(point["internetuserate"]),
        urbanrate: parseFloat(point["urbanrate"]),
        latitude: getLatitude(point["country"]),
      };
      countryMap[point["country"]] = mapping;
    });

    const xScale = scaleLinear()
      .domain([0, 100])
      .range([margin, width - margin]);
    const yScale = scaleLinear()
      .domain([-90, 90])
      .range([height - margin, margin]);

    const plot = data.map((point) => {
      const radius = 3.5;
      const x = xScale(countryMap[point.country]["internetuserate"]);
      const y = yScale(countryMap[point.country]["latitude"]);
      if (displayContinents.includes(point.continent)) {
        return (
          <circle
            style={{ fill: determineColorMap()[point.continent] }}
            cx={x}
            cy={y}
            r={radius}
          />
        );
      }
    });

    return (
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <div>
          <h3 className="pb-4">
            How does the proximity to the equator affect a country's internet
            use rate?
          </h3>
          <p className="pb-3">
            The distance from the equator for which a country is situated in can
            be an indicator of the climate of a country. We can draw insights
            from the latitudinal location of a country in relation to internet
            use rate. Is technological access in a country limited by its
            location? Which countries will be most vulnerable to climate change,
            and how does this compare relatively within and across different
            continents of the world?
          </p>
          <h5>Select which continents to view:</h5>
          <input
            checked={displayContinents.includes("North America")}
            type="checkbox"
            id="northamerica"
            name="northamerica"
            onChange={() => modifyContinentDisplay("North America")}
          />
          <label htmlFor="northamerica">&nbsp;North America -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "red",
              display: "inline-block",
            }}
          ></div>
          <br />
          <input
            checked={displayContinents.includes("South America")}
            type="checkbox"
            id="southamerica"
            name="southamerica"
            onChange={() => modifyContinentDisplay("South America")}
          />
          <label htmlFor="southamerica">&nbsp;South America -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "orange",
              display: "inline-block",
            }}
          ></div>
          <br />
          <input
            checked={displayContinents.includes("Asia")}
            type="checkbox"
            id="asia"
            name="asia"
            onChange={() => modifyContinentDisplay("Asia")}
          />
          <label htmlFor="asia">&nbsp;Asia -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "green",
              display: "inline-block",
            }}
          ></div>
          <br />
          <input
            checked={displayContinents.includes("Africa")}
            type="checkbox"
            id="africa"
            name="africa"
            onChange={() => modifyContinentDisplay("Africa")}
          />
          <label htmlFor="africa">&nbsp;Africa -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "blue",
              display: "inline-block",
            }}
          ></div>
          <br />
          <input
            checked={displayContinents.includes("Australia")}
            type="checkbox"
            id="australia"
            name="australia"
            onChange={() => modifyContinentDisplay("Australia")}
          />
          <label htmlFor="australia">&nbsp;Australia -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "purple",
              display: "inline-block",
            }}
          ></div>
          <br />
          <input
            checked={displayContinents.includes("Europe")}
            type="checkbox"
            id="europe"
            name="europe"
            onChange={() => modifyContinentDisplay("Europe")}
          />
          <label htmlFor="europe">&nbsp;Europe -&nbsp;</label>
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: "grey",
              display: "inline-block",
            }}
          ></div>
          <br />
        </div>
        <svg
          style={{ display: "block", margin: "auto" }}
          width={width}
          height={height}
        >
          <text
            className="title"
            style={{ textAnchor: "middle", fontSize: "20px" }}
            x={width / 2}
            y={margin - 20}
          >
            Internet Use Rate Across The Globe Based On Latitude
          </text>
          <text
            style={{ textAnchor: "middle", fontSize: "16px" }}
            className="x-label"
            x={width / 2}
            y={height - margin + 10}
          >
            Internet Use Rate
          </text>
          <text
            style={{ textAnchor: "middle", fontSize: "16px" }}
            className="y-label"
            transform={`translate(${margin - 30}, ${height / 2})rotate(-90)`}
          >
            Latitude
          </text>
          <g transform={`translate(${margin}, 0)`} className="axisLeft">
            <Axis orient={Orient.left} scale={yScale} />
          </g>
          <g transform={`translate(0, ${height / 2})`} className="axisBottom">
            <Axis orient={Orient.bottom} scale={xScale} />
          </g>
          {plot}
        </svg>
        <br></br>
      </div>
    );
  }
};
