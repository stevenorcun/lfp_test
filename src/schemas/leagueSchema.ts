import Joi from "joi";

export const leagueSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  adminId: Joi.string().required(),
});
