import React, { useState } from "react";

const FraminghamPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [hdlCholesterol, setHdlCholesterol] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [onHypertensionTreatment, setOnHypertensionTreatment] = useState(false);
  const [smokingStatus, setSmokingStatus] = useState(false);
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [riskScore, setRiskScore] = useState(null);

  const calculateRisk = () => {
    let score = 0;

    // Age-based points
    if (age >= 20 && age <= 34) score += sex === "male" ? -1 : -9;
    else if (age >= 35 && age <= 39) score += sex === "male" ? 0 : -4;
    else if (age >= 40 && age <= 44) score += sex === "male" ? 1 : 0;
    else if (age >= 45 && age <= 49) score += sex === "male" ? 2 : 3;
    else if (age >= 50 && age <= 54) score += sex === "male" ? 3 : 6;
    else if (age >= 55 && age <= 59) score += sex === "male" ? 4 : 7;
    else if (age >= 60 && age <= 64) score += sex === "male" ? 5 : 8;
    else if (age >= 65 && age <= 69) score += sex === "male" ? 6 : 9;
    else if (age >= 70 && age <= 74) score += sex === "male" ? 7 : 10;
    else if (age >= 75 && age <= 79) score += sex === "male" ? 8 : 11;

    // Total Cholesterol Points
    if (totalCholesterol >= 160 && totalCholesterol < 200)
      score += sex === "male" ? 4 : 4;
    else if (totalCholesterol >= 200 && totalCholesterol < 240)
      score += sex === "male" ? 7 : 8;
    else if (totalCholesterol >= 240 && totalCholesterol < 280)
      score += sex === "male" ? 9 : 11;
    else if (totalCholesterol >= 280) score += sex === "male" ? 11 : 13;

    // HDL Cholesterol Points
    if (hdlCholesterol >= 60) score -= 1;
    else if (hdlCholesterol >= 50 && hdlCholesterol < 60) score += 0;
    else if (hdlCholesterol >= 40 && hdlCholesterol < 50) score += 1;
    else if (hdlCholesterol < 40) score += 2;

    // Systolic Blood Pressure Points
    if (systolicBP >= 120 && systolicBP < 130)
      score += onHypertensionTreatment ? (sex === "male" ? 1 : 3) : 0;
    else if (systolicBP >= 130 && systolicBP < 140)
      score += onHypertensionTreatment ? (sex === "male" ? 2 : 4) : (sex === "male" ? 1 : 2);
    else if (systolicBP >= 140 && systolicBP < 160)
      score += onHypertensionTreatment ? (sex === "male" ? 3 : 5) : (sex === "male" ? 2 : 3);
    else if (systolicBP >= 160)
      score += onHypertensionTreatment ? (sex === "male" ? 4 : 6) : (sex === "male" ? 3 : 4);

    // Smoking Status Points
    if (smokingStatus) score += sex === "male" ? 4 : 3;

    // Diabetes Status Points
    if (hasDiabetes) score += sex === "male" ? 3 : 4;

    setRiskScore(score);
  };

  return (
    <div className="p-10 text-xl">
      <h2 className="text-2xl font-bold mb-4">Framingham Risk Score Calculator</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateRisk();
        }}
        className="space-y-4"
      >
        <div>
          <label className="block">Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Sex:</label>
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block">Total Cholesterol (mg/dL):</label>
          <input
            type="number"
            value={totalCholesterol}
            onChange={(e) => setTotalCholesterol(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">HDL Cholesterol (mg/dL):</label>
          <input
            type="number"
            value={hdlCholesterol}
            onChange={(e) => setHdlCholesterol(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Systolic Blood Pressure (mmHg):</label>
          <input
            type="number"
            value={systolicBP}
            onChange={(e) => setSystolicBP(e.target.value)}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block">On Hypertension Treatment:</label>
          <input
            type="checkbox"
            checked={onHypertensionTreatment}
            onChange={() => setOnHypertensionTreatment(!onHypertensionTreatment)}
          />
        </div>
        <div>
          <label className="block">Current Smoker:</label>
          <input
            type="checkbox"
            checked={smokingStatus}
            onChange={() => setSmokingStatus(!smokingStatus)}
          />
        </div>
        <div>
          <label className="block">Diabetes:</label>
          <input
            type="checkbox"
            checked={hasDiabetes}
            onChange={() => setHasDiabetes(!hasDiabetes)}
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Calculate Risk
        </button>
      </form>
      {riskScore !== null && (
        <div className="mt-4 p-4 bg-gray-200 rounded">
          <h3 className="text-lg font-semibold">Risk Score: {riskScore}</h3>
        </div>
      )}
    </div>
  );
};

export default FraminghamPage;
