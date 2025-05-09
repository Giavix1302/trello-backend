import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {

    // console.log('Request body:', req.body)

    // throw new ApiError()

    res.status(StatusCodes.CREATED).json({
      message: 'Controller: Board created successfully'
    })
  } catch (error) { next(error) }
}

export const boardController = {
  createNew
}