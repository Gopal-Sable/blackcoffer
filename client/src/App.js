
// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

import { Bar } from 'react-chartjs-2';

const App = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    endYear: '',
    topics: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/data')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch(error => console.error(error));
  }, [filters]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/data/d3-chart-data')
      .then(response => {
        drawChart(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const drawChart = (chartData) => {
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#d3-chart-container")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(chartData.map(d => d._id))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(chartData, d => d.intensitySum)])
      .range([height, 0]);

    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");

    svg.append("g")
      .call(d3.axisLeft(y));

    svg.selectAll("rect")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("x", d => x(d._id))
      .attr("y", d => y(d.intensitySum))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.intensitySum))
      .attr("fill", "#69b3a2");
  };

  const applyFilters = () => {
    // Logic to filter data based on selected filters
    const filtered = data.filter(item => {
      // Implement your filtering logic here
      return (
        (!filters.endYear || item.end_year === filters.endYear) &&
        (!filters.topics || item.topic.includes(filters.topics)) &&
        (!filters.sector || item.sector === filters.sector) &&
        (!filters.region || item.region === filters.region) &&
        (!filters.pestle || item.pestle === filters.pestle) &&
        (!filters.source || item.source === filters.source) &&
        (!filters.swot || item.swot === filters.swot) &&
        (!filters.country || item.country === filters.country) &&
        (!filters.city || item.city === filters.city)
      );
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  // Rendering logic for filter controls
  // ...

  const renderFilters = () => {
    return (
      <div className="filter-section" >
        <div className="filter-group">


          <label>End Year:</label>
          <select className='form-control' value={filters.endYear} onChange={(e) => handleFilterChange('endYear', e.target.value)}>
            <option value="">Select</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="filter-group">
          <label>Topics:</label>
          <select className='form-control' value={filters.topics} onChange={(e) => handleFilterChange('topics', e.target.value)}>
            <option value="">Select</option>
            <option value="gas">Gas</option>
            <option value="oil">Oil</option>
          </select>

          <label>Sector:</label>
          <select className='form-control' value={filters.sector} onChange={(e) => handleFilterChange('sector', e.target.value)}>
            <option value="">Select</option>
            <option value="Energy">Energy</option>
            <option value="Technology">Technology</option>
          </select>

        </div>
        <div className="filter-group">
          <label>Region:</label>
          <select className='form-control' value={filters.region} onChange={(e) => handleFilterChange('region', e.target.value)}>
            <option value="">Select</option>
            <option value="Northern America">Northern America</option>
            <option value="Europe">Europe</option>
          </select>

        </div>
        <div className="filter-group">
          <label>PESTLE:</label>
          <select className='form-control' value={filters.pestle} onChange={(e) => handleFilterChange('pestle', e.target.value)}>
            <option value="">Select</option>
            <option value="Industries">Industries</option>
            <option value="Technology">Technology</option>
          </select>

        </div>
        <div className="filter-group">
          <label>Source:</label>
          <select className='form-control' value={filters.source} onChange={(e) => handleFilterChange('source', e.target.value)}>
            <option value="">Select</option>
            <option value="EIA">EIA</option>
            <option value="Tech Insights">Tech Insights</option>
          </select>

        </div>
        <div className="filter-group">
          <label>SWOT:</label>
          <select className='form-control' value={filters.swot} onChange={(e) => handleFilterChange('swot', e.target.value)}>
            <option value="">Select</option>
            <option value="Strengths">Strengths</option>
            <option value="Weaknesses">Weaknesses</option>
          </select>

        </div>
        <div className="filter-group">
          <label>Country:</label>
          <select className='form-control' value={filters.country} onChange={(e) => handleFilterChange('country', e.target.value)}>
            <option value="">Select</option>
            <option value="United States of America">United States of America</option>
            <option value="Canada">Canada</option>
          </select>

        </div>
        <div className="filter-group">
          <label>City:</label>
          <select className='form-control' value={filters.city} onChange={(e) => handleFilterChange('city', e.target.value)}>
            <option value="">Select</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
          </select>
        </div>
      </div>
    );
  };



  // Rendering logic for the table
  const renderTable = () => {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Intensity</th>
            <th>Sector</th>
            <th>Topic</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.intensity}</td>
              <td>{item.sector}</td>
              <td>{item.topic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Data Visualization Dashboard</h1>

      {/* Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          {renderFilters()}
          <button className="btn btn-primary apply-button" onClick={applyFilters}>Apply Filters</button>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">D3.js Bar Chart</h2>
          <div id="d3-chart-container"></div>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Filtered Data</h2>
          {renderTable()}
        </div>
      </div>
    </div>
  );
};

export default App;

