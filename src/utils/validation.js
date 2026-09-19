const isValidId = (id) => {
    return /^\d+$/.test(id) && Number(id) > 0;
};

const isValidExercise = (
    name,
    description,
    category,
    muscle_group
) => {
    if (
        !name ||
        !description ||
        !category ||
        !muscle_group
    ) {
        return false;
    }

    return true;
};

const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const isValidPassword = (password) => {
    return typeof password === "string" && password.length >= 6;
};

module.exports = {
    isValidId,
    isValidExercise,
    isValidEmail,
    isValidPassword
};