const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Inscription, pour créer un nouveau compte User
exports.signup = async (req, res) => {
  try {
    // Trying to read the request body of the User
    const { name, email, password } = req.body;

    // Requiring attributes fields 'name', 'email' and 'password' from the User request
    if (!name || !email || !password) {
      // If there is one input that is still missing
      return res.status(400).json({
        message: "Name, Email and Password are required!",
      });
    }

    // Trimming 'name' from the User request
    const nameTrimmed = name.trim();
    // Trimming 'email' from the User request then converting it to lowercase
    const normalizedEmail = email.trim().toLowerCase();
    // Trimming 'password' from the User request
    const passwordTrimmed = password.trim();

    // Email format validation: Email@Example.com
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Password length validation: 6 characters
    if (passwordTrimmed.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Trying to find if there's an existing User created in mongodb
    const existingUser = await User.findOne({ email: normalizedEmail }); // email is the only unique attribute in User
    if (existingUser) {
      // If user already exists in the db
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hashing the password given by the User in the request
    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);

    // Creating the User with the hashed password
    const user = await User.create({
      name: nameTrimmed, // Trimmed
      email: normalizedEmail, // Trimmed + Lower Case sensitivity
      password: hashedPassword, // Trimmed + hashed
    });

    // Generating a token to the new User created
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Returning a success 201 response with a message, token and User's informations
    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    // Or else, catch any errors 500 on the server level
    res
      .status(500)
      .json({ message: "Error creating the User", error: error.message });
  }
};

// Connexion, pour authentifier un User existant
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const passwordTrimmed = password.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      passwordTrimmed, // password in request
      user.password, // password saved in db
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in the User", error: error.message });
  }
};
