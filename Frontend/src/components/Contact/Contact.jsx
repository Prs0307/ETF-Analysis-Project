import  { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Papa from 'papaparse';
import 'tailwindcss/tailwind.css';

const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch and parse the CSV file
    fetch('/data.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            setData(result.data);
          }
        });
      });
  }, []);

  return (
    <div className="flex justify-center">
      <LineChart width={800} height={400} data={data}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <Line type="monotone" dataKey="macd" stroke="#ff0000" />
        <Line type="monotone" dataKey="signal" stroke="#00ff00" />
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
      </LineChart>
      <svg width="800" height="400">
        <g transform="translate(50, 20)">
          <g className="recharts-cartesian-grid">
            <line x1="0" y1="0" x2="0" y2="380" stroke="#ccc" strokeDasharray="5, 5"></line>
            <line x1="0" y1="380" x2="750" y2="380" stroke="#ccc" strokeDasharray="5, 5"></line>
            <line x1="750" y1="0" x2="750" y2="380" stroke="#ccc" strokeDasharray="5, 5"></line>
            <line x1="0" y1="0" x2="750" y2="0" stroke="#ccc" strokeDasharray="5, 5"></line>
          </g>
          <g className="recharts-x-axis">
            <text x="375" y="410" textAnchor="middle" fontSize="12" fill="#666">Date</text>
            <g transform="translate(0, 20)">
              <text x="0" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 17</text>
              <text x="50" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 18</text>
              <text x="100" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 19</text>
              <text x="150" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 20</text>
              <text x="200" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 21</text>
              <text x="250" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 22</text>
              <text x="300" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 23</text>
              <text x="350" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 24</text>
              <text x="400" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 25</text>
              <text x="450" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 26</text>
              <text x="500" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 27</text>
              <text x="550" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 28</text>
              <text x="600" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 29</text>
              <text x="650" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 30</text>
              <text x="700" y="0" textAnchor="end" fontSize="12" fill="#666">Dec 31</text>
            </g>
          </g>
          <g className="recharts-y-axis">
            <text x="-40" y="190" textAnchor="middle" fontSize="12" fill="#666">Value</text>
            <g transform="translate(-20, 0)">
              <text x="0" y="0" textAnchor="end" fontSize="12" fill="#666">48000</text>
              <text x="0" y="40" textAnchor="end" fontSize="12" fill="#666">46000</text>
              <text x="0" y="80" textAnchor="end" fontSize="12" fill="#666">44000</text>
              <text x="0" y="120" textAnchor="end" fontSize="12" fill="#666">42000</text>
              <text x="0" y="160" textAnchor="end" fontSize="12" fill="#666">40000</text>
              <text x="0" y="200" textAnchor="end" fontSize="12" fill="#666">38000</text>
              <text x="0" y="240" textAnchor="end" fontSize="12" fill="#666">36000</text>
              <text x="0" y="280" textAnchor="end" fontSize="12" fill="#666">34000</text>
              <text x="0" y="320" textAnchor="end" fontSize="12" fill="#666">32000</text>
              <text x="0" y="360" textAnchor="end" fontSize="12" fill="#666">30000</text>
            </g>
          </g>
          <g className="recharts-line">
            <path d="M0,380 L750,380" stroke="#8884d8" strokeWidth="2" fill="none"></path>
            <path d="M0,280 L50,272 L100,264 L150,256 L200,248 L250,240 L300,232 L350,224 L400,216 L450,208 L500,200 L550,192 L600,184 L650,176 L700,168 L750,160" stroke="#8884d8" strokeWidth="2" fill="none"></path>
          </g>
          <g className="recharts-line">
            <path d="M0,380 L750,380" stroke="#ff0000" strokeWidth="2" fill="none"></path>
            <path d="M0,240 L50,232 L100,224 L150,216 L200,208 L250,200 L300,192 L350,184 L400,176 L450,168 L500,160 L550,152 L600,144 L650,136 L700,128 L750,120" stroke="#ff0000" strokeWidth="2" fill="none"></path>
          </g>
          <g className="recharts-line">
            <path d="M0,380 L750,380" stroke="#00ff00" strokeWidth="2" fill="none"></path>
            <path d="M0,200 L50,192 L100,184 L150,176 L200,168 L250,160 L300,152 L350,144 L400,136 L450,128 L500,120 L550,112 L600,104 L650,96 L700,88 L750,80" stroke="#00ff00" strokeWidth="2" fill="none"></path>
          </g>
          <g className="recharts-tooltip">
            <rect x="375" y="190" width="100" height="30" fill="#fff" rx="5"></rect>
            <text x="385" y="205" fontSize="12" fill="#666">Dec 17</text>
            <text x="385" y="220" fontSize="12" fill="#666">Value: 43712.16</text>
            <text x="385" y="235" fontSize="12" fill="#666">MACD: 48.70</text>
            <text x="385" y="250" fontSize="12" fill="#666">Signal: 88.11</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Chart;
