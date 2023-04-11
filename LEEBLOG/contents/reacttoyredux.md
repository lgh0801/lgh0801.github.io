---
date: '2022-03-31'
title: 'Redux 사용해보기'
categories: ['React', 'ToyProject']
summary: 'Redux로 상태관리 연습해보기'
thumbnail: './reactthumbnail.png'
---

## Redux

ToyProject를 진행하는 중에 부모와 자식 간의 prop 전달을 많이 사용하여서

지저분하며 불편함을 느꼈기 때문에 redux를 경험해볼 겸 간단하게 구현해보았습니다.

저는 컴포넌트가 많지 않아도 불편함을 느꼈는데 대형프로젝트들은 수백 수천 가지 컴포넌트가

있으면 redux와 같은 상태관리 라이브러리를 꼭 사용해야겠다는 생각을 하게 되었습니다.

아래는 redux를 세팅한 전체 코드입니다.

저는 코드가 많지 않기 때문에 따로 빼지 않고 index.js에 코드를 구현했습니다.

### index.js

```javascript
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './components/App'
import axios from 'axios'
//redux
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
//redux-persist (새로고침 or 탭 닫고 다시열기시 redux상태값이 사라지는걸 막기위해서)
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

//persist key, storage engine 설정
const persistConfig = {
  key: 'root',
  storage,
}

const REDIRECT_URI = 'http://localhost:3000/login' // aws 탄력IP 3.132.247.253로
//API키는 보안때문에 .env에서 관리
const normal = {
  //고정 값
  krfree: '자유게시판',
  krcoding: '코딩테스트 일지',
  API_KEY: process.env.REACT_APP_KAKAO_LOGIN_API_KEY,
  REDIRECT_URI: REDIRECT_URI,
  KAKAO_AUTH_URL_LOGIN: `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`, //카카오 로그인
  KAKAO_AUTH_URL_LOGOUT: `https://kauth.kakao.com/oauth/logout?client_id=${process.env.REACT_APP_KAKAO_LOGIN_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`, //카카오 로그아웃
}

const kakaoInfo = {
  //카카오 정보
  kakaonickname: '',
  kakaousernum: '',
  kakaouserrights: '',
}

const cookieDecord = {
  //쿠키 복호화
  token1: '',
  token2: '',
}

//state,action
const Normal = (state = normal) => state

const KakaoInfoSave = (state = kakaoInfo, action) => {
  if (action.type === 'kakaoinfosave') {
    //카카오 현재 유저정보 저장
    return {
      ...state,
      kakaonickname: action.kakaoinfosave.kakaonickname,
      kakaousernum: action.kakaoinfosave.kakaousernum,
      kakaouserrights: action.kakaoinfosave.kakaouserrights,
    }
  } else {
    return state
  }
}

const CookieDecord = (state = cookieDecord, action) => {
  let tok1 = '',
    tok2 = ''
  if (action.type === 'cookiedecord') {
    //암호화된 쿠키회원정보 복호화 작업
    const callSessionInfoApi = () => {
      axios
        .post('/api/LoginForm?type=SessionConfirm', {
          token1: action.cookie.userid,
          token2: action.cookie.username,
        })
        .then(response => {
          tok1 = response.data.token1
          tok2 = response.data.token2
        })
        .catch(error => {
          alert(error)
        })
    }
    callSessionInfoApi()
    return {
      ...state,
      token1: tok1,
      token2: tok2,
    }
  } else {
    return state
  }
}

//persistReducer사용하여 변형된 리듀서를 createStore함수와 사용하면 상태가 로컬 스토리지에 저장/복원
const persistedKakaoInfo = persistReducer(persistConfig, KakaoInfoSave)
const persistedCookie = persistReducer(persistConfig, CookieDecord)

const rootReducer = combineReducers({
  //여러개의 리듀서를 통합해서 관리
  normal: Normal,
  cookiedecord: persistedCookie,
  kakaoinfo: persistedKakaoInfo,
})

const store = createStore(rootReducer)

// 스토어를 export 해줘야한다. (이유는 PersistGate가 store를 못 읽는다)
export const persistor = persistStore(store)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
)
```

주요 설명은 주석을 달아놓았습니다.

이제 redux 상태 값과 action을 컴포넌트들에서 사용하는 법과 persistor 사용법을 알아보겠습니다.

```javascript
import { useDispatch, useSelector } from 'react-redux'
import { persistor } from '../../index'
const dispatch = useDispatch()
const cookiedecord = useSelector(state => state.cookiedecord)

const callSessionInfoApi = () => {
  dispatch({
    type: 'cookiedecord',
    cookie: {
      userid: cookie.load('userid'),
      username: cookie.load('username'),
    },
  })
}
```

useSelector는 redux에서 설정한 상태 값들을 가져오고

useDispatch는 설정한 action 타입을 찾아서

해당 action 코드를 실행하고 그 결과 상태 값들을 가져옵니다.

가져온 상태 값들을 cookiedecord.token1 / cookiedecord.token2

이런 식으로 불러서 사용하면 됩니다.

이제 redux-persist를 보겠습니다.

저가 redux-persist를 사용한 이유는 redux로 관리하고 새로고침하고

사라지면 안되는 값들이 있기 때문이었습니다.

물론 로그아웃 같은 특정 행동을 했을 때도 로컬저장소에 값이 남으면 안되기 때문에

로그아웃 같은 특정 로직에 이 문구를 넣어줬습니다.

```javascript
persistor.purge() //저장소에 넣어둔 redux정보들 초기화
```

## 마치면서

ToyProject에서 간단하게나마 redux를 경험해볼 수 있는 값진 시간이었습니다.

처음 설정이 시간이 걸려서 그렇지, 설정만 잘해놓으면

현업에서도 정말 편하게 사용할 수 있을 것 같습니다.
