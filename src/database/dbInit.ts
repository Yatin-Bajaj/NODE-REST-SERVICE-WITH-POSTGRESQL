import User from "./Models/userModel";

const dbInit = async () => {
    await User.sync();
};

export default dbInit;
