import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newColumn = {
      ...reqBody
    }
    // gọi tới tầng model để xử lí lưu dữ liệu vào database
    const createColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong collection board
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    // trả kết quả về trong service luon có return !!!
    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    // xử lí logic dữ liệu
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateColumn = await columnModel.update(columnId, updateData)

    return updateColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew,
  update
}