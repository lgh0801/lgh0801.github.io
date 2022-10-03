---
date: '2022-05-14'
title: 'React ref로 HTML 접근'
categories: ['React']
summary: 'ref로 HTML 엘리먼트에 접근/제어'
thumbnail: './reactthumbnail.png'
---

## ref prop

React로 웹 애플리케이션을 개발하다 보면 간혹 React 컴포넌트가 아닌

HTML 엘리먼트에 직접 접근해서 DOM API를 이용해서 제어해야 할 필요가 있습니다.

이럴 때 유용하게 사용할 수 있는 React의 prop인 ref 에 대해서 알아보도록 하겠습니다.

React의 ref prop은 HTML 엘리먼트의 레퍼런스를 변수에 저장하기 위해서 사용합니다.

예를 들어, 다음과 같이 input 엘리먼트에 ref prop으로 inputRef라는 변수를 넘기게 되면,

우리는 이 inputRef 객체의 current 속성을 통해서 input 엘리먼트에 접근할 수 있고,

DOM API를 이용하여 제어할 수 있습니다.

```html
<input ref="{inputRef}" />
```

## useRef

ref prop에는 React API를 이용해서 생성한 current 속성을 갖는 특정 형태의 객체만을 할당할 수 있는데요.

클래스 기반 컴포넌트를 에서는 React.createRef() 함수를,

함수형 컴포넌트에서는 useRef() 훅(hook) 함수를 사용하여 이 객체를 생성할 수 있습니다.

함수형 컴포넌트를 선호하는 최근 트랜드에 맞게 useRef() 훅(hook) 함수를

사용하여 예제 코드를 작성하겠습니다.

## EX) input 엘리먼트 제어

ref prop은 여러가지 HTML 엘리먼트 중에서도 input을 제어할 때 많이 사용됩니다.

예를 들어, 버튼을 클릭했을 때, 비활성화(disabled)되어 있던 입력란을 활성화시키며

포커스(focus)를 이동시키는 React 컴포넌트를 작성해보겠습니다.

useRef() 훅(hook) 함수를 사용하여 inputRef 객체를 생성한 후, input 엘리먼트의 ref prop에 넘기고 있습니다.

이렇게 해주면 inputRef 객체의 current 속성에는 input 엘리먼트의 레퍼런스가 저장됩니다.

따라서 button 엘리먼트의 클릭(click) 이벤트 핸들러에서는 inputRef.current로

간단하게 input 엘리먼트를 제어할 수 있습니다.

```javascript
import React, { useRef } from 'react'

function Field() {
  const inputRef = useRef(null)

  function handleActive() {
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  return (
    <>
      <input disabled type="text" ref={inputRef} />
      <button onClick={handleActivation}>Activation</button>
    </>
  )
}
```

마찬가지 방법으로 입력란을 원래대로 비활성화 시켜주는 버튼도 어렵지 않게 추가로 구현할 수 있습니다.

```javascript
import React, { useRef } from 'react'

function Field() {
  const inputRef = useRef(null)

  function handleActivation() {
    inputRef.current.disabled = false
    inputRef.current.focus()
  }

  function handleReset() {
    inputRef.current.disabled = true
    inputRef.current.value = ''
  }

  return (
    <>
      <input disabled type="text" ref={inputRef} />
      <button onClick={handleActivation}>Activation</button>
      <button onClick={handleReset}>Reset</button>
    </>
  )
}
```

## 왜 ref로 접근해야하는가?

react는 HTML 엘리먼트에 접근할때 querySelector같은 DOM API로 접근을해도 동작합니다.

하지만 ref는 특정 DOM 요소를 가져올 때 더 신뢰할 수 있습니다.

예측하지 못한 상황(대개는 라이프사이클의 흐름을 예측하지 못한 상황)으로

DOM 요소를 가져오지 못한다면 이는 해당 코드가 포함된 로직에 따라 큰 결함으로 이어질 수 있을 것입니다.

DOM 요소를 특정할 수 있도록 관심 영역을 특정 컴포넌트로 제한하는 역할도 ref가 할 수 있습니다.

## 마치면서

이상으로 React에서 ref prop를 사용하여 어떻게 HTML 엘리먼트에

직접 접근할 수 있는지에 대해서 알아보았습니다.
