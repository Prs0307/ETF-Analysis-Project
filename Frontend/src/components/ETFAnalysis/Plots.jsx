import { ScatterChart,CartesianGrid, Scatter, XAxis, YAxis, Tooltip } from 'recharts';


// Sample data for the scatter plot
const data = [
  { x: 10, y: 50 },
  { x: 20, y: 30 },
  { x: 30, y: 45 },
  { x: 40, y: 60 },
  { x: 50, y: 25 },
];

const ScatterPlot = () => {
  return (
    <ScatterChart width={600} height={400}>
      <CartesianGrid stroke="#f5f5f5" />
      <XAxis type="number" dataKey="x" name="X-axis" />
      <YAxis type="number" dataKey="y" name="Y-axis" />
      <Tooltip />
      <Scatter data={data} fill="#8884d8" shape="circle" />
    </ScatterChart>
  );
};

export default ScatterPlot;
