---
date: '2022-03-01'
title: 'Javascript Reduce 메소드'
categories: ['Javascript']
summary: 'Javascript Reduce 메소드 사용하기'
thumbnail: './jsthumbnail.png'
---

## Array.reduce()

reduce()는 배열의 모든 요소들에 대해서 연산을 수행하여 하나의 결과 값을 리턴합니다.

예를 들어, reduce()를 사용하면 배열의 모든 숫자를 순차적으로 더해서 10이라는 결과를 계산할 수 있습니다.

```javascript
const arr = [1, 2, 3, 4]
// (1 + 2 + 3 + 4) = 10
```

배열의 모든 요소를 한번에 계산하는 것은 아니고, 두개의 요소를 계산하고,

그 결과를 다음 요소와 함께 계산하고, 그 결과는 다음 요소와 계산하는 방식으로 연산을 분할해서,

점진적으로 계산하는 것입니다.

## Array.reduce() Syntax 및 예제

reduce()는 callback 함수와 초기값을 인자로 받으며, 초기값은 생략될 수 있습니다.

```javascript
arr.reduce(callback, initialValue)
```

함수는 아래와 같이 4개의 인자를 받습니다.

- accumulator : 누적된 계산 값
- currentValue : 함수에서 계산에 사용되는 요소
- currentIndex : 현재 배열 요소의 Index
- array : 배열 객체

```javascript
function func(accumulator, currentValue, currentIndex, array)
```

위의 예제에서, reduce()에 함수를 전달할 때 arrow function으로 구현한 객체를 전달했었는데,

일반적인 함수를 사용하여 아래와 같이 다시 구현해보았습니다.

또한 로그를 출력하여 acc, currentValue 등 계산 과정을 쉽게 볼 수 있도록 하였습니다.

```javascript
const arr = [1, 2, 3, 4]

function func(accumulator, currentValue, currentIndex, array) {
  console.log(
    'acc: ' +
      accumulator +
      ', cur: ' +
      currentValue +
      ', curIndex: ' +
      currentIndex +
      ', array: ' +
      array,
  )
  // acc : 0 + cur : 1 index : 0 array: [1,2,3,4]
  // acc : 1 + cur : 2 index : 1 array: [1,2,3,4]
  // acc : 3 + cur : 3 index : 2 array: [1,2,3,4]
  // acc : 6 + cur : 4 index : 3 array: [1,2,3,4]
  return accumulator + currentValue
}

const sumWithInitial = arr.reduce(func, 0)
console.log(sumWithInitial) // 10
```

위 코드의 실행 결과를 보면, 리턴 값은 다음 함수의 accumulator 인자로 전달된다는 것을 알 수 있습니다.

그리고 첫번째 함수 계산에서 accumulator는 인자로 전달된 초기값0이고(초기값 생략시 array[0]이 전달),

currentValue는 배열의 0번 Index 요소라는 것을 알 수 있었습니다.

## Arrow function(Lambda)을 이용한 reduce() 예제

아래와 같이 reduce(func, initialValue)처럼 함수와 초기 값을 전달하면,

초기 값과 배열의 요소들이 순차적으로 함수에 전달됩니다. 연산 결과는 다시 함수로 전달되며,

다음 배열의 요소와 계산을 하고 그 결과를 다음 함수에 넘깁니다.

이렇게 모든 요소에 대해서 연산을 마치면 하나의 결과를 리턴합니다.

아래 예제는 arrow function을 이용하여 간단히 reducer 함수를 구현하였습니다.

previousValue와 currentValue가 함수로 전달되면 이 두개의 값을 합하고 다음 계산을 위해 전달합니다.

```javascript
const arr = [1, 2, 3, 4]

const sumWithInitial = arr.reduce(
  (previousValue, currentValue) => previousValue + currentValue,
  0,
)
// 0 + 1
// 1 + 2
// 3 + 3
// 6 + 4
console.log(sumWithInitial) // 10
```

Arrow function을 이용하면, 아래와 같이 함수를 직접 구현하지 않고 reduce()에 함수를 전달할 수 있습니다.

여기서 초기값이 불필요하면 생략할 수 있습니다.
