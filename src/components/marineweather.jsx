import { useEffect, useState } from "react";
import axios from "axios";

export default function MarineWeather({ coords }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${coords.lat}&longitude=${coords.lon}&current=wave_height,swell_wave_direction`
      )
      .then((res) => setData(res.data.current));
  }, [coords]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      <p><strong>Wave Height:</strong> {data.wave_height} m</p>
      <p><strong>Swell Direction:</strong> {data.swell_wave_direction}°</p>
    </div>
  );
}
