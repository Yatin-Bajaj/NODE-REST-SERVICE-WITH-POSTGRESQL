const userValidationMiddelware = (schema) => {
    return (req, res, next) => {
        console.log(req.body);
        const { error } = schema.validate(req.body);
        if (error) {
            const { details } = error;
            const message = details.map((error) => error.message).join(",");
            console.log("error", message);
            res.status(400).json({ error: message });
        } else {
            next();
        }
    };
};

module.exports = {
    userValidationMiddelware,
};
