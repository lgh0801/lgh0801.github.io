---
date: '2022-03-12'
title: 'React Redux 정의'
categories: ['React']
summary: 'Redux 에 대해 알아보기'
thumbnail: './reactthumbnail.png'
---

## 리덕스 ( Redux ) 란

리덕스는 가장 사용률이 높은 상태관리 라이브러리로써

위에 언급한대로 리액트의 복잡한 컴포넌트 구조속에서 보다 간편하게

모든 컴포넌트들이 state 를 쉽게 공유할 수 있게 해주는 방식이다.

​
우선 리덕스는 리액트 내부에 있는 기술이 아니며 순수 HTML, JAVASCRIPT 내에서도 사용이 가능하다.

컴포넌트에 집중된 리액트와 시너지가 좋으니 대체적으로 리액트에 리덕스를 사용할 뿐이다.

​
리덕스에서 자주 사용되는 키워드들에 대해 설명하면,

## 액션 ( Action )

state 에 어떤 변화가 필요할 때 우린 액션이란 것을 발생시키며 이는 하나의 객체이다.

단어 그대로 어떤 동작에 대해 선언되어진 객체인 셈.

​
액션은 반드시 type 필드를 가지고 있어야 하며, 그 외의 값은 상황에 따라 넣어줄 수 있다.

type 필드는 쉽게 말해 어떤 동작인지를 표기한 지정표이다.

```javascript
// action 1
{
    type: "NUMBER_CNT"
},

// action 2
{
    type: "INPUT",
    text: "안녕"
}
```

## 액션 생성 함수 ( Action Creator )

이전에 설명한 Action 이 동작에 대해 선언된 객체라면,

Action Creator 는 이 Action 을 생성해 실제로 객체로 만들어주는 함수이다.

위 Action 중 action 1 예제의 Action 은 아래와 같은 Action Creator 를 통해 만들어 진다.

```javascript
export function numberCount(data) {
  return {
    type: 'NUMBER_CNT',
    number: data,
  }
}
```

## 리듀서 ( Reducer )

State 에 변화를 일으키는 함수이다. 쉽게 말해 위에 만들어진 Action 등의 일거리를 직접 수행하는 놈이다.

리듀서는 현재의 State 와 Action 을 인자로 받아 Store ( 스토어 ) 에 접근해 Action 에 맞춰 State 를 변경한다.

```javascript
function reducer(state, action) {
  switch (action.type) {
    case 'NUMBER_COUNT':
      return state + 1
    case 'INPUT':
      return state
    default:
      return state
  }
}
```

## 스토어 ( Store )

스토어는 현재 앱의 State 와 Reducer 함수, 그리고 몇 가지 내장 함수등을 가지고 있다.

스토어는 State 를 수시로 확인해 View 한테 변경된 사항을 알려주는 녀석이라 생각하면 된다.

## 디스패치 ( dispatch )

디스패치는 스토어의 내장 함수 중 하나로 리듀서에게 Action 을 발생하라고 시키는 것이라고 이해하면 된다.

ispatch 함수는 dispatch(action) 이런 식으로 Action 을 인자로 넘긴다.

이렇게 호출을 하면 스토어가 리듀서 함수를 실행해 리듀서 함수가 넘긴 액션을 처리해 새로운 상태를 만들어 준다.

## 구독 ( subscribe )

구독 또한 스토어의 내장 함수 중 하나로 함수 형태의 값을 인자로 받는데,

액션이 디스패치 될 때 마다 전달해준 함수를 호출한다.

유X브 의 구독을 예로 들면 구독하기를 눌린 BJ 의 글이 올라올 때 알림이 뜨는데 이는 이를 계속 주시하고 있기 때문이다.

이처럼 subscribe 도 스토어를 주시하고 있다가 디스패치 될 때 함수를 호출한다는 뜻이다.
