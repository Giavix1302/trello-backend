import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newColumn = {
      ...reqBody
    }
    // gọi tới tầng model để xử lí lưu dữ liệu vào database
    const createColumn = await columnModel.createNew(newColumn)

    const getNewColumn = await columnModel.findOneById(createColumn.insertedId)

    // trả kết quả về trong service luon có return !!!
    return getNewColumn
  } catch (error) {
    throw error
  }
}

export const columnService = {
  createNew
}