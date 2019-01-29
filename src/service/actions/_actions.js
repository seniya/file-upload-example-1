import { GET_BLOGS, ADD_BLOG, DELETE_BLOG } from './_actionType';

export const getBlogs = () => ({
  type : GET_BLOGS
})

export const addBlog = ( { title, content, auther, files } ) =>  ({
  type : ADD_BLOG,
  payload : {    
    title,
    content,
    auther,
    files
  }
})

export const deleteBlog = id => ({
  type : DELETE_BLOG,
  id
})