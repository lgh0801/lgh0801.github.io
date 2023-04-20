---
date: '2022-09-29'
title: 'React.memo/useMemo'
categories: ['React']
summary: 'React.memo과 useMemo 알아보기'
thumbnail: './reactthumbnail.png'
---

## 최적화와 메모이제이션

웹 페이지 하나가 만들어질 때는 DOM Tree의 구성, 레이아웃 잡기,

페인팅하기 등의 다양한 작업이 이뤄집니다.

업데이트 상황이 오면 컴포넌트를 다시 랜더링하고,

그때 레이아웃 및 페인팅 과정을 또 계산해야 하는 경우가 많습니다.

그래서 React의 성능을 점검할 때는 컴포넌트 자체의

리랜더링이 불필요하게 반복되고 있지 않은지와

내부 로직이 쓸데없이 다시 만들어지거나 복잡한 계산을 반복하는지를 생각해야 합니다.

React의 최적화에서는 메모이제이션(Memoization)이라고 부르는 개념을 활용합니다.

이 Memoization은 Caching의 일종이라고 볼 수 있습니다.

Memoization은 특정 함수가 동작하고 반환된 그 결과물을 캐싱하는 경우를 말합니다.

## React.memo

첫 번째는 컴포넌트 자체를 메모이제이션하는 React.memo입니다.

```javascript
const App = () => {
  const [state, setState] = useState(0)
  return (
    <>
      <p>state</p>
      <button onClick={() => setState(state + 1)}>click</button>
      <Memo str={'올라!'} />
    </>
  )
}
//...
const Memo = str => {
  return <div>{str}</div>
}
```

이렇게 하면 버튼을 클릭할 때마다 state 가 업데이트되면서 App 이 리랜더링됩니다.

당연하게도 그 하위 컴포넌트들도 리랜더링이 될 수 밖에 없습니다.

Memo 는 어떤 상태에 의해 변하는 녀석이 아님에도 리랜더링이 되게 됩니다.

만약 뭔가 계산이 필요한 컴포넌트라면 이런 현상이 좋을 리가 없습니다.

이럴 때 React.memo를 사용할 수 있습니다.

```javascript
const App = () => {
  const [state, setState] = useState(0)
  return (
    <>
      <p>state</p>
      <button onClick={() => setState(state + 1)}>click</button>
      <Memo str={'안녕!'} />
    </>
  )
}
//...
const Memo = str => {
  return <div>{str}</div>
}
export default React.memo(Memo)
```

이런 식으로 React.memo로 한번 감싸주면 App 이 리랜더링되더라도

Memo 는 딱히 리랜더링되지 않게 됩니다.

React.memo를 사용하면 어떤 컴포넌트를 어떤 Props와 함께 불렀는지 기록하고,

같은 경우에는 이전에 기록해둔 컴포넌트 결과값을 반환합니다.

React.memo는 한 컴포넌트를 같은 프로퍼티로 리랜더링하는 경우가 빈번할 때 사용해야 합니다.

## useMemo

컴포넌트에 적용할 수 있는 React.memo와 달리,

복잡한 계산의 결과 값을 Memoization해 최적화하기 위한 useMemo Hook이 있습니다.

Hook이니까 함수형 컴포넌트 내에서만 사용할 수 있습니다.

```javascript
const App = () => {
  const items = useState([]);
  const convertedItems = useMemo(
    items.map(el => {
      ...el,
      additionalData: HardCalc(el)
    }, [items])
  )
  //...
}
```

useMemo 에는 두 개의 인자가 들어갑니다.

첫 번째 인자는 우리가 구동하기 원하는 함수를 하나 넣으면 됩니다.

위에서는 items 에 들어있는 데이터를 변환해주는 함수를 만들었습니다.

두 번째 인자는 useEffect 를 사용할 때처럼 deps를 설정할 수 있습니다.

여기서는 items 인데, items 가 변경될 때만 첫 번째 인자에 들어있는 함수를 동작시킵니다.

useMemo 라는 함수와, 그 프로퍼티인 items 값이 뭐가 들어오는지 확인하고,

처음보는 값이면 첫 번째 인자의 함수를 구동해 그 값을 기록합니다.

만약 이전에 본 값이면 계산은 생략하고 전에 기록해둔 값을

돌려주는 방식으로 복잡한 계산을 줄일 수 있습니다.
