import { Router, type IRouter } from "express";
import healthRouter from "./health";
import scriptRouter from "./script";
import validateRouter from "./validate";
import adminRouter from "./admin";
import locationsRouter from "./locations";

const router: IRouter = Router();

router.use(healthRouter);
router.use(scriptRouter);
router.use(validateRouter);
router.use(adminRouter);
router.use(locationsRouter);

export default router;
