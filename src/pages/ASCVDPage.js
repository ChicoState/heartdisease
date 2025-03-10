import React, { useState } from "react";

const ASCVDPage = () => {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [race, setRace] = useState("");
  const [totalCholesterol, setTotalCholesterol] = useState("");
  const [hdlCholesterol, setHdlCholesterol] = useState("");
  const [ldlCholesterol, setLdlCholesterol] = useState("");
  const [systolicBP, setSystolicBP] = useState("");
  const [diastolicBP, setDiastolicBP] = useState("");
  const [hasDiabetes, setHasDiabetes] = useState(false);
  const [smokingStatus, setSmokingStatus] = useState("never");
  const [yearsSinceQuit, setYearsSinceQuit] = useState("");
  const [onHypertensionTreatment, setOnHypertensionTreatment] = useState(false);
  const [onStatin, setOnStatin] = useState(false);
  const [onAspirin, setOnAspirin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Calculating ASCVD Risk...", {
      age,
      sex,
      race,
      totalCholesterol,
      hdlCholesterol,
      ldlCholesterol,
      systolicBP,
      diastolicBP,
      hasDiabetes,
      smokingStatus,
      yearsSinceQuit,
      onHypertensionTreatment,
      onStatin,
      onAspirin,
    });
  };

  return (
    <div className="p-10 text-xl">
      <h2 className="text-2xl font-bold mb-4">ASCVD Risk Estimator</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">Sex:</label>
          <select value={sex} onChange={(e) => setSex(e.target.value)} className="border rounded p-2 w-full">
            <option value="">Select...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label className="block">Race:</label>
          <select value={race} onChange={(e) => setRace(e.target.value)} className="border rounded p-2 w-full">
            <option value="">Select...</option>
            <option value="white">White</option>
            <option value="africanAmerican">African American</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block">Total Cholesterol (mg/dL):</label>
          <input type="number" value={totalCholesterol} onChange={(e) => setTotalCholesterol(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">HDL Cholesterol (mg/dL):</label>
          <input type="number" value={hdlCholesterol} onChange={(e) => setHdlCholesterol(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">LDL Cholesterol (mg/dL):</label>
          <input type="number" value={ldlCholesterol} onChange={(e) => setLdlCholesterol(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">Systolic Blood Pressure (mmHg):</label>
          <input type="number" value={systolicBP} onChange={(e) => setSystolicBP(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">Diastolic Blood Pressure (mmHg):</label>
          <input type="number" value={diastolicBP} onChange={(e) => setDiastolicBP(e.target.value)} className="border rounded p-2 w-full" />
        </div>
        <div>
          <label className="block">History of Diabetes:</label>
          <input type="checkbox" checked={hasDiabetes} onChange={() => setHasDiabetes(!hasDiabetes)} />
        </div>
        <div>
          <label className="block">Smoking Status:</label>
          <select value={smokingStatus} onChange={(e) => setSmokingStatus(e.target.value)} className="border rounded p-2 w-full">
            <option value="never">Never</option>
            <option value="former">Former Smoker</option>
            <option value="current">Current Smoker</option>
          </select>
          {smokingStatus === "former" && (
            <div>
              <label className="block">Years Since Quitting:</label>
              <input type="number" value={yearsSinceQuit} onChange={(e) => setYearsSinceQuit(e.target.value)} className="border rounded p-2 w-full" />
            </div>
          )}
        </div>
        <div>
          <label className="block">On Hypertension Treatment:</label>
          <input type="checkbox" checked={onHypertensionTreatment} onChange={() => setOnHypertensionTreatment(!onHypertensionTreatment)} />
        </div>
        <div>
          <label className="block">On Statin:</label>
          <input type="checkbox" checked={onStatin} onChange={() => setOnStatin(!onStatin)} />
        </div>
        <div>
          <label className="block">On Aspirin Therapy:</label>
          <input type="checkbox" checked={onAspirin} onChange={() => setOnAspirin(!onAspirin)} />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Calculate Risk
        </button>
      </form>
    </div>
  );
};

export default ASCVDPage;