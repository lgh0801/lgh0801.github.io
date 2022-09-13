---
date: '2022-03-11'
title: 'Javascript Map 메소드'
categories: ['Javascript']
summary: 'Javascript Map 메소드 사용하기'
thumbnail: './jsthumbnail.png'
---

## Javascript Map

map은 배열을 순회하면서 실행되는 콜백함수의 결과값들을 새로운 배열로 반환한다.

Array(배열) 에 map 메소드를 사용해서 배열 \* 3 값을 만들기.

```javascript
let array = [1, 2, 3, 4]
let result = array.map(x => x * 3)

// 배열에 map 메소드를 사용해서 리턴값으로 배열의 원소 *3	값을 result 에 할당한다.

console.log(array)[(1, 2, 3, 4)] //map 은 원본값은 건드리지 않고 새로운 배열을 생성하여 리턴한다.
console.log(result)[(3, 6, 9, 12)] // 새로운 배열을 생성하여 result의 할당한 결과값.
```

## function를 만들고 map의 콜백 함수에 넣어서 사용해보기.

```javascript
let array = [1, 2, 3, 4];

function squared(x){  // squared(제곱) 이라는 함수에 리턴값 x **2 으로 만들어주고
    return x ** 2
}

result = array.map(squared);
// 배열의 맵에 위에 만든 함수를 콜백함수로 넣어줘서 사용할수 있다.

console.log(result); =  [1, 4, 9, 16]
console.log(array); =  [1, 2, 3, 4];
```

## map에 메소드를 쓰고 연달아서 또 사용할 수 있다.

메소드가 객체를 반환하면 메소드의 반환 값인 객체를 통해서 또 다른 함수를 호출할 수 있다.

너무 많이 메소드 체이닝을 사용하면 가독성이 떨어질 수 있다.

```javascript
let array = [1, 4, 9, 16]

return array.map(Math.sqrt).map(x => x ** 2)
// Math.sqrt = 해당 숫자의 제곱근을 반환하는 함수입니다. 1 = 1 /  4 = 2 /  9 = 3  / 16 = 4
// 제곱근의 반환값에 메서드 체이닝으로 map을 한번더 사용하여 x의 3승을 합니다
// return 값 = [1, 4, 9, 16]
```
