---
date: '2022-09-01'
title: '컨텍스트/호이스팅'
categories: ['Javascript']
summary: '컨텍스트/호이스팅 개념'
thumbnail: './jsthumbnail.png'
---

## 실행 컨텍스트

실행할 코드에 제공할 환경 정보들을 모아놓은 객체를 실행 컨텍스트라고 정의합니다.

```javascript
const name = 'hyeok'
function wow(word) {
  console.log(word + ' ' + name)
}
function say() {
  const name = 'mina'
  console.log(name)
  wow('hello')
}
say()
```

위 코드에 결과는 mina / hello hyeok 입니다.

일단 처음 코드를 실행하는 순간 모든 것을 포함하는 전역 컨텍스트가 생깁니다.

모든 것을 관리하는 환경입니다. 페이지가 종료될 때까지 유지됩니다.

전역 컨텍스트 말고도 함수 컨텍스트가 있습니다.

함수를 호출할 때마다 함수 컨텍스트가 하나씩 더 생깁니다.

컨텍스트는 원칙 네 가지가 있습니다.

1. 먼저 전역 컨텍스트 하나 생성 후, 함수 호출 시마다 컨텍스트가 생깁니다.

2. 컨텍스트 생성 시 컨텍스트 안에 변수객체(arguments, variable), scope chain, this가 생성됩니다.

3. 컨텍스트 생성 후 함수가 실행되는데, 사용되는 변수들은 변수 객체 안에서 값을 찾고,
   없다면 스코프 체인을 따라 올라가며 찾습니다.

4. 함수 실행이 마무리되면 해당 컨텍스트는 사라집니다.
   페이지가 종료되면 전역 컨텍스트가 사라집니다.

## 호이스팅

호이스팅이란 변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상을 의미합니다.

아래처럼 sayHo처럼 함수 표현식이 아니라 함수 선언식일 때는 식 자체가 통째로 끌어올려집니다.

```javascript
console.log(hyeok) // 에러가 아니라 undefined
sayWow() // 정상적으로 wow
function sayHo() {
  console.log('ha')
}
var hyeok = 'hyeok'
```

위의 코드는 선언보다 호출을 먼저 하기 때문에 얼핏 보기에 말이 안 되는 것처럼 보입니다.

하지만 에러 없이 정상 작동합니다.

변수 선언과 함수 선언식이 최상단으로 끌어올려졌기 때문입니다.

하지만 같은 함수여도 함수 표현식으로 선언한 경우에는 에러가 발생합니다. 아래 예시를 보시죠.

```javascript
sayWow()
saySiu() // 대입되기 전에 호출해서 에러
var saySiu = function () {
  console.log('yeah')
}
function sayWow() {
  //선언과 동시에 초기화(호이스팅)
  console.log('wow')
}
```

결론을 내자면 함수 표현식/화살표 함수는 호이스팅이 발생하지않는다.

또 let,const도 호이스팅이 발생하지 않는다고 생각하지만

호이스팅은 발생하지만 TDZ(Temporal Dead Zone)에 의해 ReferenceError가 발생한다.
