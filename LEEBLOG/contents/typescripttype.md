---
date: '2022-06-25'
title: 'Type vs Interface'
categories: ['Typescript']
summary: 'Type과 Interface 비교하기'
thumbnail: './tsthumbnail.png'
---

## 선언

일반적으로 객체 타입을 선언하는 거에 있어서 둘은 동일합니다.

차이점이있다면 Interface는 객체에서만 사용이 가능합니다.

```typescript
type PositionType = {
  x: number
  y: number
}
interface PositionInterface {
  x: number
  y: number
}

// object
const obj1: PositionType = {
  x: 10,
  y: 1,
}
const obj2: PositionInterface = {
  x: 20,
  y: 2,
}
```

## 구현

여기서 말하는 구현은 implements를 말하는데, type과 interface 둘 다 클래스를 통한 구현이 가능합니다.

```typescript
type PositionType = {
  x: number
  y: number
}
interface PositionInterface {
  x: number
  y: number
}

class Pos1 implements PositionType {
  constructor(public x: number, public y: number) {}
  ToNumAdd() {
    console.log(this.x + this.y)
  }
}
class Pos2 implements PositionInterface {
  constructor(public x: number, public y: number) {}
  ToNumMinus() {
    console.log(this.x - this.y)
  }
}

const test = new Pos1(3, 6)

const test2 = new Pos2(9, 4)

test.ToNumAdd() // 9

test2.ToNumMinus() //5
```

## 확장

```typescript
type PositionType = {
  x: number
  y: number
}
interface PositionInterface {
  x: number
  y: number
}

// 인터페이스는 같은 이름으로병합가능
interface PositionInterface {
  z: number
}

// Extends
interface ZpositionInterface extends PositionInterface {}

type ZpositionType = PositionType & { z: number }

class Pos1 implements PositionType {
  constructor(public x: number, public y: number, public z: number) {}
  ToNumAdd() {
    console.log(this.x + this.y + this.z)
  }
}
class Pos2 implements ZpositionInterface {
  constructor(public x: number, public y: number, public z: number) {}
  ToNumMinus() {
    console.log(this.x - this.y - this.z)
  }
}

const test = new Pos1(3, 6, 9)

const test2 = new Pos2(9, 4, 2)

test.ToNumAdd() // 18

test2.ToNumMinus() //3
```

확장을 하는 방법은 다를지언정 type과 interface 둘 다 확장이 가능한 것을 볼 수 있습니다.

여기서 차이점이 발생하는데, 인터페이스의 경우에는 선언적 확장이 가능하다는 점입니다.

선언적 확장은 동일한 이름으로 interface를 선언해줬을 경우 자동적으로 하나로 합쳐집니다.

이는 type에서는 불가능한 기능이므로 interface만 가능합니다.

그리고 확장 기능에 있어서 성능적으로 interface 좀 더 준수한 성능을 가지고 있다고 합니다.
