import { put, takeLatest, all } from 'redux-saga/effects';
import { GET_BLOGS, ADD_BLOG, DELETE_BLOG, RECEIVE_BLOG } from '../actions/_actionType';
import firebase from '../firebase';

const dbInstant = firebase.firestore();

function* getBlogs() {
  const response = yield dbInstant.collection("blogs").get();  
  yield put( { type:RECEIVE_BLOG, item:response } );
}

function* addBlog(action) {
  const response = yield dbInstant.collection("blogs").add(action.payload);
  yield put( { type:GET_BLOGS } );
}

function* deleteBlog(action) {
  const response = yield dbInstant.collection("blogs").doc(action.id).delete()
  yield put( { type:GET_BLOGS } );
}

function* actionWatcher() {
  yield takeLatest(GET_BLOGS, getBlogs);
  yield takeLatest(ADD_BLOG, addBlog);
  yield takeLatest(DELETE_BLOG, deleteBlog);
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}