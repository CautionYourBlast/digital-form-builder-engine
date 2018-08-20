const joi = require('joi')

const schema = joi.object().required().keys({
  pages: joi.array().required().items(joi.object().keys({
    path: joi.string().required(),
    title: joi.string(),
    section: joi.string(),
    components: joi.array().required().items(joi.object().keys({
      type: joi.string().required(),
      name: joi.string(),
      title: joi.string(),
      hint: joi.string(),
      options: joi.object().default({}),
      schema: joi.object().default({})
    }).unknown(true)),
    next: joi.array().items(joi.object().keys({
      path: joi.string().required(),
      if: joi.string()
    }))
  })).unique('path'),
  sections: joi.array().required().items(joi.object().keys({
    name: joi.string().required(),
    title: joi.string().required()
  })).unique('name'),
  lists: joi.array().required().items(joi.object().keys({
    name: joi.string().required(),
    title: joi.string().required(),
    type: joi.string().required().valid('string', 'number'),
    items: joi.alternatives().when('type', {
      is: 'string',
      then: joi.array().required().items(joi.object().keys({
        text: joi.string().required(),
        value: joi.string().required()
      })).unique('text').unique('value'),
      otherwise: joi.array().required().items(joi.object().keys({
        text: joi.string().required(),
        value: joi.number().required()
      })).unique('text').unique('value')
    })
  })).unique('name')
})

module.exports = schema
