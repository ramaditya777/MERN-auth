import React from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"; // Corrected import path for Firebase
import { app } from "../firebase"; // Assuming you have a Firebase instance initialized in firebase.js
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
const OAuth = () => {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app); // Initialize auth with your Firebase app instance
      const result = await signInWithPopup(auth, provider);
      //   console.log("Google Sign-In Successful:", result.user);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      // Optionally, you can redirect or perform other actions upon successful login
      const data = await res.json();
      dispatch(signInSuccess(data));
      console.log(data);
    } catch (error) {
      console.error("Could not login with Google:", error.message);
      // Handle error gracefully, show user-friendly message, etc.
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
