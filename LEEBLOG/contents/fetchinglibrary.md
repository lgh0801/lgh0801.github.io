---
date: '2022-08-08'
title: 'React-Query vs SWR'
categories: ['React']
summary: 'fetching 라이브러리 비교'
thumbnail: './reactthumbnail.png'
---

## SWR은 무엇인가?

앞에서는 React-Query가 무엇인지 설명했습니다.

React-Query 다음으로 가장 많이 사용되는 fetching 라이브러리가

Vercel에서 만든 SWR 라이브러리입니다.

사용 이유는 React-Query와 마찬가지로 서버 상태의 동기화를

편리하게 진행해주기 위해서입니다.

## 코드 예제

- React Query
  리액트 애플리케이션에 서버 상태를 가져오고, 캐싱 / 동기화 / 업데이트를 쉽게 하도록 합니다.

```javascript
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()
const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryTodos />
    </QueryClientProvider>
  </div>
)

const fetchTodos = () => {
  return axios.get('http://localhost:3000/todos')
}
const ReactQueryTodos = () => {
  const { isLoading, error, data, isFetching } = useQuery('users', fetchTodos)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  return <TodoList library="React Query" data={data} />
}

const TodoList = ({ library, data }) => (
  <div>
    <h1>Users from {library}</h1>
    {data.map(user => (
      <p>
        {user.day} <strong>{user.content}</strong>
      </p>
    ))}
  </div>
)

export default App
```

- SWR
  먼저 캐시에서 데이터를 반환, 서버에서 데이터를 가져오는 요청을 수행, 마지막에 최신 데이터를 제공합니다.

```javascript
import useSWR from 'swr'

const App = () => (
  <div>
    <SWRTodos />
  </div>
)
const fetcher = url => axios.get(url).then(res => res.data)
const SWRTodos = () => {
  const { data, error } = useSWR('http://localhost:3000/todos', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return <TodoList library="SWR" data={data} />
}

const TodoList = ({ library, data }) => (
  <div>
    <h1>Users from {library}</h1>
    {data.map(user => (
      <p>
        {user.day} <strong>{user.content}</strong>
      </p>
    ))}
  </div>
)

export default App
```

## 비교

### React-Query

- SWR비해 용량이 큽니다.

- fetcher의 url을 직접 전달해야 합니다.

- isLoading, isFetching을 통해 데이터의 상태를 보여줍니다.

- useMutation 훅을 통하여 서버의 상태를 쉽게 변형 가능합니다.

- update에 최적화가 매우 잘되어있습니다.

- SWR보다 다양한 기능들을 지원합니다.

### SWR

- React-Query 비해 용량이 작습니다.

- fetcher의 인자로 useSWR의 첫 번째 인자를 넘겨준다.

- isValidating을 이용해 상태를 표현합니다.

- useSWR 훅을 통하여 얻은 데이터를 mutate()를 사용하여 업데이트해 줍니다.

## 마치면서

변동성이 빈번히 일어나는 일이 많은 서비스인 경우와 다양한 기능에

경험을 원하면 update에 최적화된 React-Query를 사용하고

서버에서의 정보를 불러와서 사용하는 일이 주인 서비스는

SWR를 사용하는 게 좋은 선택이 될 것 같습니다.
