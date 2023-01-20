---
date: '2022-04-22'
title: 'Callback/Promise/async await'
categories: ['Javascript']
summary: 'Callback지옥을 방지하는법'
thumbnail: './jsthumbnail.png'
---

## Callback 함수

Callback 함수란 함수의 파라미터로 함수를 넣어 다음 함수로 실행 시키는것입니다.

```javascript
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1
    console.log(increased)
    if (callback) {
      callback(increased)
    }
  }, 1000)
}

increaseAndPrint(0, n => {
  console.log('End') //결과 : 1, 'End'
})
```

## Callback 지옥

Callback함수에 Callback함수를 계속 넣어 함수를 실행 시키는 것입니다.

성능 저하의 가장 큰 원인이자 복잡한 구조로 만듭니다.

```javascript
function increaseAndPrint(n, callback) {
  setTimeout(() => {
    const increased = n + 1
    console.log(increased)
    if (callback) {
      callback(increased)
    }
  }, 1000)
}

increaseAndPrint(0, n => {
  increaseAndPrint(n, n => {
    increaseAndPrint(n, n => {
      increaseAndPrint(n, n => {
        increaseAndPrint(n, n => {
          console.log('End') // 출력 결과 : 1,2,3,4,5,'End'
        })
      })
    })
  })
})
```

위와 같은 Callback 지옥을 해결하고자 Promise 함수를 사용합니다.

## Promise

Promise는 성공(resolve)할 수 있고 실패(reject)할 수 있다.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('resolve')
  }, 1000)
})

myPromise.then(result => {
  console.log(result) //결과 : 'resolve'
})
```

위와 같이 성공을 하면 resolve함수를 사용하고 promise.then 구문을 통해서 다음 실행할 함수를 설정합니다.

```javascript
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error())
  }, 1000)
})

myPromise.catch(e => {
  console.error(e) // 결과 : Error
})
```

위와 같이 실패를 할 땐 reject함수를 사용하고 promise.catch 구문을 통해서 다음 실행할 함수를 설정합니다.

아래의 예시에서는 Callback과의 차이를 명확히 알 수 있습니다.

```javascript
function increaseAndPrint(n) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const value = n + 1
      if (value === 5) {
        const error = new Error()
        error.name = 'ValueIsFiveError'
        reject(error)
        return
      }
      console.log(value)
      resolve(value)
    }, 1000)
  })
}

increaseAndPrint(0)
  .then(n => {
    return increaseAndPrint(n)
  })
  .then(n => {
    return increaseAndPrint(n) //결과 : 1,2
  })
```

위의 then 구문을 보면 Callback 과는 달리 Promise 객체를 리턴해 주면 다시 then 구문을 사용할 수 있습니다.

이런 장점으로 인해 코드가 훨씬 정리됩니다.

그러나 Promise역시 then 구문으로 계속 이어가고 catch구문도 섞이다 보니

언제 에러가 났는지와 코드 분기 작업하기가 어려워 집니다.

이러한 단점을 보안하기 위해 나온것이 바로 async await 입니다.

## async await

함수 앞에 async를 붙이고 함수 안에서 작동하는 Promise 객체에 then 대신 await을 붙입니다.

async 함수의 return 값은 Promise 입니다.

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function process() {
  console.log('안녕하세요')
  await sleep(1000)
  console.log('반갑습니다')
  return true
}

process().then(value => {
  console.log(value) //결과 'true'
})
```

then 대신 await을 붙임으로써 분기점 잡기가 쉬워졌고 그 사이에 로직을 작성하기도 편리한 구조가 되었습니다.

async 함수의 return 값은 Promise이므로 위의 예제에의 return 값(true)을

then을 이용해서 Promise 처리할 수 있습니다.

또한, 아래의 예제를 통해 언제 에러가 났는지 try - catch 구문으로 알 수 있습니다.

```javascript
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
async function makeError() {
  await sleep(1000)
  const error = new Error()
  throw error //throw를 이용해서 Error를 던진다.
}
async function process() {
  try {
    await makeError()
  } catch (e) {
    console.error(e)
  }
}

process()
```
