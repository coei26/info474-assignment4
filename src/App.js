import React, { useState } from "react";
import { Scatterplot } from "./components/Scatterplot";
import Map from "./components/Map";
//import Test from "./components/Test";
import { Bars } from "./components/Bars";
import { Latitude } from "./components/Latitude";
import * as mdb from "mdb-ui-kit";

const App = () => {
  return (
    <div className="container">
      <div className="pb-4 pt-2">
        <h1>Assignment 4: Interactive Data Dashboard</h1>
        <h4>
          Catherine Oei and Rishi Kavikondala<br></br>9 June 2021
        </h4>
      </div>
      <p>
        Using the "Global Internet Usage"{" "}
        <a href="https://www.kaggle.com/sansuthi/gapminder-internet">dataset</a>{" "}
        from Kaggle, we created the following data exploration activity to
        investigate internet use rate around the world.
      </p>
      <ul className="nav nav-tabs mb-3" id="tabpane" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className="nav-link active"
            id="tabpane-tab-1"
            data-mdb-toggle="tab"
            href="#tabpane-tabs-1"
            role="tab"
            aria-controls="tabpane-tabs-1"
            aria-selected="true"
          >
            Question 1
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="tabpane-tab-2"
            data-mdb-toggle="tab"
            href="#tabpane-tabs-2"
            role="tab"
            aria-controls="tabpane-tabs-2"
            aria-selected="false"
          >
            Question 2
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="tabpane-tab-3"
            data-mdb-toggle="tab"
            href="#tabpane-tabs-3"
            role="tab"
            aria-controls="tabpane-tabs-3"
            aria-selected="false"
          >
            Question 3
          </a>
        </li>
        <li className="nav-item" role="presentation">
          <a
            className="nav-link"
            id="tabpane-tab-4"
            data-mdb-toggle="tab"
            href="#tabpane-tabs-4"
            role="tab"
            aria-controls="tabpane-tabs-4"
            aria-selected="false"
          >
            Question 4
          </a>
        </li>
      </ul>

      <div className="tab-content" id="tabpane-content">
        <div
          className="tab-pane fade show active"
          id="tabpane-tabs-1"
          role="tabpanel"
          aria-labelledby="tabpane-tab-1"
        >
          <Scatterplot />
        </div>
        <div
          className="tab-pane fade"
          id="tabpane-tabs-2"
          role="tabpanel"
          aria-labelledby="tabpane-tab-2"
        >
          <Bars />
        </div>
        <div
          className="tab-pane fade"
          id="tabpane-tabs-3"
          role="tabpanel"
          aria-labelledby="tabpane-tab-3"
        >
          <Map />
        </div>
        <div
          className="tab-pane fade"
          id="tabpane-tabs-4"
          role="tabpanel"
          aria-labelledby="tabpane-tab-4"
        >
          <Latitude />
        </div>
      </div>
    </div>
  );
};

export default App;
