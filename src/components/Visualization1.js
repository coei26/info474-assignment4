import React, { useState } from 'react';
import { extent } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { Axis, Orient } from 'd3-axis-for-react';
import { useFetch } from '../hooks/useFetch';
import RangeSlider from 'react-bootstrap-range-slider';
const countryFinder = require("country-finder"); // for getting latitude given country name

export const Visualization1 = () => {
  const dimensions = { width: 800, height: 525, margin: 50 }
  const [data, loading] = useFetch("https://raw.githubusercontent.com/rishikavikondala/internet-analysis/main/internet.csv");
  const [showTooltip, setShowTooltip] = useState(false); // define state for our tooltip display status
  const [tooltipPos, setTooltipPos] = useState({x: 0, y: 0}); // define state for tooltip position
  const [tooltipContent, setTooltipContent] = useState(""); // define state for our tooltip content
  const [colorScheme, setColorScheme] = useState("Color");
  const [displayContinents, setDisplayContinents] = useState([]);
  const [urbanRate, setUrbanRate] = useState(100);
  const [internetRate, setInternetRate] = useState(95);

  const determineColorMap = () => {
    if(colorScheme == "Color") {
      return {
        "North America": "midnightblue", "South America": "mediumvioletred", "Asia": "lightpink",
        "Africa": "cadetblue", "Australia": "khaki", "Europe": "yellowgreen"
      }
    }
    return {
      "North America": "black", "South America": "gray", "Asia": "darkgray",
      "Africa": "silver", "Australia": "lightgray", "Europe": "gainsboro"
    }
  }

  const getLatitude = (country) => {
    try {
      const nameMap = {
        "Bosnia and Herzegovina": "Bosnia", "Cape Verde": "Cabo Verde",
        "Democratic Republic of the Congo": "DRC", "Republic of the Congo": "Congo",
        "Ivory Coast": "Côte d\"Ivoire", "South Korea": "S. Korea",
        "Laos": "Lao People\"s Democratic Republic", "Libya": "Libyan Arab Jamahiriya",
        "Federated States of Micronesia": "Micronesia", "Slovak Republic": "Slovakia",
        "Syria": "Syrian Arab Republic", "United Arab Emirates": "UAE",
        "United Kingdom": "UK", "United States": "USA", "Czech Republic": "Czechia"
      }
      if(country in nameMap) {
        let newCountry = nameMap[country];
        return countryFinder.byName(newCountry)['lat']
      }
      return countryFinder.byName(country)['lat'];
    } catch {
      console.log(country);
    }
  }

  if (loading) {
    return <h2>Loading ...</h2>
  } else {
    const urbanRateExtent = extent(data, point => +point.urbanrate);
    const xScale = scaleLinear().domain(urbanRateExtent).range([dimensions.margin, dimensions.width - dimensions.margin]);
    
    const internetUseRateExtent = extent(data, point => +point.internetuserate);
    const yScale = scaleLinear().domain(internetUseRateExtent).range([dimensions.height - dimensions.margin, dimensions.margin]);

    const circles = data.map((point) => {
      const radius = 4;
      const x = xScale(+point.urbanrate);
      const y = yScale(+point.internetuserate);
      if (+point.urbanrate >= urbanRate) return
      if(+point.internetuserate >= internetRate) return
      if(displayContinents.includes(point.continent)) {
        return <circle
          style={{fill: determineColorMap()[point.continent]}}
          onMouseEnter={(event) => onPointHover(event)}
          onMouseLeave={() => onPointLeave()} 
          cx={x}
          cy={y}
          r={radius} // determine circle center's position
          urbanrate={point.urbanrate}
          internetuserate={point.internetuserate} 
          country={point.country}
          continent={point.continent}
          latitude={parseFloat(getLatitude(point.country))}
        />
      }
    });

    const tooltip = (
      <div style={{
        width: "18rem", height: "5rem", position: "absolute",
        display: `${showTooltip ? "inline" : "none"}`,
        border: '1px solid black', backgroundColor: "white",
        left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px`
      }}>
        <span><strong>&nbsp;Country:</strong> {tooltipContent.country}</span>
        <br />
        <span><strong>&nbsp;Urban Rate:</strong> {tooltipContent.x}</span>
        <br />
        <span><strong>&nbsp;Internet Use Rate:</strong> {tooltipContent.y}</span>
      </div>
    )

    const onPointHover = (circle) => {
      setTooltipPos({ x: circle.pageX + 30, y: circle.pageY });
      setShowTooltip(true);
      const target = circle.target
      setTooltipContent({
        x: target.getAttribute("urbanrate"), 
        y: target.getAttribute("internetuserate"), 
        country: target.getAttribute("country")
      });
    }

    const onPointLeave = () => { setShowTooltip(false); }

    const modifyContinentDisplay = (continent) => {
      let newDisplayContinents = displayContinents.slice(0);
      if(newDisplayContinents.includes(continent)) { // remove continent if it exists
        newDisplayContinents = newDisplayContinents.filter((element) => { return element !== continent; });
      } else {
        newDisplayContinents.push(continent); // add continent if it doesn't exist
      }
      setDisplayContinents(newDisplayContinents);
    }

    return (
      <div className="container" style={{marginLeft: "auto", marginRight: "auto"}}>
        <div className="table">
          <tbody>
            <tr>
              <td>
                {/* Interaction 1: Color Selector */}
                <div>
                  <h5><label htmlFor="scheme">Select color option:</label><br /></h5>
                  <select id="scheme" onChange={() => setColorScheme(scheme.value)}> 
                    <option value="Color">Color</option>
                    <option value="Grayscale">Grayscale</option>
                  </select>
                </div>
              </td>
              <td>
                {/* Interaction 2: Continent Checkboxes */}
                <div>
                  <h5>Select which continents to view:</h5>
                  <input type="checkbox" id="northamerica" name="northamerica" onChange={() => modifyContinentDisplay("North America")} />
                  <label htmlFor="northamerica">&nbsp;North America</label><br />
                  <input type="checkbox" id="southamerica" name="southamerica" onChange={() => modifyContinentDisplay("South America")} />
                  <label htmlFor="southamerica">&nbsp;South America</label><br />
                  <input type="checkbox" id="asia" name="asia" onChange={() => modifyContinentDisplay("Asia")}/>
                  <label htmlFor="asia">&nbsp;Asia</label><br />
                  <input type="checkbox" id="africa" name="africa" onChange={() => modifyContinentDisplay("Africa")} />
                  <label htmlFor="africa">&nbsp;Africa</label><br />
                  <input type="checkbox" id="australia" name="australia" onChange={() => modifyContinentDisplay("Australia")} />
                  <label htmlFor="australia">&nbsp;Australia</label><br />
                  <input type="checkbox" id="europe" name="europe" onChange={() => modifyContinentDisplay("Europe")} />
                  <label htmlFor="europe">&nbsp;Europe</label><br />
                </div>
              </td>
              <td>
                {/* Interaction 3: Urban Rate Slider */}
                <div>
                  <h5 className="pr-5">Filter urban rate:</h5>
                  <RangeSlider
                    value={urbanRate}
                    min={10}
                    max={100}
                    onChange={changeUrbanRate => setUrbanRate(changeUrbanRate.target.value)}
                  />
                  <label>[10, {urbanRate}]</label>
                </div>
              </td>
              <td>
                {/* Interaction 4: Internet Use Rate Slider */}
                <div>
                  <h5>Filter internet use rate:</h5>
                  <RangeSlider
                    value={internetRate}
                    min={0}
                    max={95}
                    onChange={changeInternetRate => setInternetRate(changeInternetRate.target.value)}
                  />
                  <label>[0, {internetRate}]</label>
                </div>       
              </td>
            </tr>
          </tbody>
        </div>    
        {/* Scatterplot */}
        {tooltip}
        <svg style={{display: "block", margin: "auto"}} width={dimensions.width} height={dimensions.height}>
          <text className="title" style={{textAnchor: "middle", fontSize: "20px"}} x={dimensions.width/2} y={dimensions.margin - 20}>
            Internet Use vs. Urban Rate
          </text>
          <text style={{textAnchor: "middle", fontSize: "16px"}} className="x-label" x={dimensions.width/2} y={dimensions.height - dimensions.margin + 35}>
            Urban Rate
          </text>
          <text style={{textAnchor: "middle", fontSize: "16px"}} className="y-label" transform={`translate(${dimensions.margin - 30}, ${dimensions.height/2})rotate(-90)`} >
            Internet Use Rate
          </text>
          {circles}
          <g transform={`translate(${dimensions.margin}, 0)`} className="axisLeft">
            <Axis orient={Orient.left} scale={yScale} />
          </g>
          <g transform={`translate(0, ${dimensions.height - dimensions.margin})`} className="axisBottom">
            <Axis orient={Orient.bottom} scale={xScale} />
          </g>
        </svg>
        <br></br>
        <br></br>
      </div>
    )
  }
}