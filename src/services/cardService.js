import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    // xử lí logic dữ liệu
    const newCard = {
      ...reqBody
    }
    // gọi tới tầng model để xử lí lưu dữ liệu vào database
    const createCard = await cardModel.createNew(newCard)

    const getNewCard = await cardModel.findOneById(createCard.insertedId)

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }

    // trả kết quả về trong service luon có return !!!
    return getNewCard
  } catch (error) {
    throw error
  }
}

export const cardService = {
  createNew
}