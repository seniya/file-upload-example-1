import React from 'react';


export default ({ postId, post : { title, content, auther, files }, onDelete }) => {

  let attachment = "<p>no item</p>";
  if (files !== null && files !== undefined) {
    attachment = files.map(file => (            
      <p key={file.id}>* {file.name}</p>
    ));
  }

  return (
    <div className={'post-view'}>
      <h2>{ title }</h2>
      <p>{ content }</p>
      <p>auther : { auther }</p>
      { attachment }
      <button className="btn btn-danger" type="button" onClick={() => onDelete(postId)}>
        Remove
      </button>
    </div>
  )
}