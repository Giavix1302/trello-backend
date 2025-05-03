
import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let trelloDatabaseInstance = null

// khởi tạo đối tượng Client instance để connect tới mongodb
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // serverApi có từ phiên bản 5.0 trở lên
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// Kết nối tới database
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã được khai báo trong mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công thì lấy ra database theo tên và gán ngược lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
// export ra trelloDatabaseInstance sau khi kết nối thành công
// để có thể sử dụng ở các file khác
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to database first!')
  return trelloDatabaseInstance
}

// Đóng kết nối tới MongoDB Atlas
export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}