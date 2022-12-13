import express from "express";
import WidgetsController from "./controllers/widgetsController";

const router = express.Router();

// heartbeat
router.get("/", (_, res) => {
  res.json({
    message: "This is the API",
  });
});

// Widgets API
router.post("/widgets", WidgetsController.create);
router.get("/widgets/:orgId", WidgetsController.read);
router.patch("/widgets/:orgId", WidgetsController.update);
router.delete("/widgets/:orgId", WidgetsController.destroy);

export default router;
