import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';
import { connect } from 'react-redux';
import { getBlogs, deleteBlog } from '../service/actions/_actions';

import PostView from '../components/PostView';


const propTypes = {
  classes: PropTypes.object
};

class BlogList extends Component {

  static defaultProps = {};

  componentDidMount() {    
    this.props.requestApi();
  }
  
  renderEmpty = () => {
    return (
      <p>no items</p>
    )
  }

  renderItems = (items) => {
    return (
      <div>
        {
          items.map( (item, idx) => (     
            <PostView 
              postId={ item.id }
              post={ item.data() } 
              onDelete={ this.props.onDelete } 
              key={ item.id }/>  
          ))
        }
      </div>
    )
  }

  render() {    
    const { item } = this.props;
    return (
      isNil(item) === true ? (
        this.renderEmpty()
      ) : (
        this.renderItems(item.docs)
      ) 
    )
  }
}

const mapStateToProps = state => {  
  return {
    item : state.blogs.item
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete : id => {
      dispatch(deleteBlog(id))
    },
    requestApi : () => {
      dispatch(getBlogs())
    }
  }
}

BlogList.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList);