import Joi from 'joi';

export const productDTOSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    count: Joi.number().required(),
    price: Joi.number().required()
}).meta({ className: 'ProductDTO' });
