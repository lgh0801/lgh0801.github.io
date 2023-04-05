---
date: '2022-05-09'
title: 'npm ci/npm cit'
categories: ['Node.JS']
summary: '배포시 고정된 버전으로 설치'
thumbnail: './nodejsthumbnail.png'
---

## npm ci / npm cit

보통 노드 모듈을 설치할 때, npm i를 많이 사용합니다.

특정 패키지 설치, 프로젝트가 의존하고 있는 모든 패키지 설치

다른 사람이 공유하거나 배포한 프로젝트를 npm i를 사용하여

설치하면 버전이 다르게 설치가 되는 경우들이 있습니다.

이런 경우 이전 버전에서는 에러가 없었는데

에러가 발생하는 경우가 생깁니다.

이럴 때 npm ci를 사용하면 좋습니다.

npm ci는 package-lock.json에 고정된 버전 그대로 설치합니다.

또한 npm cit도 사용할 수 있습니다.

npm cit는 고정된 버전 설치와 테스트를 진행 하는 것입니다.

yarn에서는 yarn install --frozen-lockfile를 사용하시면 됩니다.

이상으로 배포 시 버전 문제를 해결할 수 있는 방법이었습니다.
