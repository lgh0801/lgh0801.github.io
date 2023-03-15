---
date: '2022-09-10'
title: 'REST/REST API/RESTful'
categories: ['Network']
summary: 'REST 개념 설명'
thumbnail: './Networking.jpg'
---

## REST

REST(Representational State Transfer)의 약자입니다.

자원을 이름으로 구분하여 해당 자원의 상태를 주고받는 모든 것을 의미합니다.

HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시하고,

HTTP Method(POST, GET, PUT, DELETE, PATCH 등)를 통해

해당 자원(URI)에 대한 CRUD Operation을 적용하는 것을 의미합니다.

## REST의 장단점

### 장점

- HTTP 프로토콜의 표준을 최대한 활용하여 여러 추가적인 장점을 함께 가져갈 수 있습니다.

- HTTP 표준 프로토콜에 따르는 모든 플랫폼에서 사용이 가능합니다.

- Hypermedia API의 기본을 충실히 지키면서 범용성을 보장합니다.

- REST API 메시지가 의도하는 바를 명확하게 나타내므로 의도하는 바를 쉽게 파악할 수 있습니다.

- 서버와 클라이언트의 역할을 명확하게 분리합니다.

### 단점

- 표준이 자체가 존재하지 않아 정의가 필요합니다.

- HTTP Method 형태가 제한적입니다.

- URL보다 Header 정보의 값을 처리해야 하므로 전문성이 요구됩니다.

- 데이터를 서버에 두기 때문에 쿠키보다 보안에 좋지만, 사용자가 많아질수록 서버 메모리를 많이 차지합니다.

## REST API

RESPT API란 REST의 원리를 따르는 API를 의미합니다.

올바르게 설계하기 위해서는 지켜야 하는 몇가지 규칙이 있습니다.

1. URI는 동사보다는 명사를, 대문자보다는 소문자를 사용하여야 한다.

2. 마지막에 슬래시 (/)를 포함하지 않는다.

3. 언더바 대신 하이픈을 사용한다.

4. 파일확장자는 URI에 포함하지 않는다.

5. 행위를 포함하지 않는다.

## RESTful

RESTFUL이란 REST의 원리를 따르는 시스템을 의미합니다.

하지만 REST를 사용했다 하여 모두가 RESTful 한 것은 아닙니다.

REST API의 설계 규칙을 올바르게 지킨 시스템을 RESTful하다 말할 수 있으며

모든 CRUD 기능을 POST로 처리 하는 API 혹은 URI 규칙을 올바르게 지키지 않은 API는

REST API의 설계 규칙을 올바르게 지키지 못한 시스템은 REST API를 사용하였지만

RESTful 하지 못한 시스템이라고 할 수 있습니다.

## 마치면서...

저는 REST API 설계를 위한 URI 규칙과 Method 등을 신경을 쓰지 않고 웹 개발을 했던 것 같습니다.

GET, POST 사용만으로 개발을 주로 했었습니다.

앞으로는 웹 개발할 때 REST API 규칙들을 최대한 지켜서

RESTful하게 개발해야겠습니다.
