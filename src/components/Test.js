import React, { useState } from "React";
import { geoPath, geoMercator, geoEqualEarth } from "d3-geo";
import { useJson } from "../hooks/useJson";
import { feature } from "topojson-client";
import { useFetch } from "../hooks/useFetch";
import { scaleSequential } from "d3-scale-chromatic";

export default function Map() {
  const [data, loading] = useJson(
    "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
  );
  const [statData, statLoading] = useFetch(
    "https://raw.githubusercontent.com/rishikavikondala/internet-analysis/main/internet.csv"
  );

  // state for column selected (dropdown)

  // the dimensions of our svg
  // NOTE: the map is quite big, using a width of 1000
  // so we don't have to re-center or zoom the map
  const width = 1200;
  const height = 800;

  // if loading, just return some text
  if (loading & statLoading) {
    return <h2>Loading ...</h2>;
    // only work with all data if data is loaded
  } else {
    // data.object has 2 fields: countries and land
    // each field contains shape information at that level
    // e.g. "land" is just one shape
    const countries = feature(data, data.objects.countries);

    // access data
    const countryData = {};
    statData.forEach((stat) => {
      const mapping = {
        country: stat["country"],
        internetuserate: parseFloat(stat["internetuserate"]),
        urbanrate: parseFloat(stat["urbanrate"]),
        income: parseFloat(stat["incomeperperson"]),
      };
      countryData[stat["country"]] = mapping;
    });
    console.log(countryData);

    // geoPath returns a function we can use to translate geoJson shapes to
    // svg elements
    const projection = geoMercator()
      .scale(160)
      .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);

    const color = scaleSequential()
      .domain(d3.extent(statData, (d) => +d["incomeperperson"]))
      .interpolator(d3.interpolateYlGnBu)
      .unknown("#ccc");

    const determineFillColor = (country) => {
      let num = countryData[country]["incomeperperson"];
      return color(num);
    };

    return (
      <div>
        <h3 className="pb-4">
          How does the distribution of <i>income per person</i>,{" "}
          <i>urban rate</i>, and <i>internet use rate</i> compare across the
          globe?
        </h3>
        <p className="pb-3">
          Using a choropleth map of the world, a broad overview of the
          distribution of the income, urbanization, and internet use around the
          world is provided below. This is an efficient way to gauge areas of
          need, as well as the level of disparities between developed,
          developing, and underdeveloped nations. We can use this map as a
          starting point for determining which countries and continents to
          conduct deeper research studies on.
        </p>
        {/* Interaction: Dropdown Menu */}
        <div className="pb-4">
          <h5>
            <label htmlFor="scheme">Select view:</label>
            <br />
          </h5>
          <select id="statistic" onChange={() => setStatistic(statistic.value)}>
            <option value="internet">Internet Use Rate</option>
            <option value="income">Income Per Person</option>
            <option value="urban">Urban Rate</option>
          </select>
        </div>
        {/* countries map */}
        <svg
          style={{
            margin: "auto",
            display: "block",
            marginBottom: "5rem",
            viewBox: `0 0 ${width} ${height}`,
          }}
          width={width}
          height={height}
        >
          <g>
            {countries.features.map((country) => {
              return (
                <path
                  style={{
                    fill: determineFillColor(country),
                    stroke: "black",
                  }}
                  d={path(country)}
                ></path>
              );
            })}
          </g>
        </svg>
      </div>
    );
  }
}
