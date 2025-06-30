import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng sang tầng service
    const createdColumn = await columnService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdColumn)
  } catch (error) { next(error) }
}

const update = async (req, res, next) => {
  try {
    // Lấy id từ params
    const columnId = req.params.id

    // Điều hướng sang tầng service
    const updateColumn = await columnService.update(columnId, req.body)

    res.status(StatusCodes.OK).json(updateColumn)
  } catch (error) { next(error) }
}

export const columnController = {
  createNew,
  update
}