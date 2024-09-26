import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import knex from "knex";
import jwt from "jsonwebtoken";

export const loginController = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;

    const retrievedPassword = await knex("users")
      .select("password")
      .where("email", email)
      .first();
    const passwordMatch = bcrypt.compareSync(password, retrievedPassword);
    if (!passwordMatch)
      return res.status(401).json({ message: "Invalid email or password!" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: email,
        },
      },
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: "1h" }
    );

    return res.status(200).json({ accessToken });
  }
);

export const registerController = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { email, password, name } = req.body;
    // will check if user has been blacklisted using the Adjutor api.

    // after encypting password- one way encryption;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const insertedUserRows = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    });

    await knex("wallet").insert({
      balance: 0,
      user_id: insertedUserRows[0],
    });

    return res.status(201).json({ message: "Account created successfully!" });
  }
);
