---
date: '2022-03-09'
title: '게시판 에디터'
categories: ['React']
summary: 'react-quill 사용하여 에디터 구현'
thumbnail: './reactthumbnail.png'
---

## 게시판 에디터

ToyProject를 진행하는중에 게시판 글에 에디터기능을 삽입하고자

에디터 라이브러리인 react-quill를 사용하기로 하였습니다.

다행히 참고할 자료들이 많아서 어렵지 않게 구현이 가능했습니다.

1. react-quill install

```javascript
$ npm install react-quill
```

참고로 게시판을 눌러 상세정보 부분(View)은

함수형 컴포넌트인 Hook방식을 사용하지않고

클래스형 컴포넌트를 사용하여 구현하였습니다.

처음 프로젝트를 공부하고 만들때 클래스형 컴포넌트로 했어가지고...

다른 부분이나 새로만드는 컴포넌트 부분은 Hook방식으로 다 수정하거나 만들었지만

View부분은 나중에 시간여유가 많을때

수정하기로해서 그냥 클래스형 컴포넌트로 진행을 하였습니다.

아래에서 보여주는 소스는 react-quill를 사용하여

ToyProject에 적용한 react-quill와 관련된 일부 코드 부분만을

추출하거나 수정해서 가져온겁니다.

글을 쓸때와 쓰지않을때 react-quill를 분리했습니다.

1. 글쓰기 react-quill 코드

```javascript
//View.js
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class View extends Component {
  constructor(props) {
    this.state = {
      //...
      selectedFile: null,
      text: '',
    }
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.quillRef = null
  }
  EditorAppend1 = () => {
    //이미지 업로드
    const handlePostImage = () => {
      const input = document.createElement('input')
      input.setAttribute('type', 'file')
      input.setAttribute('accept', 'image/*')
      input.click()
      input.addEventListener('change', async () => {
        this.setState({ selectedFile: input.files[0] })
        const formData = new FormData()
        formData.append('file', this.state.selectedFile)
        return axios
          .post('/api/upload?type=uploads/image/', formData)
          .then(res => {
            this.setState({ fileName: res.data.filename })
            const IMG_URL = '/image/' + this.state.fileName
            const editor = this.quillRef.getEditor()
            const range = editor.getSelection() // 현재 에디터 커서 위치값
            editor.insertEmbed(range.index, 'image', IMG_URL) // 가져온 위치에 이미지 삽입
          })
          .catch(error => {
            alert('작업중 오류가 발생하였습니다.')
          })
      })
    }
    //quill 에디터
    this.modules = {
      syntax: true,
      toolbar: {
        container: [
          ['link', 'image', 'code-block'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'list', 'blockquote'],
        ],
        handlers: {
          // 이미지 처리는 직접 handlePostImage라는 함수로 처리
          image: handlePostImage,
        },
      },
    }
    // 위에서 설정한 모듈들 foramts을 설정
    this.formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'list',
      'blockquote',
      'image',
      'link',
      'code-block',
    ]

    return (
      <td key={this.state.before_swtcode} style={{ height: '600px' }}>
        <ReactQuill
          ref={ref => (this.quillRef = ref)}
          style={{ height: '600px' }}
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
      </td>
    )
  }
}
```

2.  글을 쓰지않을때 react-quill 코드

```javascript
//View.js
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

class View extends Component {
  constructor(props) {
    this.state = {
      //...
      text: '',
    }
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.quillRef = null
  }
  EditorAppend2 = () => {
    //quill 에디터
    this.modules = {
      syntax: true,
      toolbar: false,
    }
    // 위에서 설정한 모듈들 foramts을 설정 list -> strike 변경
    this.formats = [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'image',
      'link',
      'code-block',
    ]
    return (
      <td key={this.state.before_swtcode} style={{ height: '600px' }}>
        <ReactQuill
          ref={ref => (this.quillRef = ref)}
          style={{ height: '600px' }}
          readOnly
          theme="snow"
          value={this.state.text}
          onChange={this.handleChange}
          modules={this.modules}
          formats={this.formats}
        />
      </td>
    )
  }
}
```

에디터에서 글쓰기 부분 이미지 업로드처리를 할때

modules >> handlers >> image 부분에 함수를 넣어서

따로 작업하였습니다.

서버쪽은 파일 업로드를 구현하였던 코드를 그대로 사용하였습니다.

```javascript
//fileupload.js
const multer = require('multer') //파일 업로드를 위해 multer 패키지를 불러옵니다.
const moment = require('moment') //파일명에 현재 시간을 할당하기위해, 시간 정보를 불러오는 moment 패키지를 불러옵니다.

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //파일 저장 경로를 지정하기위해 destination 함수를 싱행합니다.
    //이때 파라미터로 react서버에서 전달받은 request와 file정보를 받습니다.
    //request에는 텍스트 변수들이, file에는 업로드한 정보가 들어있습니다.
    //cb함수는 multer내부적으로 사용되는 함수이니, 정해진 규칙처럼 사용하시면 됩니다.
    try {
      var type = req.query.type //react에서 전달받은 type파라미터를, 내부변수 type에 할당합니다.
      cb(null, type) //type에는 폴더 상대경로를 넣어왔는데요. cb함수의 두번째 파라미터로 경로값을 넣습니다.
    } catch (error) {
      console.log(error)
    }
  },
  filename: function (req, file, cb) {
    //저장될 파일명을 지정하기위해 filename함수를 실행합니다.
    //이때 파라미터로 react서버에서 전달받은 request와 file정보를 받습니다.
    cb(null, moment().format('YYYYMMDDHHmmss') + '_' + file.originalname)
    //cb(null, file.originalname);
    //moment함수로 현재시간을 연부터 초까지 추출해, 원본파일명 앞에 붙여줍니다.
  },
})

const upload = multer({ storage: storage }).single('file')
//line4에서 diskStorage함수의 결과로 저장된 storage변수를, multer의 내부 storage변수에 저장합니다.
//파일이 하나이니 single('file')함수도 붙여줍니다.
module.exports = upload
```
