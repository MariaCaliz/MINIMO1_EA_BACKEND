import { Router } from "express";
import colectivoController from "../controllers/colectivoController";

const router: Router = Router();

router.get("/", colectivoController.getColectivos);
router.get("/:colectivoid", colectivoController.getColectivo);

router.post("/new", colectivoController.addColectivo);

router.delete("/:colectivoid", colectivoController.deleteColectivo);

export default router;