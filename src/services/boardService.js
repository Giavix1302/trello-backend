/* eslint-disable no-useless-catch */

import { StatusCodes } from 'http-status-codes'
import { slugify } from '~/utils/formatters.js'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    }
    // gọi tới tầng model để xử lí lưu dữ liệu vào database


    // trả kết quả về trong service luon có return !!!
    return newBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}