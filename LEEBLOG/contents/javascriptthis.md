---
date: '2022-02-27'
title: 'Javascript this'
categories: ['Javascript']
summary: 'Javascript this 간단하게 알아보기'
thumbnail: './jsthumbnail.png'
---

## 일반 함수에서 this 는 전역 객체인 window와 바인딩 된다.

```javascript
console.log(this)

//window{...}

function a() {
  console.log(this)
}

a()

//window{...}
```

## 메소드 안에서 this 는 메소드를 가지고 있는 오브젝트(객체)에 바인딩

```javascript
let x = {
  data: 'ka',
  y: function () {
    console.log(this)
  },
}

x.y()

// { data:"ka", y: f }
```

## 생성자 함수로 호출시 생성자 함수가 생성할 객체에 바인딩

```javascript
function Name(user) {
  this.user = user
  this.hi = 'hello'
  this.total = function () {
    console.log(this.user) //실행x
  }
}

let user = new Name('근두리')
console.log(user) //출력 : Name {user: '근두리', hi: 'hello', total: ƒ}
console.log(user.hi + ' ' + user.user) //출력 : hello 근두리
```

## this 화살표 함수

this값은 함수를 만날 때마다 바뀔 수 있기 때문에 본인이 원하는 this를

쓰기 힘든 경우가 발생할 수 있는데 그럴 때 화살표 함수를 로 사용하면

내부의 this를 새로 바꾸지 않기 때문에 의도에 맞게 사용할 수 있을 거 같다.

```javascript
let obj = {
  name: ['kim', 'lee'],
  func: function () {
    obj.name.forEach(() => {
      console.log(this)
    })
  },
}

obj.func()

//{name: Array(2), func: ƒ} * 2
```
