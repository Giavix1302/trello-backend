import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

// Health check route
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'API is running'
  })
})
// board api
Router.use('/boards', boardRoute)

// column api
Router.use('/columns', columnRoute)

// card api
Router.use('/cards', cardRoute)

export const APIs_V1 = Router