import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addBlog } from '../service/actions/_actions';
import PostCreate from '../components/PostCreate';


const propTypes = {
  classes: PropTypes.object
}

class BlogCreate extends Component {
  static defaultProps = {};
  render() {
    return (
      <PostCreate onAddPost={this.props.onAddPost}/>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPost : post => {
      dispatch( addBlog(post) );
    }
  }
}

BlogCreate.propTypes = propTypes;
export default connect(
  null,
  mapDispatchToProps
)(BlogCreate);