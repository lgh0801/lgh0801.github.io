---
date: '2022-06-01'
title: 'fetch vs axios'
categories: ['http']
summary: 'http통신 비교하기'
thumbnail: './fetch&axiosthumbnail.png'
---

# fetch란?

ES6부터 들어온 JavaScript 내장 라이브러리입니다.

Promise 기반으로 만들어졌기 때문에 axios와 마찬가지로 데이터 다루기가 쉽고,

내장 라이브러리라는 장점으로 상당히 편리합니다.

## 장점

- 자바스크립트의 내장 라이브러리 이므로 별도로 import 할 필요가 없습니다.

- Promise 기반으로 만들어졌기 때문에 데이터 다루기 편리합니다.

- 내장 라이브러리이기 때문에 업데이트에 따른 에러 방지가 가능합니다.

## 단점

- 네트워크 에러 발생 시 response timeout이 없어 기다려야 합니다.

- JSON으로 변환해주는 과정 필요합니다.

- 상대적으로 axios에 비해 기능이 부족합니다.

- 지원하지 않는 브라우저가 존재합니다.

```javascript
fetch('https://localhost:3000/user/post', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: 'lgh123',
    description: 'hello world',
  }),
}).then(response => console.log(response))
```

# axios란?

axios는 Node.js와 브라우저를 위한 Promise API를 활용하는 HTTP 통신 라이브러리입니다.

비동기로 HTTP 통신을 할 수 있으며 return을 promise 객체로 해주기 때문에

response 데이터를 다루기 쉽습니다.

## 장점

- response timeout (fetch에는 없는 기능) 처리 방법이 존재합니다.

- Promise 기반으로 만들어졌기 때문에 데이터 다루기 편리합니다.

- fetch처럼 JSON.stringify과정이 필요없습니다.

- 브라우저 호환성이 뛰어납니다.

## 단점

- 사용을 위해 모듈 설치가 필요합니다. (npm install axios)

```javascript
// then 을 연속적으로 호출하는 예시
const TestApiCall = () {
  axios.get('https://test.com/api/v1')
    .then((response) => {
      const data = response.data;
      const userId = data.userId;
      axios.get('https://test2.com/api/v2/' + userId)
        .then((response) => {
          console.log("Response >>", response.data)
        })
        .catch(() => {
        })
    })
    .catch((error) => {
      console.log("Error >>", err);
    })
}
```

axios를 이용하여 API호출을 하는 경우 바로 응답이 오지 않기에 일반적으로 비동기 방식을 사용합니다.

axios 문서에서도 기본적으로 소개하는 사용방식은 Promise-then 방식의

비동기 호출방식을 소개하고 있습니다.

다만 then 방식의 경우도 api 호출이 복잡해지면 then을

then 내부에서건 또는 chain 형태로 연달아서 쓰는 경우는 발생합니다.

위와 같은 형태는 예시입니다. 다만 위와 같이 보기에 복잡(불편) 할 수 있는 코드가 나타날 수 있고,

js에서도 async/await 를 이용한 비동기 구문이 추가 되었기에 axios도 이를 지원하고 있습니다.

아래는 async/await 구문을 이용한 방식의 코드입니다.

다만 해당 구문에서는 에러처리를 try-catch 방식을 이용해서 작업해야 합니다.

```javascript
// async/await 를 활용하는 수정된 방식
const TestApiCall = async () {
  try {
    const response = await axios.get('https://test.com/api/v1')
    const userId = response.data.userId;
    const response2 = await axios.get('https://test2.com/api/v2/' + userId);
    console.log("response >>", response2.data)
  } catch(err) {
    console.log("Error >>", err);
  }
}
```

# 마치면서

장단점을 잘 비교해보고 사용해보시면 될 것 같습니다.

저는 Axios 사용이 좀 더 눈에 잘 들어오고 편했습니다.
