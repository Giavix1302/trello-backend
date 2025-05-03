/* eslint-disable no-console */
/**
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'

const START_SERVER = () => {
  const app = express()

  app.get('/', async (req, res) => {
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${env.APP_HOST}:${env.APP_PORT}/`)
  })

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
