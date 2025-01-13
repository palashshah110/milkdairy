import React, { useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDi2XrxeNcuddCygpE-XevR_-4NrKMWsd4",
  authDomain: "ecom-99277.firebaseapp.com",
  projectId: "ecom-99277",
  storageBucket: "ecom-99277.firebasestorage.app",
  messagingSenderId: "325487577797",
  appId: "1:325487577797:web:aad5b6dcb74c118023beac",
  measurementId: "G-VTL3MYY546"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          console.log("reCAPTCHA solved:", response);
        },
      },
      auth
    );
  };

  const sendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      alert("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      alert("Please send OTP first!");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      alert("Phone number verified successfully!");
      console.log("User:", result.user);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button onClick={sendOtp}>Send OTP</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default Login;
