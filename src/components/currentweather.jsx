import { useEffect, useState } from "react";
import axios from "axios";

export default function CurrentWeather({ coords }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m`
      )
      .then((res) => setData(res.data.current));
  }, [coords]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      <p><strong>Temperature:</strong> {data.temperature_2m}°C</p>
      <p><strong>Wind Speed:</strong> {data.wind_speed_10m} km/h</p>
      <p><strong>Humidity:</strong> {data.relative_humidity_2m}%</p>
    </div>
  );
}
