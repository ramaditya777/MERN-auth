import User from "../models/user-model.js";
//import bcrypt from "bcryptjs";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};
