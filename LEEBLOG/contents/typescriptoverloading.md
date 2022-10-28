---
date: '2022-06-25'
title: '[Typescript]Overloading'
categories: ['Typescript']
summary: 'Type Overloading 예시'
thumbnail: './tsthumbnail.png'
---

## Overloading

한 클래스 내에 같은 이름의 메서드를 여러 개 정의하는 것을 '메서드 오버로딩' 또는 간단히 '오버로딩'이라 한다.

## type Overloading

type에 서로 다른 signature가 파라미터 개수도 다른경우에 오버로딩 예시입니다.

```typescript
type Add = {
  (a: number, b: number, c: number): number
  (a: number, b: number): number
}

const add: Add = (a, b, c?: number) => {
  if (c) return a + b + c
  return a + b
}

//오류 없이 실행된다.
add(1, 2)
add(1, 2, 3)
```

위 코드에서 c?:는 옵션을 준다고 생각하면 됩니다.
c는 number 이거나 값이없는 null일수있습니다.

## 함수 Overloading

매개변수의 개수와 타입이 다른 경우 예시입니다.

```typescript
// 함수 선언
function printConsole(a: number): void
function printConsole(a: string): void
function printConsole(a: number, b: string): void
function printConsole(a: string, b: number): void

// 함수 구현
function printConsole(a: any, b?: any): void {
  console.log(a, b)
}

// 함수 호출
printConsole('1')
printConsole('1', 2)
```

네 개의 함수 선언과 하나의 함수 구현이 존재합니다.

네 개의 함수 선언은 서로 다른 갯수와 타입의 매개변수를 가집니다.

마지막 함수에는 함수의 본문을 구현하였으며, 두 번째 매개변수는 선택적 프로퍼티를 사용합니다.

그리고 전달되는 값이 숫자형 또는 문자열일 수 있으므로 매개변수의 타입을 any 타입으로 정의합니다.

만약, 함수 호출에서 두 인자의 타입이 문자열인 경우 에러가 발생합니다.
