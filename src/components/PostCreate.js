import React, { Component } from 'react';

class NewPost extends Component {

  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      'title' : '',
      'content' : '',
      'auther': ''
    }
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
  }

  render() {
    return (
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
            <button type="submit" className="btn btn-primary">
              Add Post
            </button>
            <button type="button" className="btn btn-warning" onClick={ this.handleReset }>
              Reset
            </button>
          </div>
        </form>
      </div>
    )
  }

}

export default NewPost;