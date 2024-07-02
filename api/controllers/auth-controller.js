import User from "../models/user-model.js";
//import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    // Hash the password asynchronously
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // Hash the password synchronously
    // const salt = bcryptjs.genSaltSync(10);
    // const hashedPassword = bcryptjs.hashSync(password, salt);

    // Create a new user instance
    const newUser = new User({ username, email, password: hashedPassword });
    // Save the user to the database
    await newUser.save();
    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Handle errors and send an error response
    console.log(error);
    // res.status(500).json(error.message);
    next(error);
    // next(errorHandler(300, "Something went wrong"));
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong Credentials."));
    }
    //When both the email and password are correct, then we just add a token, i.e., cookies
    //First we need to create a  JSON Web Token.
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //Remove the password, before sent to the user
    const { password: hashedPassword, ...rest } = validUser._doc;
    // Using _doc allows you to work directly with the document's data. In your case, the code snippet is using destructuring to extract the password property (renamed to hashedPassword) and the rest of the document's properties.

    const expiryDate = new Date(Date.now() + 3600000); //1hour
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        expires: expiryDate,
      }) //here you can also provide the time show that the cookies(jwt token present for give time)
      .status(200)
      .json(rest);
    //  res.json({ message: 'Logged in successfully' });
  } catch (error) {
    next(error);
  }
};

import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/User";

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
