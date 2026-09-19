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

module.exports = {
    isValidId,
    isValidExercise
};