import Joi from "joi";

export const UserSchema = Joi.object({
  fullName: Joi.string().min(3).max(20).required(),
  userName: Joi.string().alphanum().min(3).max(20).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});
