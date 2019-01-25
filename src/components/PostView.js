import React from 'react';

const styles = {
  borderBottom: '2px solid #eee',
  background: '#fafafa',
  margin: '.75rem auto',
  padding: '.6rem 1rem',
  maxWidth: '500px',
  borderRadius: '7px'
};

export default ({ postId, post : { title, content, auther }, onDelete }) => {
  return (
    <div style = { styles }>
      <h2>{ title }</h2>
      <p>{ content }</p>
      <p>auther : { auther }</p>
      <button className="btn btn-danger" type="button" onClick={() => onDelete(postId)}>
        Remove
      </button>
    </div>
  )
}