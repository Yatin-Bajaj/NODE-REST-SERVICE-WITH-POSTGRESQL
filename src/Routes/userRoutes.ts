import { Router } from "express";
import {
  getUsers,
  postUser,
  getUserById,
  updateUser,
  deleteUser,
  getAutoSuggestUsers,
} from "../Controller/userControllerCopy";

const schema = require("../utils/validationSchema");
const { userValidationMiddelware } = require("../utils/validationMiddelware");

const router = Router();

router.get("/users", getUsers);

router.get("/user/:userId", getUserById);

router.get("/users-suggestion", getAutoSuggestUsers);

router.post(
  "/create-user",
  userValidationMiddelware(schema.bodySchema),
  postUser
);

router.put("/update-user/:userId", updateUser);

router.delete("/delete-user/:userId", deleteUser);

export default router;
