import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import LinearProgress from '@material-ui/core/LinearProgress';
import nanoid from 'nanoid';
import { cloneDeep, remove } from 'lodash';
import firebase from '../service/firebase';


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
            default:
              //console.log('Upload is ', snapshot.state);
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
            default:
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
    
    Promise.all(uploaders).then((items) => {
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
        <div className="thumb" key={file.name}>
          <div className="thumbInner">
            <img
              src={file.preview}
              className="img" 
              alt="preview"/>
            <div className="progressDiv">
              <LinearProgress variant="determinate" value={file.progress} />
            </div>
            <div className="removeDiv">
              <button onClick={ (e) => this.handleRemove(e, file) } >Remove</button>
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
          // let styles = {...baseStyle}
          // styles = isDragActive ? {...styles, ...activeStyle} : styles
          // styles = isDragReject ? {...styles, ...rejectStyle} : styles

          return (
            <div {...getRootProps()} className="baseStyle">
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