---
date: '2022-04-11'
title: 'GraphQL'
categories: ['GraphQL', 'SQL']
summary: 'GraphQL 개념,기초'
thumbnail: './graphqlthumbnail.png'
---

## GraphQL

GraphQL은 facebook이 2012년에 개발하여 2015년에 공개적으로 발표된 SQL과 마찬가지로 쿼리 언어입니다.

SQL은 데이터베이스에 저장된 데이터를 효율적으로 가져오는 것을 목적으로 하였지만,

GraphQL은 웹 클라이언트가 데이터를 서버로부터 효율적으로 가져오는 것을 목적으로 합니다.

기존의 REST API를 사용할 경우 기능이 필요할 때마다 API를 매번 생성해야 하고

over-fetching과 under-fetching의 문제가 있었습니다.

- over-fetching : 사용하지 않는 데이터를 너무 많이 가져오는 것.

- under-fetching : endpoint에서 충분한 데이터를 가져오지 못해 다른 endpoint를 호출하는 것.

아래에서 기존 SQL과 REST API를 사용했을 때의 불편함을 예시로 들어보겠습니다.

기존의 SQL로 전체 유저를 조회시 아래와 같이 작성을 하고 endpoint를 생성하게 되는데요.

```sql
SELECT id, name FROM user;
Endpoint : /users
```

만약, user가 좋아한다고 표시한 글목록관련 데이터가 다른 테이블에 있다면

데이터를 가져올 때 JOIN을 이용해야 할 것입니다.

물론 그에 따른 endpoint도 매번 생성을 해야 하죠.

```sql
SELECT u.id, u.name, l.content FROM user AS u
LEFT JOIN likes AS l ON u.id = l.user_id;
Endpoint : /users/likes
```

이와 같이 SQL을 이용해 원하는 정보만 뽑을려면 여러 테이블을 JOIN해야 하고

그에 따라 endpoint가 많아지는 경우가 많이 있는데요.

만약, 하나의 endpoint로 필요한 데이터만 쿼리로 만들어서 받을 수 있다면 얼마나 편할까요?

그런 일을 할 수 있는 것이 바로 GraphQL입니다.

## GraphQL 표현

```graphql
query {
  user {
    id
    name
    likes {
      title
    }
  }
}
```

이렇게 GraphQL에 질의를 하면 JSON 형태로 응답을 받게 됩니다.

data라는 키 값에 담아서 응답한다는 것을 볼 수 있습니다.

```javascript
{
  "data": {
    "user": {
      "id" : 1,
      "name" : "user1",
      "likes" : [
        {
          "title" : "hihi"
        },
        {
          "title" : "hellohello"
        }
      ]
    }
  }
}
```

물론 장점만 있는 것을 아닙니다. File 전송 등의 경우 처리하기가 복잡해지고

고정된 요청과 응답만 필요한 경우에는 요청의 크기가 REST API보다 커질 수 있는 등의 단점이 존재합니다.

REST API든 GraphQL이든 각각의 장점과 단점이 있습니다.

상황에 맞추어 REST API를 사용할지 GraphQL을 사용할지 적절히 선택하는 것이 중요할 것입니다.
