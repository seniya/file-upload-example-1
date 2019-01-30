
# REACT - FIREBASE, DROPZONE 연동 예제

React.js 환경 내에서 **firebase** 와 **redux-dropzone**를 이용한 업로드 서비스 구성방법을 설명한다.
기존에 구성한 **[REACT - REDUX/SAGA, FIREBASE 연동 예제](https://github.com/seniya/firebase-example-1)** 바탕으로 업로드 서비스를 추가 구현한다.

## Sample mage
![데모 화면](https://raw.githubusercontent.com/seniya/file-upload-example-1/master/src/assets/file-upload-example-1.PNG)



## Dropzone.js

DropzoneJS is an open source library that provides drag’n’drop file uploads with image previews.

## react-dropzone

Simple HTML5-compliant drag'n'drop zone for files built with **React.js**.

## Firebase

1. 클라우드 데이터베이스 서비스 및 기능 제공
2. Stroge Service 제공
- **firebase** javascript 모듈 이용. (서비스 인증 및 통신, 기능 역할)


## 고민해볼 문제

- **firebase** 인증 및 전역 사용(singletone??)
- 실제 서버로의 업로드 시점을 drag'n'drop 시 시작할 것인지, [Add Post] 버튼 이벤트 시 시작할 것인지.
- 업로드(개별 또는 전체) 일시정지,재시작,취소 이벤트 처리 필요.
- 메소드(이벤트) 중심이 아닌 상태중심의 코드전략 필요.
- 코드 리펙토링..


## 폴더 구조
```
project
│ README.md
└───public 
└───src
|   │ index.js
|   │ App.js
│   └───components
│   └───pages
│   └───service
|      └───actions
|      └───reducers
|      └───sagas
```


## Available Scripts

1. npm install
2. yarn start


## Learn More
- Firebase 공식 사이트 : [Google Firebase](https://console.firebase.google.com/)
- Firebase 공식 문서  : [웹에서 파일 업로드](https://firebase.google.com/docs/storage/web/upload-files?hl=ko)
- 참고 : [Firebase Storage With AngularFire - DropZone File Uploader](https://angularfirebase.com/lessons/firebase-storage-with-angularfire-dropzone-file-uploader/)
- 참고 : [Upload Files to Firebase Storage with JavaScript](https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/)
