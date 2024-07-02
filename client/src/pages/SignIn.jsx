import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const res = await fetch(`http://localhost:3000/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(signInFailure(data.message || "Failed to sign in"));
      } else {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.error("Sign in error:", error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-4 rounded-lg"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-4 rounded-lg"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className={`bg-slate-700 text-white p-3 rounded-lg uppercase ${
            loading ? "opacity-80 cursor-not-allowed" : "hover:opacity-95"
          }`}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {error && (
        <p className="text-red-700 mt-3">
          {typeof error === "string" ? error : "Something went wrong!"}
        </p>
      )}
      <div className="flex gap-2 mt-5">
        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   signInStart,
//   signInSuccess,
//   signInFailure,
// } from "../redux/user/userSlice";
// import { useDispatch, useSelector } from "react-redux";

// const SignIn = () => {
//   const [formData, setFromData] = useState({
//     email: "",
//     password: "",
//   });
//   // const [error, setError] = useState(false);
//   // const [loading, setLoading] = useState(false);
//   const { loading, error } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFromData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     try {
//       e.preventDefault();
//       // setLoading(true);
//       // setError(false);
//       dispatch(signInStart());
//       const res = await fetch(`http://localhost:3000/api/auth/signin`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();

//       if (!res.ok || data.success === false) {
//         //throw new Error(data.message || "Failed to sign in");
//         dispatch(signInFailure(data.message));
//       }

//       // setLoading(false);
//       dispatch(signInSuccess(data));
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       // setLoading(false);
//       // setError(true);
//       dispatch(signInFailure(error));
//     }
//   };

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Signin</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="email"
//           placeholder="Email"
//           id="email"
//           className="bg-slate-100 p-4 rounded-lg"
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           id="password"
//           className="bg-slate-100 p-4 rounded-lg"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? "loading..." : "Sign In"}
//         </button>
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>
//           Don't have an account?{" "}
//           <Link to="/sign-up">
//             <span className="text-blue-500">Sign Up</span>
//           </Link>
//         </p>
//       </div>
//       <p className="text-red-700 mt-5">
//         {error ? error || "Something went wrong!" : ""}
//       </p>
//     </div>
//   );
// };

// export default SignIn;
