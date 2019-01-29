import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

import FileAdd from '../components/FileAdd';

class NewPost extends Component {

  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      'createDisable' : false,
      'title' : '',
      'content' : '',
      'auther': '',
      'files': null
    }
    this.child = React.createRef();
  }

  handleCreateable = (createDisable) => {
    this.setState({
      createDisable
    })
  }

  handleFiles = (files) => {

    console.log('handleFiles : ', files);

    let fileArray = []
    files.forEach( (element) => {
      let file = {
        'id': element.id,        
        'name': element.name,
        'size': element.size,
        'type': element.type,
        'lastModified': element.lastModified
      }
      fileArray.push(file);
    });
    this.setState({
      'files' : fileArray
    })
  }


  handleInputChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { title, content, auther} = this.state;
    if(title.trim() && content.trim() && auther.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
    }
  }

  handleReset = () => {
    this.setState({
      'title' : '',
      'content' : '',
      'auther' : '',
    })

    this.child.current.handleReset();
  }

  render() {

    const { createDisable } = this.state;

    return (
      <>
        <div>
          <form onSubmit= { this.handleSubmit }>
            <div className="form-group">
              <input
                type="text"
                placeholder="Title"
                className="form-control"
                name="title"
                onChange={ this.handleInputChange }
                value={ this.state.title }
              />
            </div>
            <div className="form-group">
              <textarea
                cols="19"
                rows="8"
                placeholder="content"
                className="form-control"
                name="content"
                onChange={ this.handleInputChange }
                value={ this.state.content }>
              </textarea>
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="auther"
                className="form-control"
                name="auther"
                onChange={ this.handleInputChange }
                value={ this.state.auther }
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary" disabled={ createDisable }>
                Add Post
              </button>
              <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
                Reset
              </button>
            </div>
          </form>
        </div>
        <FileAdd 
          ref={this.child}
          onChangeFile={(files) => this.handleFiles(files)} 
          onChangeCreatable={(creatable)=>this.handleCreateable(!creatable)}/>
      </>
    )
  }

}

export default NewPost;