import type { Request, Response, NextFunction } from "express";
import { UserInputDTO } from "../interfaces/user.interface";
import UserService from "../service/UserService";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getUsers();
        return res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.params?.userId.trim();
    try {
        const user = await UserService.getUserById(userId);
        return res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

const getAutoSuggestUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { loginSubstring = "", limit = 10 } = req.query;
    try {
        const userList = await UserService.getAutoSuggestUsers(
            String(loginSubstring),
            Number(limit)
        );
        res.status(200).json(userList);
    } catch (err) {
        next(err);
    }
};

const postUser = async (req, res, next) => {
    const data = req.body;
    try {
        const newUser = await UserService.createUser(data);
        if (!newUser) {
            return res.status(403).json("Oops! It seems user already exist");
        }
        return res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res: Response, next: NextFunction) => {
    const userId = req?.params?.userId.trim();
    const data = req.body as UserInputDTO;

    try {
        const updatedUser = await UserService.updateUserById(userId, data);
        if (!updatedUser) {
            return res.status(404).json("Oops! It seems user id not exist");
        }
        return res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.params?.userId;
    try {
        await UserService.deleteUser(userId);
        return res.json("User Deleted!");
    } catch (err) {
        next(err);
    }
};

export {
    getUsers,
    getUserById,
    postUser,
    updateUser,
    deleteUser,
    getAutoSuggestUsers,
};
