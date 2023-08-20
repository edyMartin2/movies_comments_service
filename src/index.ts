// src/app.ts
import express from 'express'
import bodyParser from 'body-parser'
import http from 'http'
import cors from 'cors'
import CommentApplication from './application/CommentAplication'
import { ObjectId } from 'mongodb'
import Comments from './models/CommentModel'



const app = express()
const commentsRp = new CommentApplication()

// Middleware
app.use(bodyParser.json());
app.use(cors())

//  ******************* Comments ************************

/**
 * endpoint / for get all comment
 */
app.get('/api/comments', async (_, res) => {
  const comment: Comments = await commentsRp.findAll()
  res.json(comment)
});

/**
 * endpoint / for get all comment
 */
app.get('/api/comment/:id', async (req, res) => {
  const movieId = req.params.id
  const comment: Comments = await commentsRp.findByMovieId(movieId)
  res.json(comment)
});


/**
 * endpoint /comment?platformId for get comments by platforms
 */
app.get('/api/comments/platform/:id/movie/:movieId', async (req, res) => {
  const platformId = req.params.id
  const movieId  = req.params.movieId

  const comment: Comments = await commentsRp.findByPlatformId(platformId, movieId)
  res.json(comment)
});

/**
 * endpoint /comment for create one comment
 */
app.post('/api/comment', async (req, res) => {
  const body: Comments = req.body
  const save_comment = await commentsRp.create(body)
  res.json(save_comment)
})

/**
 * endpoint /comment/:id for update one comment
 */
app.post('/api/comment/:id', async (req, res) => {
  const id: ObjectId = new ObjectId(req.params.id)
  const body: Comments = req.body
  const update_comment = await commentsRp.update(id, body)
  res.json(update_comment)
})

/**
 * endpoint /comment/:id for delete one comment
 */
app.delete('/api/comment/:id', async (req, res) => {
  const id: ObjectId = new ObjectId(req.params.id)
  console.log(id)
  const delete_comment = await commentsRp.delete(id)
  res.json(delete_comment)
})

// ENDPOINT TEST
app.get('/api', async (req, res) => {
  res.json({ 'message': "hola mundos" })
})


//versel platform 
http.createServer(app).listen(3000, () => {
  console.log('Express server listening on port ' + app.get('port'))
})