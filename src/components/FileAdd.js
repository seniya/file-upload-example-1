import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

//import firebase from 'firebase';
//import { fbConfig } from '../config';

import LinearProgress from '@material-ui/core/LinearProgress';
import nanoid from 'nanoid';

import { cloneDeep, remove } from 'lodash';

import firebase from '../service/firebase';


const baseStyle = {
  width: '100%',
  minHeight: 200,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5,
  padding: 5,
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #333333',
  marginBottom: 8,
  marginRight: 8,
  width: 80,
  height: 60,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
}

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const progressDiv = {
  width: '70px',
  height: '16px',
  position: 'absolute'
}

const removeDiv = {
  width: '70px',
  height: '16px',
  position: 'absolute',
  textAlign: 'center',
  marginTop: '30px',
  fontSize: '12px',
  fontWeight: '900',
  color: 'red'
}



class FileAdd extends Component {

  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      'uploading' : false,
      'items': []
    }    
  }

  handleReset = () => {
    this.setState({
      'uploading' : false,
      'items': []
    });
  }

  handleDownloadUrl = (downloadUrl, file) => {
    file.downloadUrl = downloadUrl;
    const newItems = cloneDeep(this.state.items);
    this.setState({
      'items': newItems
    });
  }

  handleProgress = (progress, file) => {
    file.progress = progress;
    const newItems = cloneDeep(this.state.items);
    this.setState({
      'items': newItems
    });
  }

  handleRemove = (e, file) => {
    e.preventDefault();

    const newItems = cloneDeep(this.state.items);
    remove(newItems, function(item) {
      return item.id === file.id
    });

    this.setState({
      'items': newItems
    });
  }

  onDrop = async (files) => {

    const { onChangeFile, onChangeCreatable } = this.props;

    onChangeCreatable(false);
    
    files.map(file => Object.assign(file, {
      'id' : nanoid(),
      'preview': URL.createObjectURL(file),
      'progress': 0,
      'onProgress': this.handleProgress,
      'downloadUrl': '',
      'onDownloadUrl': this.handleDownloadUrl,

    }));

    await this.setState((state) => ({ 
      'uploading' : true,
      'items' : [...state.items, ...files] 
    }));

    const storageRef = firebase.storage().ref();


    const uploaders = files.map(file => {

      const metadata = { contentType: 'image/jpeg' };

        const uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {

            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            file.onProgress(progress, file);
            
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: 
                //console.log('Upload is paused');
                break;
              case firebase.storage.TaskState.RUNNING: 
                //console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                //console.log('error.code : ', error.code);
                break;
              case 'storage/canceled':
                //console.log('error.code : ', error.code);
                break;
              case 'storage/unknown':
                //console.log('error.code : ', error.code);
                break;
            }
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              file.onDownloadUrl(downloadURL, file);
            });
          }
        );

        return uploadTask;
    });

    //console.log('uploaders : ', uploaders);

    Promise.all(uploaders).then((items) => {
        console.log('uploaders completed. items : ', items);

        this.setState((state) => ({ 
          'uploading' : false
        }));

        onChangeFile(this.state.items);
        onChangeCreatable(true);
    });
  }

  componentWillUnmount() {
    this.state.items.forEach(file => URL.revokeObjectURL(file.preview))
  }

  render() {

    const { items, uploading } = this.state;

    const thumbs = items.map(file => (            
      file !== null && file !== undefined ? (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img} />
            <div style={progressDiv}>
              <LinearProgress variant="determinate" value={file.progress} />
            </div>
            <div style={removeDiv}>
              <a onClick={ (e) => this.handleRemove(e, file) } >Remove</a>
            </div>
          </div>
        </div>
      ) : (
        <p>no item</p>
      )
      
    ));

    return (
      <Dropzone accept="image/*" onDrop={this.onDrop}>
        {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles, rejectedFiles }) => {
          let styles = {...baseStyle}
          styles = isDragActive ? {...styles, ...activeStyle} : styles
          styles = isDragReject ? {...styles, ...rejectStyle} : styles

          return (
            <div {...getRootProps()} style={styles}>
              <input {...getInputProps()} />
              <div>
                <span>{isDragAccept ? 'Drop' : 'Drag'} files here...</span>
                <span>({uploading ? '업로드중' : '대기'})</span>
              </div>
              {isDragReject && <div>Unsupported file type...</div>}

              {thumbs}

            </div>
          )
        }}
      </Dropzone>
    )
  }

}

export default FileAdd;