const Joi = require("joi");
const ERROR_MESSAGES = require('./errorMessages');

const REGEX = {
    email_regex: /^([a-zA-Z0-9_]{2,}@[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,6})*$/,
    password_regex:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
};

const schema = {
    bodySchema: Joi.object({
        login: Joi.string().email({ minDomainSegments: 2 }).required().messages({
            ...ERROR_MESSAGES.LOGIN_ERROR
        }),
        password: Joi.string()
            .min(8)
            .regex(REGEX.password_regex)
            .required()
            .messages({
                ...ERROR_MESSAGES.PASSWORD_ERROR
            }),
        age: Joi.number().min(4).max(130).required().messages({
            ...ERROR_MESSAGES.AGE_ERROR
        }),
    }),
    bodyUpdateSchema: Joi.object({
        login: Joi.string().email({ minDomainSegments: 2 }).messages({
            'string.email': ERROR_MESSAGES.LOGIN_ERROR['string.email']
        }),
        password: Joi.string().min(8).regex(REGEX.password_regex).messages({
            'string.pattern.base': ERROR_MESSAGES.PASSWORD_ERROR['string.pattern.base'],
            'string.min': ERROR_MESSAGES.PASSWORD_ERROR['string.min']
        }),
        age: Joi.number().min(4).max(130).messages({
            'number.min': ERROR_MESSAGES.AGE_ERROR['number.min'],
            'number.max': ERROR_MESSAGES.AGE_ERROR['number.max']
        })
    })
};

module.exports = schema;
