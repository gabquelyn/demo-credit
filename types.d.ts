import { Request } from "express";
interface User {
  id: number;
  email: string;
  name: string;
  password: string;
}

interface Wallet {
  id: number;
  user_id: string;
  balance: number;
}


interface CustomRequest extends Request {
  email: string;
}