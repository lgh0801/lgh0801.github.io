---
date: '2022-03-24'
title: 'React Redux 사용&적용'
categories: ['React']
summary: 'Redux 직접 사용해보자'
thumbnail: './reactthumbnail.png'
---

## src/index.js

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './modules'
import { composeWithDevTools } from 'redux-devtools-extension'

// rootReducer 를 가진 Store 생성
const store = createStore(rootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
```

제일 먼저 index.js 에서 createStore 함수를 이용해 Store 를 만들었다.

이 때 rootReducer 라는 모듈을 포함시켰는데 rootReducer 파일로 가보면

## src/module/index.js

```javascript
import { combineReducers } from 'redux'
import counter from './counter'
import working from './working'

const rootReducer = combineReducers({
  counter,
  working,
})

export default rootReducer
```

combineReducers 함수로 counter 모듈과 working 모듈을 하나의 모듈로 합쳐,

rootReducer 라는 이름으로 export 시켜주고 있는걸 알 수 있다.

​
그렇기에 src/index.js 에서 rootReducer 로 호출하면

src/index.js 에 만들어진 Store 에는 counter 모듈과 working 모듈이 들어있는거다.

​
현 게시글에선 combineReducers 함수의 사용 예만 보기위해

working 모듈은 사용하지않고 counter 모듈만 사용했다.
​

## src/module/counter.js

```javascript
// Action type ( 액션 타입 )
const SET_DIFF = 'counter/SET_DIFF'
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'

// Action Creator Function ( 액션 생성 함수 )
export const setDiff = diff => ({ type: SET_DIFF, diff })
export const increase = () => ({ type: INCREASE })
export const decrease = () => ({ type: DECREASE })

// init State ( 초기 상태 )
const initialState = {
  number: 0,
  diff: 1,
}

// Reducer function ( 리듀서 함수 )
export default function counter(state = initialState, action) {
  switch (action.type) {
    case SET_DIFF:
      return {
        ...state,
        diff: action.diff,
      }
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      }
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      }
    default:
      return state
  }
}
```

잘 보면 액션과 액션생성함수, 리듀서 함수가 한 파일에 들어가 있다.

​
이는 어떤 동작에 관련되어진 액션과 액션생성함수, 리듀서 함수를 각각 다른 파일로 나누는 것이 아닌

하나로 합쳐 만드는 Ducks 패턴으로 작성된 모듈이다. 꼭 이렇게 할 필요는 없다.

Ducks 패턴으로 작성할 때는 위처럼 type 앞에 구분자를 넣어주어

모듈간 중복상황이 일어나지 않게 해줘야 한다.

## src/index.js

다시 src/index.js 파일로 돌아와서

```javascript
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
serviceWorker.unregister()
```

Provider 는 react-rudex 의 기능 중 하나로 하위 컴포넌트들에게 공급해주는 역할을 하는 녀석이다.
​
로드해온 스토어의 상태등을 하위의 App 컴포넌트에 전달하며 렌더링한다.

## src/App.js

```javascript
import React from 'react'
import CounterContainer from './containers/CounterContainer'

function App() {
  return (
    <div>
      <CounterContainer />
    </div>
  )
}

export default App
```

CounterContainer 컴포넌트를 렌더링하려 한다.

## src/containers/CounterContainer.js

```javascript
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Counter from '../components/Counter'
import { increase, decrease, setDiff } from '../modules/counter'

function CounterContainer() {
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff,
  }))

  const dispatch = useDispatch()

  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())
  const onSetDiff = diff => dispatch(setDiff(diff))

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
}

export default CounterContainer
```

useSelector() 는 ReduxHooks 의 기능 중 하나로 리덕스 스토어의 상태를 조회해주는 기능을 수행한다.

​
useSelector 기능을 사용하게 되면 리덕스 스토어의 상태에 대해

이전 게시글에서 설명한 구독 ( subscribe ) 을 수행한다.

useDispatch() 도 ReduxHooks 의 기능 중 하나이며

리덕스 스토어의 dispatch 를 함수 컴포넌트에서 사용할 수 있도록 해주는 녀석이다.

​
이 덕에 onIncrease, onDecrease, onSetDiff 함수에서 dispatch 를 사용할 수 있다.

​
그런데 이 전 게시글에서 dispatch 는 action 을 인자로 던진다고 했는데 여기선 함수를 던지고 있다.

이는 아까 src/index.js 에서 counter 모듈을 가지고 있는 Store 를 로드 했는데,

counter 모듈에서 increase(), decrease(), setDiff() 를 액션 생성 함수로 선언 해놨기때문이다.

이렇게 Counter.js 컴포넌트를 렌더링하면서 프로퍼티로는 2 개의 값과 3 개의 함수를 보낸다.

## src/components/Counter.js

```javascript
import React from 'react'

function Counter({ number, diff, onIncrease, onDecrease, onSetDiff }) {
  const onChange = e => {
    onSetDiff(parseInt(e.target.value, 10))
  }
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <input type="number" value={diff} min="1" onChange={onChange} />
        <button onClick={onIncrease}>+</button>
        <button onClick={onDecrease}>-</button>
      </div>
    </div>
  )
}

export default Counter
```

return 부분을 보면

onIncrease <button> + </button>

onDecrease <button> - </button>

CounterContainer.js 에서 넘어온 dispatch 를 실행하도록 걸어놨다.

자 지금까지 설명한 모든 과정을 마치고,

제일 처음에 렌더링을 시도했던 메인페이지인 src/index.js 로 돌아가 화면에 그려지게 되는 것이다.

​
그 후 숫자 증가 버튼을 클릭하게 되면

스토어에 내장되어있는 reducer 중 counter.js 모듈의 리듀서를 수행해 값이 증가되며

스토어의 상태에 View 가 이전의 useSelector 로 인해 구독이 되어있기에 상태 변화를 감지하여

값을 실시간으로 화면에 렌더링해 뿌려주는 것이다.
