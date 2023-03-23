import User from "../database/Models/userModel";
import { Op } from "sequelize";

import { UserInputDTO, User as UserDTO } from "../interfaces/user.interface";

export default class UserService {
    public static async getUsers(): Promise<UserDTO[]> {
        try {
            const users = User.findAll();
            return users;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async getUserById(userId: string): Promise<UserDTO> {
        try {
            const user = await User.findByPk(userId);
            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async createUser(
        data: UserInputDTO
    ): Promise<UserDTO | undefined> {
        const { login, password, age } = data;
        const sanitizeLogin = login.toLowerCase().trim();
        const sanitizePassword = password.trim();
        try {
            const isLoginExist = await User.findOne({
                where: {
                    login: sanitizeLogin,
                },
            });
            if (isLoginExist) {
                return;
            }
            const newUser = await User.create({
                login: sanitizeLogin,
                password: sanitizePassword,
                age,
            });
            return newUser;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    public static async updateUserById(
        userId: string,
        data: UserInputDTO
    ): Promise<UserDTO | undefined> {
        const { login, password, age } = data;
        const sanitizeLogin = login.toLowerCase().trim();
        const sanitizePassword = password.trim();
        try {
            const user = await User.findByPk(userId);

            if (!user) {
                return;
            }

            user.login = sanitizeLogin;
            user.password = sanitizePassword;
            user.age = age;
            user.save();

            return user;
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async deleteUser(userId: string) {
        try {
            const user = await User.destroy({
                where: {
                    id: userId,
                },
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    public static async getAutoSuggestUsers(
        loginSubString: string,
        limit: number
    ): Promise<UserDTO[]> {
        const userList = await User.findAll({
            where: {
                login: {
                    [Op.iLike]: `%${loginSubString}%`,
                },
            },
            order: ["login"],
            limit,
        });
        return userList;
    }
}
