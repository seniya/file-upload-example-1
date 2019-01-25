import { GET_BLOGS, ADD_BLOG, DELETE_BLOG, RECEIVE_BLOG } from '../actions/_actionType';

export default function blogReducer( state={}, action ) {
  switch (action.type) {
    case GET_BLOGS:
      return { ...state, loading:true };
    case ADD_BLOG:
      return { ...state, loading:true};
    case DELETE_BLOG:
      return { ...state, loading:true };
    case RECEIVE_BLOG:
      return { ...state, item:action.item, loading:false };
    default:
      return state;
  }
}