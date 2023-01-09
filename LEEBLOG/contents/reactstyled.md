---
date: '2022-05-21'
title: 'React-Styled Component'
categories: ['React', 'Styled-Components', 'CSS']
summary: 'Styled-Components는 무엇인가?'
thumbnail: './reactthumbnail.png'
---

## Styled-Compoenets ?

Styled-Components 는 JS의 태그가 지정된 템플릿 리터럴과 CSS의 기능을 사용하여

구성 요소에 반응하는 스타일을 제공하는 CSS-in-JS 라이브러리입니다.

## 사용법

패키지 설치

```bash
npm install styled-components
yarn add styled-components
```

사용방법

- 상단에 styled-components 를 import 합니다.
- 모든 HTML 태그에 대해 속성이 정의되어 있으므로 "styled.속성" 으로 접근하여 CSS를 작성합니다.
- 컴포넌트에 적용합니다.

-고정 스타일링(작성한 CSS가 동적으로 변경 없이 그대로 적용)-

```javascript
// css.js
import styled from 'styled-components'

export const Header = styled.div`
  color: blue;
  font-size: 20px;
`

// Main1.js 파일
import React from 'react'
import { Header } from '../Style/css'

const Main1 = props => {
  return <Header>안녕하세요!</Header>
}

export default Main1
```

-가변 스타일링(props에 따라 바꾸고 싶은 속성이 있는 경우 적용)-

```javascript
// css.js
import styled from 'styled-components'

export const StyledDiv = styled.div`
  color: ${props => props.color || 'black'};
  font-size: ${props => props.fontSize || '20px'};
`

// Main1.js
import React from 'react'
import { StyledDiv } from '../Style/css'

const Main1 = props => {
  return (
    <React.Fragment>
      <StyledDiv>기본</StyledDiv>

      <StyledDiv color={'blue'} fontSize={'30px'}>
        파란글씨
      </StyledDiv>

      <StyledDiv color={'green'} fontSize={'40px'}>
        초록글씨
      </StyledDiv>
    </React.Fragment>
  )
}

export default Main1
```
