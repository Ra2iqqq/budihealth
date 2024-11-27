import React, { useState } from 'react';


type HeartRateLevel = 'Low' | 'Normal' | 'Elevated' | 'High';

const Heartrate: React.FC = () => {
  const [heartRate, setHeartRate] = useState<number | ''>('');
  const [level, setLevel] = useState<HeartRateLevel | ''>('');

  const calculateHeartRateLevel = (rate: number): HeartRateLevel => {
    if (rate < 60) return 'Low';
    if (rate >= 60 && rate <= 100) return 'Normal';
    if (rate > 100 && rate <= 120) return 'Elevated';
    return 'High';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value === '' ? '' : Number(value);
    setHeartRate(numericValue);

    if (numericValue !== '' && !isNaN(numericValue)) {
      setLevel(calculateHeartRateLevel(numericValue));
    } else {
      setLevel('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Heart Rate Level Checker</h1>
        <div className="input-container">
          <label htmlFor="heart-rate">Enter Heart Rate (bpm):</label>
          <input
            id="heart-rate"
            type="number"
            value={heartRate}
            onChange={handleInputChange}
            placeholder="e.g., 75"
          />
        </div>
        {level && (
          <div className={`result ${level.toLowerCase()}`}>
            <p>Your heart rate level is: <strong>{level}</strong></p>
          </div>
        )}
      </header>
    </div>
  );
};

export default Heartrate;
