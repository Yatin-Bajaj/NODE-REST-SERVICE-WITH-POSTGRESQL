const ERROR = {
    LOGIN_ERROR: {
        'string.email': 'Invalid email address',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    },
    PASSWORD_ERROR: {
        'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        'string.min': 'Password must be at least {#limit} characters long',
        'any.required': 'Password is required'
    },
    AGE_ERROR: {
        'number.min': 'Age must be at least 4',
        'number.max': 'Age cannot be greater than 130'
    }
};

module.exports = ERROR;
