import { useState } from "react";
import axios from "axios";
import CurrentWeather from "./components/currentweather";
import HistoricWeather from "./components/historicweather";
import MarineWeather from "./components/marineweather";

export default function App() {
  const [city, setCity] = useState("London");
  const [coords, setCoords] = useState(null);

  const fetchCoordinates = async () => {
    const res = await axios.get(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );

    if (res.data.results) {
      setCoords({
        lat: res.data.results[0].latitude,
        lon: res.data.results[0].longitude,
      });
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">

        {/* SEARCH BAR */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex gap-3">
          <input
            className="flex-1 p-3 border rounded-lg outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchCoordinates}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* DASHBOARD BLOCKS */}
        {coords && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                Live Weather
              </h2>
              <CurrentWeather coords={coords} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                Marine Weather
              </h2>
              <MarineWeather coords={coords} />
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-bold mb-4 text-blue-600">
                Historic Weather
              </h2>
              <HistoricWeather coords={coords} />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
