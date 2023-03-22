import Joi from "joi";

class Schemas {
  signup() {
    return Joi.object({
      name: Joi.string().min(2).max(50),
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
      name: Joi.string().min(1).required(),
    });
  }
  timeline() {
    return Joi.object({
      description: Joi.string(),
      url: Joi.string().uri().required(),
    });
  }
  createPost() {
    return Joi.object({
      description: Joi.string(),
      url: Joi.string().uri().required(),
      preview_title: Joi.string().required(),
      preview_description: Joi.string().required(),
      preview_img: Joi.string().uri().required(),
    });
  }
  updatePost() {
    return Joi.object({
      description: Joi.string().required()
    })
  }
}

export default new Schemas();
