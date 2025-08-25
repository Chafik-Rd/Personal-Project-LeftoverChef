import { users } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  try {
    const { fristname, lastname, email, password } = req.body;

    // check fristname, lastname, email, password from body
    if (!fristname || !lastname || !email || !password) {
      const error = new Error(
        "Fristname, lastname, email and password are required"
      );
      error.status = 400;
      return next(error);
    }

    // check email in database
    const checkUser = await users.findOne({ email });

    if (checkUser) {
      const error = new Error("User already exists");
      error.status = 400;
      return next(error);
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const user = {
      fristname,
      lastname,
      email,
      password: hashPassword,
      role: "user",
    };

    // save in database
    await users(user).save();
    return res
      .status(201)
      .json({ success: true, message: "Created user successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check email and password from body
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.status = 400;
      return next(error);
    }

    //  check user in database
    const user = await users.findOne({ email });
    if (!user) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return next(error);
    }

    // check password user
    const passwordCompare = bcrypt.compareSync(password, user.password);
    if (!passwordCompare) {
      const error = new Error("Invalid email or password");
      error.status = 401;
      return next(error);
    }

    // create jwt token
    const token = jwt.sign(
      { _id: user._id, email: user.email, role: user.role },
      process.env.PRIVATE_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, message: "Login successfully", token: token });
  } catch (error) {
    next(error);
  }
};
