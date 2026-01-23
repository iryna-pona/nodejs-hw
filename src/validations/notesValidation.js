import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().min(1).integer().default(1).messages({
      'number.base': 'Page must be a number',
      'number.min': 'Page must be at least {#limit}',
    }),
    perPage: Joi.number().min(5).max(20).integer().default(10).messages({
      'number.base': 'PerPage must be a number',
      'number.min': 'PerPage must be at least {#limit}',
      'number.max': 'PerPage must be at most {#limit}',
    }),
    tag: Joi.string()
      .valid(TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
    search: Joi.string().allow('').messages({
      'string.base': 'Search must be a string',
    }),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Id is required',
      'string.base': 'Id must be a string',
    }),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required().messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit}',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required().messages({
      'any.required': 'Id is required',
      'string.base': 'Id must be a string',
    }),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least {#limit}',
      'any.required': 'Title is required',
    }),
    content: Joi.string().allow('').optional().messages({
      'string.base': 'Content must be a string',
    }),
    tag: Joi.string()
      .valid(TAGS)
      .optional()
      .messages({
        'any.only': `Tag must be one of: ${TAGS}`,
      }),
  }).min(1),
};
