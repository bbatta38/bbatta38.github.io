---
layout: post
title: 자바스크립트 코딩가이드
comments: true
---

### 전역변수 최소화
모든 전역변수는 전역 네임스페이스 안에 같이 존재하기 때문에 의도치 않게 같은 변수명을 사용하게 된다면 충돌이 일어날 수 있다. 개인작업시에도 조심해야 하지만 협업을 하게 되는 경우 전역변수명이 겹치게 되면 뜻하지 않는 오류를 만날 수 있다.
또한 자바스크립트에서는 전역변수를 선언하는 방법이 너무 쉽기 때문에 의도치 않게 전역변수를 선언하게 될 수도 있는데 아래 코드가 그 한 예이다.

```javascript
// bad
function c(a, b) {
    ab = a + b; // 암묵적으로 전역변수로 선언이 되었다.
    return ab;
}
```

이러한 문제점들을 없애기 위해서는 지역변수의 사용을 활성화하고 본인만의 네임스페이스를 사용하여 변수를 선언하면 된다.

```javascript
// good
function c(a, b) {
    var ab = a + b;
    return ab;
}
```

자바스크립트에서는 함수 여기저기에 `var`를 이용하여 변수를 선언해 줄 수 있는데, 함수 중간 부분에 변수를 선언한다면 호이스팅의 문제점이 발생할 수 있다.

```javascript
var variable = 'global';
function func() {
    console.log(variable);
    var variable = 'local';
    console.log(variable);
}
```

상단 코드의 첫번째 `console.log(variable);`부분에서 `global`이 출력될 것이라고 예상했겠지만 실제로는 `undefined`가 출력된다. 아래의 코드를 보자.

```javascript
var variable = 'global';
function func() {
    var variable;
    console.log(variable);
    variable = 'local';
    console.log(variable);
}
```

함수 중간에 `var`로 변수를 선언해 주게 되면 상단의 코드처럼 `var`가 함수의 상단으로 올라가는데 이를 **호이스팅** 이라고 한다. 이를 방지하기 위해선 항상 함수의 시작지점에 변수를 선언해 준다.

```javascript
function func() {
    var a = 0;
    var b = 0;
    var c = {};
    var d;
    
    d = 4;
    console.log(a);
}
```

여러개의 변수를 선언할때 `var`를 여러번 써주는 것보다는 아래의 코드처럼 한번만 쓰고 여러개의 변수를 쉼표로 연결하는것이 더 효과적이다.

```javascript
// good
function func() {
    var a = 0,
        b = 0,
        c = {};
        
    console.log(a);
}
```

또한 변수를 선언할 때 초기값을 지정해주는 것이 좋다. 
초기값을 지정해주지 않으면 'undefined'로 값이 초기화 되는데 자바스크립트 같은 경우 값을 넣어줄 때 데이터 타입을 지정해주지 않으므로 숫자는 0(zero) 으로 초기화 해주지 않으면 문제가 발생할 수 있다.


### for루프
일반적인 for루프

```javascript
for(var i = 0; i < myArray.length; i++) {
    // loop code...
}
```

언뜻 보기에 문제가 없어 보이지만(실제 사용에도 문제는 없다), 루프가 돌때마다 myArray.length를 캐스팅하기 때문에 비용소모가 크다. 만약 array가 아니라 DOM을 순회하게 된다면 속도가 많이 느려질 수 있다.

length를 변수에 저장해놓고 for문을 돌리면 캐스팅 비용을 줄일수가 있다.

```javascript
var length = myArray.length;
for(var i = 0; i < length; i++) {
    // loop code...
}
```

추가적으로 아래와 같이 사용한다면 더 효율적인 코드가 된다.

```javascript
var length = myArray.length,
    i = 0;
for(; i < length; i++) {
    // loop code...
}
```

### for-in 루프
일반적으로 for-in문은 객체를 순회할때 쓰인다.

```javascript
var man = {
    firstName: 'bbatta',
    lastName: 'Kim',
    age: 35
};
for(var i in man){
    console.log(i + ' : ' + man[i]);
}
// firstName : bbatta
// lastName : Kim
// age : 35
```

자바스크립트에서는 배열도 객체이기 때문에 for-in문으로 순회할 수도 있다. 하지만 for-in문의 경우 순서가 없기 때문에 인덱스가 중요한 배열을 for-in문으로 돌리는 것은 권장하지 않는다.

### 암묵적 타입캐스팅 피하기
자바스크립트는 변수를 비교할 때 암묵적으로 타입캐스팅을 한다. 예를 들어 `0 == false` 또는 `"" == false`의 비교는 true를 반환한다. 암묵적 타입캐스팅에 대한 혼란을 막기 위해서는 완전항등연산자인 `===`나 완전비항등연산자인 `!==`를 사용한다.

```javascript
var abc = 0;
if(abc === false) {
    // false이기 때문에 실행되지 않는다.
}
if(abc === '0') {
    // false이기 때문에 실행되지 않는다.
}
```

### parseInt()를 통한 숫자 변환
`parseInt()`는 문자열로부터 숫자를 얻을 수 있다. 두번째 매개변수인 기수도 생략하지 말고 쓰는것을 권장한다.(기수를 생략하면 문자열 앞의 숫자가 0(zero)일 경우 다른 기수로 잘못 오인해 오류를 일으킬 가능성이 있다.)

```javascript
var kim = "32",
    junior = "06";
kim = parseInt(kim, 10);
junior = parseInt(junior, 10);
```

아래와 같은 경우도 숫자로 타입캐스팅이 가능하나 

```javascript
var abc = 0 + '08';
var def = Number('08');

// NaN을 반환하게 되므로 되도록이면 parseInt()를 쓰는것을 권장한다.
var a = '2016 happy new year';
a = Number(a);      // NaN
```

### 코딩규칙
###### 들여쓰기
개인의 기호에 따라 tab을 쓰는 개발자도 있지만, space(4개)를 쓰도록 한다.
###### 중괄호
중괄호는 생략하지 않는다.

```javascript
// bad
if(true)
    alert('true');
    
// good
if(true) {
    alert('true');
}
```

중괄호의 위치 : 선행하는 명령문과 동일한 행에 두도록 한다.

```javascript
// bad
function func() 
{
    if(true)
    {
        //true 코드
    }
}

// good
function func() {
    if(true) {
        //true 코드
    }
}
```

###### 공백
공백을 잘 사용하여 코드의 가독성과 일관성을 향상시킬 수 있다.

세미콜론, 콜론, 쉼표등등의 다음에 공백을 활용할 수 있고, 연산자와 피연산자 사이에도 공백을 넣어 가독성을 높일 수 있다.

```javascript
// for 루프 내
for(var i = 0; i < 10; i++) {...}

// 배열의 원소들을 분리하는 쉼표 다음
var a = ['a', 'b', 'c'];

// 객체의 프로퍼티를 분리하는 쉼표, key와 value를 구분하는 콜론 다음
var obj = {a: 1, b: 2};

// 함수의 인자들을 분리할 때 and 함수 중괄호 전
function myFunc(a, b, c) {...}

// 연산자와 피연산자 사이
var a = 0;
    b = 1;
    c = a + b;
if(a > 0) {...}
a += 1;
```

### 명명규칙
###### 생성자를 대문자로 시작
생성자 함수는 대문자로 시작한다. 자바스크립트에서는 클래스가 없기 때문에 대문자로 시작 하는것과 소문자로 시작 하는것의 큰 차이는 없다. 하지만 생성자 함수를 클래스와 비슷하게 구현할 수 있으므로 생성자와 일반함수를 구분하도록 한다.

```javascript
function Person() {...} // 생성자
function person() {...} // 일반함수
```

###### 단어구분
단어구분은 카멜표기법(낙타표기법)을 사용한다.

```javascript
var myAge = '35';
function getMyAge() {
    return myAge;
}
```

상수의 경우 모두 대문자로 표기하고 단어사이에 _(under score)를 사용한다.

```javascript
var MAX_LENGTH = 900;
var MAX_HEIGHT = 500;
```
