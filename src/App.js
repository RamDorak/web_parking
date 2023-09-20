import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrafficLight } from "react-icons/fa";

function App() {
  const [parkingData, setParkingData] = useState({ availableSlots: 0 });
  const fetchParkingData = async () => {
    try {
      const response = await axios.get(
        `https://api.thingspeak.com/channels/2274978/feeds.json?results=1`
      );
      const availableSlots = response.data.feeds[0].field1;
      console.log(availableSlots);
      setParkingData({ availableSlots });
    } catch (error) {
      console.error('Error fetching parking data:', error);
    }
  };

  useEffect(() => {
    fetchParkingData();
    const intervalId = setInterval(fetchParkingData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-700 text-white p-4 text-center">
        <h1 className="text-3xl">Parking Availability Website</h1>
      </header>

      <div className="flex flex-col items-center justify-center p-10">
        <div className="bg-blue-300 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl text-blue-700 text-center">Parking Slot Data</h2>
          <div className="mt-4">
            <FaTrafficLight className="text-6xl mx-auto text-yellow-500" />
          </div>
          <p className="text-2xl text-center mt-4">Available Slots:</p>
          <p className="text-4xl text-center text-red-900 bg-yellow-100 p-4 rounded-lg">
            {parkingData.availableSlots}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
