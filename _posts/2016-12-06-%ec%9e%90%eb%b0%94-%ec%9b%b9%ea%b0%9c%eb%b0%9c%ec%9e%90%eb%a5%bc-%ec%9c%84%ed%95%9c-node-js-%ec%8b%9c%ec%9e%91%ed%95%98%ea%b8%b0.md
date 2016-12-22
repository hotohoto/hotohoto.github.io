---
id: 164
title: '자바 웹개발자를 위한 Node.js 시작하기'
date: 2016-12-06T02:47:28+00:00
author: hotohoto
layout: post
guid: http://www.jollybus.kr/?p=164
permalink: '/2016/12/%ec%9e%90%eb%b0%94-%ec%9b%b9%ea%b0%9c%eb%b0%9c%ec%9e%90%eb%a5%bc-%ec%9c%84%ed%95%9c-node-js-%ec%8b%9c%ec%9e%91%ed%95%98%ea%b8%b0/'
categories:
  - dev
---
Java 의 Spring 프레임워크 개발을 하다가 Node.js 와 React 개발을 하면서 알게 된점을 정리해보았다.

# SPA (이야기의 출발)

예전에는 JSP처럼 서버에서 HTML을 모두 그려서 클라이언트인 브라우저로 전송해주는 방식으로 사이트가 동작했다. 그런데 클라이언트에서 처리해주어야할 기능들이 다양해질수록 서버에서 보관하거나 서버로 전달되어야할 데이터의 양이 많아졌고 그만큼 로직이 복잡해지고 그런만큼 재사용성을 유지하기가 어려워졌다.

차라리 클라이언트에서 Javascript코드로 필요한 상태와 데이터들을 관리하고, 데이터를 HTML로 바꾸는 랜더링도 직접 수행하면 좋지 않을까? 그래서 SPA가 등장했다. SPA에서는 서버와 정말로 필요한 데이터만 주고 받는다. 그러면 단순히 UI 를 위해서 서버와의 인터페이스가 복잡해지는 것은 막을 수 있기 때문이다.

그리고 SPA(Single Page Application)는 그 이름에서 알 수 있듯이 페이지 전환이 없다. 최초 하나의 페이지에서 시작한 클라이언트 어플리케이션은 죽지 않고 사용자의 액션에 대응해준다. 페이지 전환은 사용자에게 페이지가 마치 전환된 것처럼 다른 화면을 보여주고, URL만 바꿔치기 해주는 것이다. 페이지를 하나만 쓰면 한번 로딩한 라이브러리를 다시 로딩할 필요가 없는 장점도 얻을 수 있다. (물론 첫번째 페이지가 프로그램 로직에 관련한 모든것을 가지고 있기 때문에 최초 로딩 시간은 JSP 처럼 서버에서 랜더링하는 것보다 느릴 수 있다.)

# Node.js (서버사이드 Javascript  엔진)

SPA를 한다는 것은 Javascript를 그저 이벤트 핸들러 정도의 보조저긴 역할로만 사용하는 것이 아니라 프로그램의 핵심 로직들을 Javascript로 구현한다는 의미이다. 아이고. 그러고 보니 Javascript 배우랴 Java 배우랴 둘다 할까 힘들거 같다. 그래서 등장한 것이 Node.js 이다. Javascript 하나면 이젠 서버도 만들수 있게 된 것이다.

# NPM or YARN (Javascript의 모듈 관리)

Java의 Gradle 이나 Maven정도로 보면 되겠다. package.json 파일에서 빌드/패키징/테스트/실행등 필요한 동작들을 정의한다.

NPM 이 느리다고 생각해서 나온게 YARN 이다.

# Express.js (웹서버)

Node.js에서는 http 라이브러리를 써서 쉽게 웹서버를 만들어볼 수도 있다.

[https://www.sitepoint.com/creating-a-http-server-in-node-js/](https://www.sitepoint.com/creating-a-http-server-in-node-js/)

그래도 웹서버가 하는 일이 많아서 그냥 저렇게 손코딩하는것은 오바다. 찾아보니 여러가지가 많다.. Hapi, Express.js, Restify, Koa 등. 그런데 express 는 나중에 Node.js 자체에도 포함된 예정이라고 하니 일단 express 를 쓰기로 한다.

# ES2015 (새로운 Javascript 기능 명세)

브라우저에서 클래스 상속 같은것을 직접 코딩해본 사람들은 알겠지만, 엄청 못해먹을 짓이다. OOP 처럼 뭔가 모듈화 구조화 재사용성 확장성 등을 갖추기에는 ES5까지 Javascript가 부족한것이 많기 때문이다. 게다가 Javascript 코어 조차도 브라우저 마다 동작하는 방식이 달라서 정말 포기하고 싶은 심정이었다. 그런데 ES2015에서 이런것들을 보완할 수 있는 기능들이 명세로 되어 있다. class 가 이제는 Javascript 의 키워드가 된 것이다.

ES2015에서는 var 과 비슷한 const 와 let이 있다. const는 상수, let은 변수를 선언할때 쓴다. 가능하면 const 를 쓰고 피치 못한 경우는 let을 쓰자. var 은 이제 거의 쓸일이 없다.

그리고  ES2015에서는 함수를 이렇게 정의할 수 있다.

```javascript
const sum = (a,b) =a+b
```

function 키워드하고는 살짝 다르지만 거의 똑같다고 보면된다.

[https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

그밖에 수많은 멋진 기능들이 들어왔다.

[http://es6-features.org/](http://es6-features.org/)

아 참고로.. ES6 는 ES2015랑 같은거다.

# Babel and polyfill (언어 및 브라우저 호환성 도구)

ES2015에 멋진 기능들이 들어왔다하지만 브라우저에서 지원을 안해주면 쓸모가 없지 않은가!

Babel은 ES2015코드를 브라우저들에서 돌아가게 해주는 녀석이다. 마치 컴파일러처럼 동작하는데 어쨌든 Javascript에서 Javascript로 변환하는 것이라 트랜스파일러라고 부른다.

Polyfill 은 언어 명세보다는,, 기본적인 라이브러리 같은것들이 어떤 브라우저에 없을 경우 이를 비슷하게처리할수있도록 채워주는 녀석이다. 기능마다 Polyfill이 따로 존재하게 된다.

이제 우리는 ES2015로 작성한 Javascript를 대부분의 브라우저에서 돌릴수 있는 준비가 된 것이다.

# Webpack 의 HMR (빌드 엔진)

이건 웹개발을 위해 패키징 해주는 녀석이다. Java로 치면 war 파일 만들어주는 녀석쯤이라고 생각하면 될것 같다. 그런데 괜찮은 기능이 있다. 바로 HMR(Hot Module Reloading). 소스코드를 고치면 자동으로 웹서버에 반영될 뿐만 아니라 브라우저에 떠있는 페이지에도 자동으로 반영된다.

그밖에 이미지 파일이나 css 파일 같은것들도 Javascript 코드의 일부이냥 가져다 쓸수 있게 해준다.

```javascript
import animalImage from 'static/animalImage.jpg'
```

# React with JSX (뷰 프레임워크)

페이스북에서 만든 녀석. 화면에 그릴 녀석들을 컴포넌트 단위로 정의하고 그려준다. HTML 코드는 JSX 로 표현하는데 사실 HTML 비슷한거지 HTML이 아니다. React 엔진이 JSX코드를 가지고 여러과정을 거쳐서 HTML을 그려줄 것이다.

그리고 겁나 빠르다. 내부적으로 Virtual Dom  이라는 녀석이 있어서 바뀐 부분만 그려줄수 있다고 하는데,, 개발하는데는 99% 신경안써도 될것으로 보인다.

# Scss or Sass (동적 CSS 파일)

React를 사용하여 UI 컴포넌트 단위로 개발하고 싶은데,, CSS에서 사용하는 class값 같은 것들이 충돌이나면 화면이 깨질텐데 어떻게 하지? 그래서 나온게 이녀석들이다. class값을 이녀석들에서 불러와 사용하면 Webpack이 나중에 해당  클래스 이름을 충돌이 안나게 적당히 바꿔줄 것이다.

```javascript
import classes from 'myPage.scss'
```

# Redux (데이터 전달 방향에 대한 정의)

뭔가 데이터를 전달하는 방향을 정의한다는 점에서 스프링의 MVC와 비슷하다. 그러나 누가 누구에게 어떻게 전달하는지 에 대해서는 MVC 와 다르다. 잘은 모르지만 Flux라는 비슷한 녀석보다 이게 더 좋다고 한다. 일단 용어만 설명하고 넘어간다. (React와 같이 쓰는경우가 많지만 전혀 관련이 없는 독립적인 프레임워크이다.)

## store

store 는 웹 어플리케이션의 현재 상태(state)를 보관한다.

store 는 dispatch 함수를 가지고 있다.

store에는 dispatch함수의 동작을 재정의하여 처리하는 middleware를 등록할 수 있다.

## state

store에 저장된 상태 값이다.

상태는 UI상태일수도 있고 백앤드 서버에서 가져온 데이터일수도 있다.

(react 의 컴포넌트 내부의 state 와는 전혀 다른 녀석이다.)

## action

action은 state를 바꾸는 정보를 가지고 있는 객체이다.

```javascript
{
  id: 'SET_USER_NAME',
  payload: {
    name: 'James'
  }
}
```

이런식이다.

state를 바꾸는 방법은 action을 store에 dispatch 하는 방법 밖에 없다.

## reducer

상태값 변경 정의. action이 store의 dispatch 함수의 인자로 넘겨지면 store는 자신에게 등록된 reducer라는 녀석들에게 그 action을 전달한다. 그러면 각 reducer는 store의 상태를 변경한다.

## thunk middleware

store의 dispatch 함수에는 action이 아닌 다른 값도 인자로 전달할 수 있다. store에 thunk middleware 라는 것을 등록하고 같은 함수를 리턴하는 함수를 인자로 dispatch하면 비동기적인 처리를 할수 있다. 아래와 같은 녀석으로 dispatch를 불러주는 것이다.

```javascript
(
  (a,b,c) => {

    return (dispatch, getState) => {

    // 여기서 어떤 동작을 하고 나서, action을 만들어 dispatch 해준다.

    // 이 안에서 promise 를 사용하는 경우가 많다.

    }
  }
)
```

여기서 내부의 동작을 정의한 함수 부분을 thunk라고 부른다. 이 thunk를 처리한다고 하여 thunk middleware 라고 이름 지었다.

# Promise (Javascript 의 비동기 처리 기능)

비동기(asynchronous) 동작을 처리할때 사용한다. 어떤 동작을 해보고 성공하면 다음에 무엇을 할것이고 실패하면 무엇을 할것인지에 대한 정의이다. 좀 찾아서 따로 공부해볼 필요가 있다.

# Lint (코드 구문 검사 툴)

여러 개발자들이 협업할기 좋도록 코드 스타일을 통일 시켜주는 툴이다. 코드 줄도 맞춰주고 여러가지를 확인하고 안내해준다. 커맨드 라인에서 실행할수도 있지만 보통은 IDE에 플러그인으로 설치해서 사용한다.

# ATOM (IDE)

사실 IDE는 아무거나 쓰면된다. 난 그냥 이게 무료 중에서 사람들이 많이 쓰는편이라 쓰고 있다. 개인적으로 아직 이클립스만 못한것 같다. 이클립스보다 가볍긴 하지만.

# 마치며..

처음 Node.js 웹 개발을 시작하면, 생소한 용어가 너무 많아서 적응하는데 시간이 좀 걸린다. 아래 스타트업 키트를 분석하고 여러가지 용어들을 찾으면서 힘들게 공부했던 기억이 난다.

[https://github.com/davezuko/react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit)

(틀린 내용은 알려주시길~)
