import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SymptomChecker from './pages/SymptomChecker';
import Results from './pages/Results';
import PaymentSuccess from './Payment/PaymentSuccess';
import PaymentFailure from './Payment/PaymentFailure';
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/symptom-checker" element={<SymptomChecker />} />
            <Route path="/results" element={<Results />} />
            <Route path="/paymentsuccess" element={<PaymentSuccess />} />
            <Route path="/paymentfailure" element={<PaymentFailure />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;