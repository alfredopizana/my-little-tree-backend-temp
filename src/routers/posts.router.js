const express = require('express')
const posts = require('../useCases/posts')
const router = express.Router()
const verifyAuth = require('../middlewares/auth')

// Create Post
router.post('/', verifyAuth, async (request, response) => {
  try {
    const data = request.body
    const documentCreated = await posts.create({ data })
    response.json({
      success: true,
      message: 'The post was inserted successfully',
      data: {
        posts: documentCreated
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
        const { activeTrial, record, id, title, assignee} = request.query;
        let options = {}
        if(activeTrial) options = {...options,activeTrial}
        if(record !== undefined) options = {...options, record }
        if(id) options = {...options,_id:id}
        if(title) options = {...options,title}
        if(assignee) options = {...options,assignee}

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
// Update Taks by Id
router.patch('/:id', verifyAuth, async (request, response) => {
  try {
    const { id } = request.params
    const { body: newdata } = request
    const postUpdated = await posts.updateById({id, newdata})
    response.json({
      success: true,
      message: 'Tus datos han sido actualizado correctamente',
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
router.delete('/:id', verifyAuth, async (request, response) => {
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

module.exports = router