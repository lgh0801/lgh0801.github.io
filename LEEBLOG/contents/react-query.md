---
date: '2022-08-05'
title: 'React-Query'
categories: ['React']
summary: 'React-Query 에 대해 알아보기'
thumbnail: './reactthumbnail.png'
---

## React-Query 란

react-query는 리액트 애플리케이션에서 서버 상태 가져오기, 캐싱, 동기화 및 업데이트를

보다 쉽게 다룰 수 있도록 도와주며 클라이언트 상태와 서버 상태를

명확히 구분하기 위해서 만들어진 라이브러리입니다.

react-query에서 기존 상태 관리 라이브러리(redux, mobX)는 클라이언트 상태 작업에 적합하지만

비동기 또는 서버 상태 작업에는 그다지 좋지 않다고 말하고 있습니다.

클라이언트 상태(Client State) 와 서버 상태(Server State)는 완전히 다르며

클라이언트 상태는 컴포넌트에서 관리하는 각각의 input 값으로 예를 들 수 있고

서버 상태는 database에 저장되어있는 데이터로 예를 들 수 있습니다.

## React-Query 상태

- fresh : 새롭게 추가된 쿼리 & 만료되지 않은 쿼리 ➜ 컴포넌트가 마운트, 업데이트되어도 데이터 재요청 ❌

- fetching : 요청 중인 쿼리

- stale : 만료된 쿼리 ➜ 컴포넌트가 마운트, 업데이트되면 데이터 재요청 ⭕️

- inactive : 비활성화된 쿼리 ➜ 특정 시간이 지나면 가비지 컬렉터에 의해 제거

## React-Query 사용방법

설치 및 초기 설정

```bash
npm i react-query // npm 사용
or
yarn add react-query // yarn 사용
```

캐시를 관리하기 위해 QueryClient 인스턴스를 생성한 후 QueryClientProvider를 통해

컴포넌트가 QueryClient 인스턴스에 접근할 수 있도록 App컴포넌트 최상단에 추가한다.

## 기존 요청 방식 VS react-query 요청 방식

- 기존 요청 방식 : isLoading과 data를 state로 가지며 서버 데이터를 불러온 후 상태 update

```javascript
const Exam = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/exam').then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return <h1>Loading..</h1>

  return (
    <>
      <h1>Exam</h1>
      {data.map(human => {
        return <div key={human.num}>{human.name}</div>
      })}
    </>
  )
}
```

- react-query : useQuery훅을 이용해 반환받은 isLoading과 data 사용

```javascript
const axiosAPI = () => {
  return axios.get('http://localhost:3000/exam')
}

const RQExam = () => {
  const { data, isLoading } = useQuery('exam', axiosAPI)

  if (isLoading) return <h1>Loading..</h1>

  return (
    <>
      <h1>Exam</h1>
      {data &&
        data.map(human => {
          return <div key={human.num}>{human.name}</div>
        })}
    </>
  )
}
```

## useQuery

GET요청과 같은 CREAT작업을 할때 사용되는 훅입니다.

```javascript
  const requestData = useQuery(쿼리 키, 쿼리 함수, 옵션);
```

- 쿼리 키 : 문자열 or 배열, 캐싱 처리에 있어서 중요한 개념

- 쿼리 함수: Promise를 리턴하는 함수, ex) axios(), fetch()

- 옵션 : useQuery 기능을 제어

쿼리 키가 다르면 호출하는 API가 같더라도 캐싱을 별도로 관리합니다.

## 데이터 요청

- data : 서버 요청에 대한 데이터

- isLoading : 캐시가 없는 상태에서의 데이터 요청 중인 상태 (true / false)

- isFetching : 캐시의 유무 상관없이 데이터 요청 중인 상태 (true / false)

- isError : 서버 요청 실패에 대한 상태 (true / false)

- error : 서버 요청 실패 (object)
