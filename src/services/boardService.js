/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatters.js'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    }
    // gọi tới tầng model để xử lí lưu dữ liệu vào database
    const createBoard = await boardModel.createNew(newBoard)

    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)

    // trả kết quả về trong service luon có return !!!
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {
    // xử lí logic dữ liệu
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }


    // trả kết quả về trong service luon có return !!!
    return board
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew,
  getDetails
}