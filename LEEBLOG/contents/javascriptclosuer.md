---
date: '2022-09-03'
title: '클로저'
categories: ['Javascript']
summary: 클로저의 개념'
thumbnail: './jsthumbnail.png'
---

## 클로저

클로저는 자바스크립트 고유의 개념이 아니라 함수를 일급 객체로 취급하는

함수형 프로그래밍 언어에서 사용되는 중요한 특성입니다.

클로저에 대해 MDN은 아래와 같이 정의하고 있습니다.

클로저는 함수와 그 함수가 선언됐을 때의 렉시컬 환경(Lexical environment)과의 조합이다.

```javascript
function outerFunc() {
  var x = 10
  var innerFunc = function () {
    console.log(x)
  }
  innerFunc()
}

outerFunc() // 10
```

함수 outerFunc 내에서 내부함수 innerFunc가 선언되고 호출되었습니다.

이때 내부함수 innerFunc는 자신을 포함하고 있는 외부함수 outerFunc의 변수 x에 접근할 수 있습니다.

이는 함수 innerFunc가 함수 outerFunc의 내부에 선언되었기 때문입니다.

함수 innerFunc가 함수 outerFunc의 내부에 선언된 내부함수이므로

자신이 속한 렉시컬 스코프(전역, 함수 outerFunc, 자신의 스코프)를 참조할 수 있습니다.

innerFunc 함수 스코프(함수 자신의 스코프를 가리키는 활성 객체) 내에서

변수 x를 검색하면 검색이 실패합니다.

innerFunc 함수를 포함하는 외부 함수 outerFunc의 스코프

(함수 outerFunc의 스코프를 가리키는 함수 outerFunc의 활성 객체)에서

변수 x를 검색하면 검색이 성공합니다.

이번에는 내부함수 innerFunc를 함수 outerFunc 내에서 호출하는 것이 아니라 반환 예제를 보겠습니다.

```javascript
function outerFunc() {
  var x = 10
  var innerFunc = function () {
    console.log(x)
  }
  return innerFunc
}

/**
 *  함수 outerFunc를 호출하면 내부 함수 innerFunc가 반환됩니다.
 *  그리고 함수 outerFunc의 실행 컨텍스트는 소멸합니다.
 */
var inner = outerFunc()
inner() // 10
```

함수 outerFunc는 내부함수 innerFunc를 반환하고 생을 마감했습니다.

즉, 함수 outerFunc는 실행된 이후 콜스택(실행 컨텍스트 스택)에서 제거되었으므로

함수 outerFunc의 변수 x 또한 더이상 유효하지 않게 되어 변수 x에

접근할 수 있는 방법은 달리 없어 보입니다.

그러나 위 코드의 실행 결과는 변수 x의 값인 10입니다.

이미 종료되어 실행 컨텍스트 스택에서 제거된 함수 outerFunc의 지역변수 x가 동작하고 있습니다.

이처럼 자신을 포함하고 있는 외부함수보다 내부함수가 더 오래 유지되는 경우,

외부 함수 밖에서 내부함수가 호출되더라도 외부함수의 지역 변수에 접근할 수 있는데

이러한 함수를 클로저(Closure)라고 부릅니다.

클로저는 반환된 내부함수가 자신이 선언됐을 때의 환경(Lexical environment)인

스코프를 기억하여 자신이 선언됐을 때의 환경(스코프) 밖에서 호출되어도

그 환경(스코프)에 접근할 수 있는 함수를 말합니다.

이를 조금 더 간단히 말하면 클로저는 자신이 생성될 때의

환경(Lexical environment)을 기억하는 함수다라고 말할 수 있겠습니다.
