// components/LineChart.tsx
import { FC, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  timestamp: Date;
  setpoint: number;
  temperature: number;
  humidity: number;
  plantTemp: number;
  fanSpeed: number;
  plantVPD: number;
  targetHumidity: number;
}

interface CustomLineChartProps {
  key: any;
  ip: string;
}

const CustomLineChart: FC<CustomLineChartProps> = ({ key, ip }) => {
  const [data, setData] = useState<DataPoint[]>([]);

  const loadData = async () => {
    try {
      const response = await fetch("http://" + ip + "/log");
      const text = await response.text();
      const lines = text.split("\n");
      const parsedData: DataPoint[] = lines.map((line) => {
        const values = line.split(",");
        const timestamp = parseInt(values[0], 10);
        return {
          timestamp: isNaN(timestamp)
            ? new Date(0)
            : new Date(timestamp * 1000),
          temperature: parseFloat(values[1]),
          humidity: parseFloat(values[2]),
          plantTemp: parseFloat(values[3]),
          fanSpeed: parseFloat(values[4]),
          setpoint: parseFloat(values[5]),
          plantVPD: parseFloat(values[6]),
          targetHumidity: parseFloat(values[7]),
        };
      });
      setData(parsedData);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [ip]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(tick) => new Date(tick).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => new Date(label).toLocaleString()}
          />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
          <Line type="monotone" dataKey="plantTemp" stroke="#ffc658" />
          <Line type="monotone" dataKey="fanSpeed" stroke="#ff7300" />
          <Line type="monotone" dataKey="setpoint" stroke="#d0ed57" />
          <Line type="monotone" dataKey="plantVPD" stroke="#a4de6c" />
          <Line type="monotone" dataKey="targetHumidity" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
