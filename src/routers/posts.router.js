import express from 'express'
import * as posts from '../useCases/posts.usecase.js'
import { isAuth } from '../middlewares/auth.middleware.js'
const router = express.Router()

// Create Post
router.post('/', async (request, response) => {
  try {
    const data = request.body
    const postCreated = await posts.create({ post: data })
    response.json({
      success: true,
      message: 'The post was inserted successfully',
      data: {
        post: postCreated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      success: false,
      message: 'Ups! Something went wrong, try again',
      error: error.message
    })
  }
})
// Get All Posts
router.get('/', async (request, response) => {
    try {
        const responseData = await posts.getAll()
        response.json({
        success: true,
        message: 'Posts Found',
            data: {
                posts: responseData
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Ups! Something went wrong, try again',
        error: error.message
        })
    }
})
// Get All Posts By Params
router.get('/search', async (request, response) => {
    try {
        const { title, plainTags, id, plantId, userId} = request.query;
        let options = {}
        if(title) options = {...options,title}
        if(plainTags !== undefined) options = {...options, plainTags }
        if(id) options = {...options,_id:id}
        if(plantId) options = {...options,plantId}
        if(userId) options = {...options,userId}

        const responseData = await posts.getAllByParams({options})
        response.json({
        success: true,
        message: 'Posts Found',
            data: {
                posts: responseData
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Ups! Something went wrong, try again',
        error: error.message
        })
    }
})
// Get All Posts By Params
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params
        const responseData = await posts.getById({id})
        response.json({
        success: true,
        message: 'Post Found',
            data: {
                posts: responseData
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
        success: false,
        message: 'Ups! Something went wrong, try again',
        error: error.message
        })
    }
})
// Update Taks by Id
router.patch('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { body: newData } = request
    const postUpdated = await posts.updateById({id, newData})
    response.json({
      success: true,
      message: 'The data has been updated',
      data: {
        post: postUpdated
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Ups! Something went wrong, try again',
      error: error.message
    })
  }
})
// Delete Post by Id
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const responseData = await posts.deleteById({ id })
    response.json({
      success: true,
      message: 'Post Deleted',
      data: {
        users: responseData
      }
    })
  } catch (error) {
    response.status(400)
    response.json({
      sucess: false,
      message: 'Ups! Something went wrong, try again',
      error: error.message
    })
  }
})

export default router