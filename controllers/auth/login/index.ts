import { Request, Response } from "express";
import { AuthLoginRes } from "../../../interfaces/auth/login";
import { signToken } from "../../../middlewares/auth";
const bcrypt = require("bcrypt");

const cosmos = require("../../../utils/cosmos");

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await cosmos.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = signToken({ userId: user.id });

    const resdata = {
      name: user.name,
      email: user.email,
      role: user.role,
      id: user.id,
    };

    return res.status(200).json({
      message: "Successfully logged in",
      data: resdata,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      data: error
    });
  }
};
