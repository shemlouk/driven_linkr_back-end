import Joi from "joi";

class Schemas {
  signup() {
    return Joi.object({
      username: Joi.string().min(2).max(50),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(16),
      profilePicture: Joi.string().uri(),
    })
      .options({ presence: "required" })
      .required();
  }
  signin() {
    return Joi.object({
      email: Joi.string().email(),
      password: Joi.string().min(8).max(16),
    })
      .options({ presence: "required" })
      .required();
  }
  hashtag() {
    return Joi.object({
      name: Joi.string().min(1).required()
    });
  }
}

export default new Schemas();
