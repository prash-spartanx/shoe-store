import React from 'react';
import { Outlet } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';  // Fixed import

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </Elements>
  );
}

export default App;


