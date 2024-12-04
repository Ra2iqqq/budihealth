import React, { useState, useEffect } from "react";

const App: React.FC = () => {
  const [age, setAge] = useState<number>(20);
  const [clicks, setClicks] = useState<number[]>([]);
  const [bpm, setBpm] = useState<number | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Calculate HRmax
  const calculateHRmax = (age: number): number => 220 - age;

  // Handle age input
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(e.target.value, 10) || 0;
    setAge(newAge);
  };

  // Handle pulse click
  const handlePulseClick = () => {
    const now = Date.now();

    setClicks((prevClicks) => {
      const updatedClicks = [...prevClicks, now];
      const validClicks = updatedClicks.filter(
        (timestamp) => now - timestamp <= 15000 // 15 seconds
      );

      // Calculate BPM if there are at least two clicks
      if (validClicks.length > 1) {
        const intervals = validClicks
          .slice(1)
          .map((time, index) => time - validClicks[index]);
        const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;

        setBpm(Math.round((60 * 1000) / averageInterval)); // Calculate BPM
      }

      return validClicks;
    });

    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        setClicks([]);
        setBpm(null);
      }, 15000)
    );
  };

  // Handle spacebar click
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        handlePulseClick();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  // Determine training zone
  const calculateTrainingZone = (bpm: number | null): string => {
    if (!bpm) return "Resting";
    const hrMax = calculateHRmax(age);

    if (bpm < 0.6 * hrMax) return "Resting";
    if (bpm < 0.7 * hrMax) return "Fat Burning Zone";
    if (bpm < 0.8 * hrMax) return "Cardio Zone";
    return "Peak Zone";
  };

  const trainingZone = calculateTrainingZone(bpm);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Heart Rate Calculator</h1>

        {/* Age Input */}
        <div className="mb-6">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
          />
        </div>

        {/* Pulse Clicking Section */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-2">
            Click the heart or press the spacebar each time you feel a pulse:
          </p>
          <button
            onClick={handlePulseClick}
            className="text-5xl text-red-500 hover:text-red-600 transition duration-300"
          >
            ❤️
          </button>
        </div>

        {/* BPM Result */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">Your average BPM:</p>
          <div className="text-4xl font-bold text-blue-500">
            {bpm !== null ? bpm : "--"}
          </div>
        </div>

        {/* Training Zone */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">Training Zone:</p>
          <div
            className={`px-4 py-2 rounded-lg font-bold ${
              trainingZone === "Resting"
                ? "bg-blue-100 text-blue-600"
                : trainingZone === "Fat Burning Zone"
                ? "bg-yellow-100 text-yellow-600"
                : trainingZone === "Cardio Zone"
                ? "bg-orange-100 text-orange-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {trainingZone}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;



