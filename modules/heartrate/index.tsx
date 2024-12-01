import React, { useState } from "react";


const App: React.FC = () => {
  const [age, setAge] = useState<number>(20);
  const [bpm, setBpm] = useState<number>(96);
  const [pulse, setPulse] = useState<number>(0);
  const [manualBpm, setManualBpm] = useState<number | null>(null);

  // Calculate HRmax
  const calculateHRmax = (age: number): number => 220 - age;

  // Calculate BPM from HRmax
  const calculateBPM = (age: number): number => {
    const hrMax = calculateHRmax(age);
    return Math.round(hrMax * 0.85);
  };

  // Handle Age Change
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAge = parseInt(e.target.value, 10) || 0;
    setAge(newAge);
    setBpm(calculateBPM(newAge));
  };

  // Calculate Manual BPM
  const handlePulseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPulse = parseInt(e.target.value, 10) || 0;
    setPulse(newPulse);
    setManualBpm(newPulse * 4); // BPM = pulse in 15 seconds * 4
  };

  const progressPercentage = Math.min((bpm / calculateHRmax(age)) * 100, 100);

  return (
    <div className="container">
      <h1>Heart Rate Calculator</h1>

      {/* Automatic HRmax and BPM Calculation */}
      <div className="inputs">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={handleAgeChange}
          placeholder="Enter your age"
        />
      </div>
      <div className="result">
        <p>Your maximum heart rate is:</p>
        <div className="hrmax">{calculateHRmax(age)}</div>
        <p>Your average BPM is:</p>
        <div className="bpm">{bpm}</div>
      </div>

      {/* Manual BPM Calculation */}
      <div className="manual-calculation">
        <h2>Manual Heart Rate Calculation</h2>
        <label htmlFor="pulse">Enter your pulse (15 seconds):</label>
        <input
          type="number"
          id="pulse"
          value={pulse}
          onChange={handlePulseChange}
          placeholder="Enter pulse count"
        />
        {manualBpm !== null && (
          <div className="manual-result">
            <p>Your heart rate is:</p>
            <div className="manual-bpm">{manualBpm} BPM</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="bar"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default App;


