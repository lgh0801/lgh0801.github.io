---
date: '2022-06-25'
title: '[Typescript]추상클래스'
categories: ['Typescript']
summary: '추상클래스 사용해보기'
thumbnail: './tsthumbnail.png'
---

## 추상화(Abstraction)

추상화는 객체 지향 프로그래밍(OOP:Object-Oriented Programming)의 핵심 아이이디어 중 하나입니다.

복잡성을 최소화하고 고급 아키텍처 문제를 해결하는데 도움이 되는 기술이며,

하위 수준의 세부 사항을 미리 구현할 필요가 없습니다.

상위 수준에 집중하고 나중에 세부 사항을 구현합니다.

OOP에서는 두 가지 유형의 클래스가 존재합니다.

추상 클래스와 구체 클래스입니다. 위에서 말한 상위 수준은 추상 클래스이며 하위 수준은 구체 클래스입니다.

구체 클래스의 객체는 new 키워드를 사용하여 생성할 수 있습니다.

```typescript
abstract class Person {
  private _name: string
  private _age: number

  constructor(theName: string, theAge: number) {
    this._name = theName
    this._age = theAge
  }

  get name() {
    return this._name
  }

  set name(theName: string) {
    this._name = theName
  }

  get age() {
    return this._age
  }

  set age(theAge: number) {
    this._age = theAge
  }
}

// 불가능
// const person = new Person('Bob', 20);
```

추상 클래스는 구체 클래스가 가져야 하는 속성과 함수를 설정하는 클래스입니다.

추상 클래스는 구체 클래스의 도면 혹은 설계서이므로 객체 인스턴스를 생성할 수 없습니다.

## TypeScript의 추상 클래스

타입스크립트(TypeScript)에서 추상 클래스를 사용하는 가장 일반적인 용도는

하위 클래스(=구체 클래스)에서 공통 동작을 찾는 것입니다.

그리고 추상 클래스는 객체 인스턴스화할 수 없다는 것을 알고 있다는 전제하에 사용합니다.

다음은 동물의 공통 동작 또는 특성을 가지는 Animal 클래스를 추상 클래스로 구현합니다.

추상 클래스를 선언하기 위해 abstract 키워드를 사용합니다.

```typescript
abstract class Animal {
  private _age: number

  constructor(theAge: number) {
    this._age = theAge
  }

  get age() {
    return this._age
  }

  set age(theAge: number) {
    this._age = theAge
  }
}
```

위에서 언급했듯이 추상 클래스는 객체로 생성할 수 없습니다.

그렇기 때문에 동물의 포함되는 Dog와 Cat 클래스를 구현할 것입니다.

추상 클래스인 Animal 클래스를 구체 클래스에 extends 키워드를 사용하여 상속합니다.

```typescript
class Dog extends Animal {
  constructor(theAge: number) {
    super(theAge)
  }
}

class Cat extends Animal {
  constructor(theAge: number) {
    super(theAge)
  }
}

const dog: Dog = new Dog(5)
const cat: Cat = new Cat(3)

console.log(`Dog Age: ${dog.age}`)
// Dog Age: 5

console.log(`Cat Age: ${cat.age}`)
// Cat Age: 3
```

Dog와 Cat 객체에는 추상 클래스 Animal의 모든 속성과 함수가 존재하므로

Animal 클래스의 속성과 함수를 호출할 수 있습니다.
