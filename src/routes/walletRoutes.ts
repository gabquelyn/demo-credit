import Router from "express";
import verifyJwt from "../utils/verifyJwt";
import {
  fundAccountController,
  transferAccountController,
  withdrawAccountController,
} from "../controllers/walletController";

const walletRouter = Router();

walletRouter.route("/fund").patch(fundAccountController);
walletRouter.route("/withdraw").post(withdrawAccountController);
walletRouter.route("/transfer").post(transferAccountController);

export default walletRouter;
