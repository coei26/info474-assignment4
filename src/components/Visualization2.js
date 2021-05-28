import React from 'React';
import { geoPath, geoAlbersUsa } from 'd3-geo';
import { useJson } from '../hooks/useJson';
import { feature } from "topojson-client";


export default function Visualization2() {
    // copy the link to see data in browser!
    // this time we're using geojson data
    // more on geojson: https://geojson.org/
    const [data, loading] = useJson(
        "https://unpkg.com/world-atlas@2.0.2/countries-50m.json"
    );
    // the dimensions of our svg
    // NOTE: the map is quite big, using a width of 1000
    // so we don't have to re-center or zoom the map
    const width = 1000;
    const height = 600;
    const margin = 50;

    // if loading, just return some text
    if (loading) {
        return <h2>Loading ...</h2>
    // only work with all data if data is loaded
    } else {
        // data.object has 2 fields: countries and land
        // each field contains shape information at that level
        // e.g. "land" is just one shape 
        const shapes = feature(data, data.objects.land);

        // other shapes
        const countries = feature(data, data.objects.countries);

        // geoPath returns a function we can use to translate geoJson shapes to
        // svg elements
        const path = geoPath();

        // use the <path> element which lets us draw shapes
        // to draw the outline of the US
        // use fill: none to make the map white and
        // stroke: black to outline the map
        const outlineofMap = <path style={{
            fill: "none",
            stroke: "black"
        }} d={path(shapes)}></path>;

        // get path elements for countries and land maps
        const countriesMap = <path style={{
            fill: "none",
            stroke: "black"
        }} d={path(countries)}></path>;

        return (
            <div> 
                <h1 style={{
                    textAlign: "center"
                }}>World Map</h1>
                
                {/* countries map */}
                <svg style={{
                    margin: "auto",
                    display: "block",
                    marginBottom: "5rem"
                }} width={width} height={height}>
                  {countriesMap}
                </svg>
            </div>
        )
    }

}