import express, { NextFunction, Request, Response } from "express";
import * as bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const cors = require('cors') // HTTP headers (enable requests)
const {ORIGIN} = require('../constants')
// initialize app
export const app = express()

// middlewares
app.use(cors({origin: ORIGIN}))
app.use(urlencodedParser) // body parser
app.use(express.urlencoded({extended: false})) // url parser

// // error handling
app.use((err : Error, req : Request, res : Response, next : NextFunction) => {
  console.error(err)
  res.status(500).send()
  next()
})

module.exports = app