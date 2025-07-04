/* eslint-disable no-console */

import express from 'express'
import cors from 'cors'
import { corsOptions } from '~/config/cors'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/v1', APIs_V1)

  // Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)

  if (env.BUILD_MODE === 'production') {
    // pro
    app.listen(process.env.PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Production: Hello ${env.AUTHOR}, Backend service is running at port: ${process.env.PORT}`)
    })
  } else {
    // dev
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      // eslint-disable-next-line no-console
      console.log(`Hello ${env.AUTHOR}, I am running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}/`)
    })
  }


  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    console.log('Connecting to MongoDB Atlas...')
    await CONNECT_DB()

    console.log('Connected to MongoDB Atlas!')
    START_SERVER()
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log('Connected to MongoDB Atlas!'))
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error('Error connecting to MongoDB Atlas:', error)
//     process.exit(0)
//   })
