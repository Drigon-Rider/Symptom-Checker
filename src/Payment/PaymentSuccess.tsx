import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Symptom } from "../pages/SymptomChecker"; // Import the Symptom type

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);

  useEffect(() => {
    try {
      // Retrieve symptoms from local storage
      const storedSymptoms = localStorage.getItem("symptoms");
      if (storedSymptoms) {
        const parsedSymptoms = JSON.parse(storedSymptoms);

        // Validate the parsed data against the Symptom type
        if (Array.isArray(parsedSymptoms) && parsedSymptoms.every(isValidSymptom)) {
          setSymptoms(parsedSymptoms);
        } else {
          throw new Error("Invalid symptoms format.");
        }
      } else {
        console.warn("No symptoms found in local storage.");
        alert("No symptoms found.");
      }
    } catch (error) {
      console.error("Error retrieving symptoms:", error);
      alert("Failed to load symptoms. Please try again.");
    }
  }, []);

  // Helper function to validate if an object matches the Symptom type
  const isValidSymptom = (obj: any): obj is Symptom => {
    return (
      obj &&
      typeof obj.id === "string" &&
      typeof obj.name === "string" &&
      typeof obj.bodyPart === "string" &&
      typeof obj.severity === "number" &&
      typeof obj.duration === "string" &&
      typeof obj.description === "string"
    );
  };

  const handleViewResults = () => {
    navigate("/results", { state: { symptoms } });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">Your payment has been processed successfully.</p>

        {symptoms.length > 0 ? (
            <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-4">Symptoms:</h2>
            <ul className="list-disc list-inside text-left">
              {symptoms.map((symptom, index) => (
              <li key={index}>
                <strong>{symptom.name}</strong> - {symptom.bodyPart} ({symptom.severity}/10)
              </li>
              ))}
            </ul>
            <button
              onClick={handleViewResults}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              View Results
            </button>
            </div>
        ) : (
          <p className="text-gray-600">No symptoms found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;