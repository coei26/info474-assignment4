import React, { useState } from "react";
import { Visualization1 } from './components/Visualization1'
import Visualization2 from "./components/Visualization2"
import { Writeup } from './components/Writeup'
import * as mdb from 'mdb-ui-kit'; 
// import { useFetch } from "./hooks/useFetch";
// import { extent, filter } from 'd3-array';
// import { scaleLinear, scaleBand } from 'd3-scale';

const App = () => {
  return (
    <div className='container'>
        <div className="pb-4 pt-2">
          <h1>Assignment 4: Interactive Data Dashboard</h1>
          <h4>
            Catherine Oei and Rishi Kavikondala<br></br>
            1 June 2021
          </h4>
        </div>
        {/* <h2 className="pb-4"></h2> */}
        <p>
          Using the "Global Internet Usage" <a href="https://www.kaggle.com/sansuthi/gapminder-internet">dataset</a> from Kaggle,
          we created the following data exploration activity to investigate how urban rate affects internet use rate across the world.
        </p>
        <ul class="nav nav-tabs mb-3" id="tabpane" role="tablist">
            <li class="nav-item" role="presentation">
                <a
                class="nav-link active"
                id="tabpane-tab-1"
                data-mdb-toggle="tab"
                href="#tabpane-tabs-1"
                role="tab"
                aria-controls="tabpane-tabs-1"
                aria-selected="true"
                >1</a
                >
            </li>
            <li class="nav-item" role="presentation">
                <a
                class="nav-link"
                id="tabpane-tab-2"
                data-mdb-toggle="tab"
                href="#tabpane-tabs-2"
                role="tab"
                aria-controls="tabpane-tabs-2"
                aria-selected="false"
                >2</a
                >
            </li>
            <li class="nav-item" role="presentation">
                <a
                class="nav-link"
                id="tabpane-tab-3"
                data-mdb-toggle="tab"
                href="#tabpane-tabs-3"
                role="tab"
                aria-controls="tabpane-tabs-3"
                aria-selected="false"
                >3</a
                >
            </li>
            <li class="nav-item" role="presentation">
                <a
                class="nav-link"
                id="tabpane-tab-4"
                data-mdb-toggle="tab"
                href="#tabpane-tabs-4"
                role="tab"
                aria-controls="tabpane-tabs-4"
                aria-selected="false"
                >4</a
                >
            </li>
        </ul>

        <div class="tab-content" id="tabpane-content">
            <div
                class="tab-pane fade show active"
                id="tabpane-tabs-1"
                role="tabpanel"
                aria-labelledby="tabpane-tab-1">
                <Visualization1 />
            </div>
            <div class="tab-pane fade" id="tabpane-tabs-2" role="tabpanel" aria-labelledby="tabpane-tab-2">
                <Visualization2 />
            </div>
            <div class="tab-pane fade" id="tabpane-tabs-3" role="tabpanel" aria-labelledby="tabpane-tab-3">
                Tab 3 content
            </div>
            <div class="tab-pane fade" id="tabpane-tabs-4" role="tabpanel" aria-labelledby="tabpane-tab-4">
                Tab 4 content
            </div>
        </div>
    </div>
  )
}

export default App;