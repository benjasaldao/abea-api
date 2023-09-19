const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const image = Joi.string().uri();
const productId = Joi.number().integer();

const createColorSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    productId: productId.required(),
});

const updateColorSchema = Joi.object({
    name: name,
    image: image,
    productId: productId,
});

const getColorSchema = Joi.object({
    id: id.required()
})

module.exports = {
    createColorSchema,
    updateColorSchema,
    getColorSchema,
}