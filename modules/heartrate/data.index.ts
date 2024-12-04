body {
    font-family: Arial, sans-serif;
    background: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .container {
    text-align: center;
    background: #fff;
    padding: 20px;in
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 300px;
  }
  
  .inputs label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .inputs input {
    width: 80%;
    padding: 8px;
    margin: 5px 0;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .pulse-measurement p {
    margin: 10px 0;
  }
  
  .heart {
    font-size: 48px;
    margin: 20px 0;
    cursor: pointer;
    color: #e63946;
  }
  
  .bpm {
    font-size: 32px;
    color: #007bff;
    margin: 5px 0;
  }
  
  .zone {
    font-size: 18px;
    font-weight: bold;
    padding: 5px;
    border-radius: 5px;
    margin: 10px auto;
    display: inline-block;
  }
  
  .zone.resting {
    background: #a2d5f2;
    color: #005582;
  }
  
  .zone.fat-burning-zone {
    background: #ffe599;
    color: #a65e00;
  }
  
  .zone.cardio-zone {
    background: #ffb347;
    color: #703200;
  }
  
  .zone.peak-zone {
    background: #ff6666;
    color: #820000;
  }
  