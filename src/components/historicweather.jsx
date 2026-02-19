import { useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function HistoricWeather({ coords }) {
  const [date, setDate] = useState("");
  const [chartData, setChartData] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${coords.lat}&longitude=${coords.lon}&start_date=${date}&end_date=${date}&hourly=temperature_2m`
    );

    const formatted = res.data.hourly.time.map((t, i) => ({
      time: t.slice(11, 16),
      temp: res.data.hourly.temperature_2m[i],
    }));

    setChartData(formatted);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          className="border p-2 rounded-lg"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={fetchHistory}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Load
        </button>
      </div>

      {chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#2563eb" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
