import Joi from "joi";

export const ProductSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  imageUrl: Joi.string().alphanum().min(0).max(225).required(),
  price: Joi.string().min(3).max(15).required(),
  quantity: Joi.string().min(3).max(10).required(),
});
