---
date: '2022-05-11'
title: 'React18'
categories: ['React']
summary: '달라진 주요 기능'
thumbnail: './reactthumbnail.png'
---

## React 18

React v18.0이 정식 릴리즈가 되었습니다.

아래에서 업데이트된 React v18 주요 기능들을 알아보겠습니다.

## Automatic Batching (자동 배칭)

```javascript
const App = () => {
  const [count, setCount] = useState(0)
  const [flag, setFlag] = useState(false)

  const handleClick = () => {
    setCount(count => count + 1) // 아직 리렌더링 되지 않습니다.
    setFlag(flag => !flag) // 아직 리렌더링 되지 않습니다.
    // 리액트는 오직 마지막에만 리렌더링을 한 번 수행합니다. (배치 적용)
  }

  return (
    <div>
      <button onClick={handleClick}>Next</button>
      <h1 style={{ color: flag ? 'blue' : 'black' }}>{count}</h1>
    </div>
  )
}
```

React는 배치를 수행해서 두 번의 setState를 한 번의 리렌더링으로

처리하며 효율성과 안정성을 보장합니다.

#### flushSync

만약, 자동 배칭을 원하지 않는다면, flushSync() 로

setter 함수를 감싸 별도의 리렌더링을 유발하면 됩니다.

```javascript
import { flushSync } from 'react-dom'

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1)
  }) // 리액트는 즉시 DOM을 업데이트합니다.

  flushSync(() => {
    setFlag(f => !f)
  }) // 리액트는 즉시 DOM을 업데이트합니다.
}
```

## Concurrent Features (동시성 기능)

동시성 기능은 React가 추진하고 있는 차기 핵심 기능입니다.

Javascript는 싱글 스레드(single-threaded) 언어로 하나의 코드가 끝나야 다음 코드가 실행됩니다.

React 역시 같은 원리로 동작하며, 특히 UI 렌더링 도중에는 다른 작업이 진행되지 않기 때문에

DOM Tree가 거대한 경우 조작과 표현의 간극이 발생할 수 있습니다.

동시성 기능은 이러한 큰 작업을 작은 여러개의 독립적인 작업으로 나누는 프로그래밍 구조로,

싱글 스레드의 단점을 보완하는 솔루션입니다.

동시성 기능을 이해하기 위해, 먼저 2가지 상태 업데이트의 분류를 이해해야 합니다.

- 긴급 업데이트: 직접적인 상호작용 반영 (타이핑, 호버, 스크롤) 업데이트가 즉각적인 대상

- 전환 업데이트: 하나의 뷰에서 다른 뷰로 UI 전환. 상태값 변화 모든 업데이트가 뷰에 즉시 반영되지 않아도 됨.

예를들면 검색창이 좋은 예시입니다.

input 필드의 경우, 키 입력이 올바르게 된 것을 즉각적으로

보여줘야 하는 긴급 업데이트 영역입니다..

반면, 하단 자동완성 리스트는 입력값에 따라 내용이 뒤늦게 바뀌어도

되는 전환 업데이트 영역입니다.

기존에는 전환 업데이트를 setTimeout같은 함수로 우회하였지만

React 18부터는 이를 지원하는 Hooks등을 제공함으로써

전환 업데이트를 명시적으로 구분하여 상태 업데이트를 할 수 있습니다.

- startTransition: 상태 업데이트를 전환 업데이트로 반영하는 메서드

- useTransition: 전환 업데이트를 지원하며, startTransition() Hooks와 더불어 트랜지션 상태를 지원

- useDeferredValue: 렌더링 우선순위가 낮은 상태값의 업데이트를 지연시키는 메서드

## 서스펜스(Suspense)를 지원하는 새로운 서버 사이드 렌더링 아키텍처

React18에서는 새로운 서버 사이드 렌더링(이하 SSR) 아키텍처가 적용되었다.

새롭게 pipeToNodeWritable API가 추가 되었고,

이 API를 사용하면 SSR을 통해 Suspense를 사용할 수 있게 되었습니다.

React.lazy는 동적 import를 통해 컴포넌트를 렌더링하며,

이를 lazy 컴포넌트 라고 합니다.

lazy 컴포넌트를 사용하는 주된 이유는 페이지의 무게가 줄어들어

초기 페이지 로드 시간이 빨라집니다.

```javascript
import { lazy } from 'react'

const Comments = lazy(() => import('./Comments.js'))

<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

서버단에서 HTML 스트리밍을 담당하는 기존의 renderToString() 대신,

새로운 렌더링 API인 pipeToNodeWritable 덕분에,

Suspense와 함께 lazy 컴포넌트를 사용할 수 있게 되어 앱을

현재 리액트 생태계의 주류 환경인 웹팩 기반의 애플리케이션에서,

lazy 컴포넌트를 사용하면 코드 스플리팅(Code Splitting)이 적용되어

별도의 자바스크립트 Chunk 파일로 분리됩니다.
