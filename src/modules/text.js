import validator from "validator";

export const sanitize = (value) => {
    return validator.escape(value || "");
};
