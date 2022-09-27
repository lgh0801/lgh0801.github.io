---
date: '2022-05-07'
title: 'Node.JS Express'
categories: ['Node.JS']
summary: 'Express.JS는 무엇인가'
thumbnail: './nodejsexpressthumbnail.png'
---

# express.js 란?

express.js의 정의는 'Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크'이다.

쉽게 말하면 node.js를 사용해서 어떤 기능을 구현할 때, 이를 쉽게 구현할 수 있도록 해준다는 말이다.

express.js는 node.js를 사용하기 위한 클래스와 라이브러리들의 집합으로 구성된다.

# express.js 설치방법

express.js 를 설치하기 위해선 node.js와 npm init을 통한 npm의 실행이 요구조건이다.

이 상황이 갖추어졌다면 다음의 명령어로 express.js를 설치해보자.

```javascript
 npm install express
```

# express.js 사용방법

express.js의 공식 홈페이지에 접속하면 아주 친절하게 설명되어 있다.

궁금하거나 모르는 부분이 생길 땐 공식 도큐먼트를 활용하는 습관을 길러야 한다.

```javascript
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
```

앱은 서버를 시작하며 3000번 포트에서 연결합니다.

앱은 루트 URL(/) 또는 라우트에 대한 요청에 “Hello World!”로 응답합니다.

다른 모든 경로에 대해서는 404 Not Found로 응답합니다.
