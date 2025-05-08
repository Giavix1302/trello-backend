import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctValidation = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(266).trim().strict()
  })

  try {
    // abortEarly: false trả về tất cả các lỗi thay vì chỉ lỗi đầu tiên
    await correctValidation.validateAsync(req.body, { abortEarly: false })
    // validate dữ liệu thành công next qua controller
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}