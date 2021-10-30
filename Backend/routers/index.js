import express from "express";
import { adminRouter } from "./admin.router";
import { customerRouter } from "./customer.router";
import { feedbackRouter } from "./feedback.router";
import { foodRouter } from "./food.router";
import { orderRouter } from "./order.router";
import { orderItemRouter } from "./orderItem.router";
import { paymentRouter } from "./payment.router";
const rootRouter = express.Router();
rootRouter.use("/security/admin", adminRouter);
rootRouter.use("/customer", customerRouter);
rootRouter.use("/feedback", feedbackRouter);
rootRouter.use("/food", foodRouter);
rootRouter.use("/order", orderRouter);
rootRouter.use("/orderItem", orderItemRouter);
rootRouter.use("/payment", paymentRouter);
export default rootRouter;
