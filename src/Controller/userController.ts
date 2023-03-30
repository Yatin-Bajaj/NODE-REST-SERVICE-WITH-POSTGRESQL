import { v4 as uuidv4 } from "uuid";
import type { Request, Response, NextFunction } from "express";
import pool from "../database/connection/connection";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await pool.query(`select * FROM users`);
        return res.status(200).json(users.rows);
    } catch (err) {
        next(err);
    }
};

const getUserById = async (req, res, next) => {
    const userId = req?.params?.userId.trim();
    try {
        const user = await pool.query(`select * FROM users where id = $1`, [
            userId,
        ]);
        return res.status(200).json(user.rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const postUser = async (req, res, next) => {
    const id = uuidv4();
    const { login, password, age, isDeleted } = req?.body;
    try {
        const newUser = await pool.query(
            `INSERT INTO users (id,login,password,age) VALUES ($1,$2,$3,$4) RETURNING *`,
            [id, login, password, age]
        );
        return res.status(200).json(newUser.rows[0]);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const userId = req?.params?.userId.trim();
    try {
        const { login, password, age, isDeleted } = req?.body;
        const newUser = await pool.query(
            `UPDATE users SET login = $1, password = $2, age = $3 WHERE id = $4`,
            [login, password, age, userId]
        );
        return res.status(200).json(newUser.rows);
    } catch (err) {
        console.log(err);
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const userId = req?.params?.userId;
        const user = await pool.query(`DELETE FROM users where id = $1 `, [userId]);
        return res.json("User Deleted!");
    } catch (err) {
        console.log(err);
        next(err);
    }
};

export { getUsers, getUserById, postUser, updateUser, deleteUser };
