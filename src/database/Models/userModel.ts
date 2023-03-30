import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/dbConnection";
import { v4 as uuidv4 } from "uuid";

console.log(sequelize);

class User extends Model {

    declare id: string;
    declare login: string;
    declare password: string;
    declare age: number;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4(),
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: sequelize,
        modelName: "User"
    }
);

export default User;
