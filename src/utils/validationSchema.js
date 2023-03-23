const Joi = require("joi");

const REGEX = {
    email_regex: /^([a-zA-Z0-9_]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,6})*$/,
    password_regex:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
};

const schema = {
    bodySchema: Joi.object({
        login: Joi.string().email({ minDomainSegments: 2 }).required().messages({
            "string.email": "Invalid email address",
            "string.empty": "Email is required",
            "any.required": "Email is required",
        }),
        password: Joi.string()
            .min(8)
            .regex(REGEX.password_regex)
            .required()
            .messages({
                "string.pattern.base":
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                "string.min": "Password must be at least {#limit} characters long",
                "any.required": "Password is required",
            }),
        age: Joi.number().min(4).max(130).required().messages({
            "number.min": "Age must be at least 4",
            "number.max": "Age cannot be greater than 130",
        }),
    }),
};

module.exports = schema;
