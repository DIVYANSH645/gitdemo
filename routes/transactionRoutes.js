import { Router } from "express";
import {
  initializeDatabase,
  listTransactions,
  statistics,
  barChart,
  pieChart,
  combinedResponse,
} from "../controllers/api.js";

const router = Router();

router.get("/api/initDatabase", initializeDatabase);
router.get("/api/transactions", listTransactions);
router.get("/api/statistics", statistics);
router.get("/api/barChart", barChart);
router.get("/api/pieChart", pieChart);
router.get("/api/combinedResponse", combinedResponse);

export default router;
