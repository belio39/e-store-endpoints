import Joi from "joi";

export const Order_ItemsSchema = Joi.object({
  order_id: Joi.string().required(),
  product_id: Joi.string().required(),
});
