---
date: '2022-07-02'
title: 'Redux-persist'
categories: ['React']
summary: 'Redux-persist란 무엇인가'
thumbnail: './reactthumbnail.png'
---

## Redux-persist

redux 상태 관리 라이브러리를 많이 사용하실 것입니다.

리덕스의 store는 페이지를 새로고침 할 경우 state가 날아가는 것을 보실 수 있습니다.

이것에 대한 대응 방안으로 localStorage 또는 session에 저장하고자 하는 reducer state를 저장하여,

새로고침 하여도 저장공간에 있는 데이터를 redux에 불러오는 형식으로 이루어집니다.

위에서 말한 이 작동을 위해 redux-persist를 사용합니다.

## 설치

```bash
yarn add redux-persist
```

## reducer에 persist store 정의

- localStorage에 저장하고 싶으면 import storage from 'redux-persist/lib/storage

- session Storage에 저장하고 싶으면 import storageSession from 'redux-persist/lib/storage/session

localStorage 와 session Storage 차이점은 페이지를 닫았을때 localStorage는 저장소에 값을 가지고있으며

session Storage 페이지를 닫았을떄 저장소에 값을 초기화합니다.

```javascript
// reducers/index.js
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import auth from './auth'
import board from './board'
import studio from './studio'

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['auth'],
  // blacklist -> 그것만 제외합니다
}

export const rootReducer = combineReducers({
  auth,
  board,
  studio,
})

export default persistReducer(persistConfig, rootReducer)
```

## persist store 사용

```javascript
// src/index.js

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import configureStore from './store'
import { rootReducer } from './reducers'

const store = createStore(rootReducer)
const persistor = persistStore(store)

const Root = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

ReactDOM.render(<Root />, document.getElementById('root'))
```
