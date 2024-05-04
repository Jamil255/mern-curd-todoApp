import express from 'express'
import connectDb from './config/db.js'
import postModel from './models/postModel.js'
import cors from 'cors'
const app = express()
app.use(cors({ origin: '*' }))
const PORT = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDb()
app.post('/createpost', async (req, res) => {
  try {
    const { value, userID } = req.body
    if (!value || !userID) {
      res.json({
        message: 'required fields are missing ',
        status: false,
      })
      return
    }
    const obj = {
      value,
      userID,
    }
    const postReponse = await postModel.create(obj)
    res.json({
      message: 'post created successfully',
      data: postReponse,
      status: 200,
    })
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
      data: [],
    })
  }
})
app.get(
  '/',
  (req,
  (res) => {
    res.send('success   message')
  })
)
app.get('/getusers', async (req, res) => {
  try {
    const userData = await postModel.find({})
    res.json({
      data: userData,
    })
  } catch (error) {
    res.json({
      message: error.message,
      data: [],
    })
  }
})

app.put('/updatepost/:id', async (req, res) => {
  try {
    const postID = req.params.id
    const { value } = req.body

    const obj = {
      value,
    }

    const postReponse = await postModel.findByIdAndUpdate(postID, obj, {
      new: true,
    })
    res.json({
      message: 'post updated successfully',
      data: postReponse,
      status: 200,
    })
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    })
  }
})

app.delete('/deletepost/:id', async (req, res) => {
  try {
    const postID = req.params.id
    const postReponse = await postModel.findByIdAndDelete(postID)
    res.json({
      message: 'post deleted successfully',
      status: true,
    })
  } catch (error) {
    res.json({
      message: error.message,
      status: false,
    })
  }
})

app.listen(PORT, (error, response) => {
  console.log(`listening on ${PORT}`)
})
