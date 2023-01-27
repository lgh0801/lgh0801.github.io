---
date: '2022-10-13'
title: 'useCallback/useEvent'
categories: ['React']
summary: 'useCallback과 useEvent 알아보기'
thumbnail: './reactthumbnail.png'
---

## useCallback

useMemo가 값을 기록했다면, useCallback은 함수를 기록합니다.

```javascript
const App = () => {
  //...
  const koo = () => {
    console.log('hello')
  }
  //...
}
```

만약 이 컴포넌트가 리랜더링 된다면, 리랜더링 될 때마다 새롭게 koo함수가 정의됩니다.

첫 렌더링 때 메모리 주소 1에 koo 를 저장했다면,

두 번째 렌더링 때는 1에 똑같이 있음에도 불구하고 메모리 주소 2에 koo 를 또 만듭니다.

굳이 또 메모리를 잡고 코드를 할당하는 과정이 발생하게 됩니다.

koo 가 만약 다른 컴포넌트로 전달되거나 할 때에는

그 자체로 괜히 쓸데없는 리랜더링을 더 유발할 수 있습니다.

이 문제를 다소 해결하기 위해 useCallback이 등장합니다.

```javascript
//...
const memoCallback = useCallback(
  {} => {
    something(a,b);
  },[a,b]
);
//...
```

useCallback은 deps 배열에 넣은 값이 변경될 때만 안에 있는 메서드를 새로 정의하고,

변경되지 않으면 이전에 저장해둔걸 그대로 사용할 것입니다.

이러면 memoCallback 에는 같은 주소가 저장될 것이므로

JS가 바라봤을 때도 같은 함수로 인식합니다.

## useEvent

useCallback은 deps값이 변경되면 같은 주소에 머물지 않고 새로운 함수가 만들어집니다.

useEvent는 이 문제를 해결하기 위해 만들어졌습니다.

아직 React에 포함되지는 않았습니다.

아직 개발 중인 상황으로 보이는데, 22년 5월에 RFC에 발표되고 나서 되게 많은 인기를 끌고 있습니다.

공식문서를 바탕으로 간단히 알아보겠습니다.

```javascript
  function Chat() {
    const [textm setText] = useState('');

    const onClick = useEvent(() => {
      sendMessage(text);
    });

    return<SendButton onClick={onClick}/>;
  }
```

일단 useEvent는 deps가 없습니다.

useEvent는 해당 함수가 호출되는 순간에 props나 state의 값을 확인하도록 했기 때문에

deps가 없고, 그 값들의 최신 값을 반영할 수 있습니다.

그것도 새롭게 정의하는 것이 아니라 계속 같은 주소의 함수로 유지합니다.

useCallback 문제와는 약간 다른 핀트지만, useEvent를 잘 활용하면

Effect와 Event를 구분해서 활용할 수 있습니다.

```javascript
function Chat({ selectedRoom }) {
  const [muted, setMuted] = useState(false)
  const theme = useContext(ThemeContext)

  useEffect(() => {
    const socket = createSocket('/chat/' + selectedRoom)
    socket.on('connected', async () => {
      await checkConnection(selectedRoom)
      showToast(theme, 'Connected to ' + selectedRoom)
    })
    socket.on('message', async () => {
      await checkConnection(message)
      showToast(theme, 'New message' + message)
      if (!muted) {
        playSound()
      }
    })
    socket.connect()
    return () => socket.dispose()
  }, [selectedRoom, theme, muted])
  //...
}
```

이 코드는 선택한 채팅방이 변경될 때, 소켓 연결을 새롭게 하도록 되어있습니다.

그런데 문제는 useEffect의 deps에 theme 과 muted 도 같이 들어가 있다는 점입니다.

방이 바뀔 때 뿐만 아니라 테마와 음소거 값이 변경되었을 때도

소켓 연결을 다시 한다는 건 꽤 문제라고 볼 수 있습니다.

하지만 deps에서 theme 과 muted 도 뺄 수가 없습니다.

내부에서 두 값을 사용하고 있으므로 이렇게 넣어두지 않으면

theme 의 muted 의 최신값이 반영되지 않는 문제가 생길 수 있습니다.

이러한 문제를 theme 과 muted 를 사용하는 부분을 useEvent의

‘호출될 때의 최신값을 보게 한다’라는 특징을 이용해 고쳐볼 수 있습니다.

```javascript
function Chat({ selectedRoom }) {
  const [muted, setMuted] = useState(false)
  const theme = useContext(ThemeContext)

  const onConnected = useEvent(connectedRoom => {
    showToast(theme, 'Connected to ' + connectedRoom)
  })

  const onMessage = useEvent(message => {
    showToast(theme, 'New message' + message)
    if (!muted) {
      playSound()
    }
  })

  useEffect(() => {
    const socket = createSocket('/chat/' + selectedRoom)
    socket.on('connected', async () => {
      await checkConnection(selectedRoom)
      onConnected(selectedRoom)
    })
    socket.on('message', onMessage)
    socket.connect()
    return () => socket.disconnect()
  }, [selectedRoom])
  //...
}
```

이렇게 하면 onConnected 와 onMessage 는 언제나 theme 과 muted 의 최신값을

볼 수 있는 Event가 되고, useEffect는 selectedRoom 이 변경될 때만

실행되게 되어 이 코드의 의도를 잘 살릴 수 있습니다.

또한 onConnected 와 onMessage 는 같은 주소의 함수기 때문에,

useEffect 내에서 함수가 최신화되지 않을지 걱정할 필요도 없습니다.
