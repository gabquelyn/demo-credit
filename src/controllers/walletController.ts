import expressAsyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { CustomRequest } from "../../types";

export const fundAccountController = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const email = (req as CustomRequest).email;
  }
);

export const withdrawAccountController = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const email = (req as CustomRequest).email;
  }
);

export const transferAccountController = expressAsyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const email = (req as CustomRequest).email;
  }
);
