---
title: tomcat + spring framework logging system 분석
date: 2014-01-20 06:56:45 Z
permalink: "/2014/01/tomcat-spring-framework-logging-%eb%b6%84%ec%84%9d/"
categories:
- dev
tags:
- JCL
- Juli
- log4j
- slf4j
- Spring
- tomcat
id: 46
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=46
---

## [1] 흐름

톰켓 + 스프링 + log4j 를 사용할 경우 스프링이 출력한 로그는 아래 같은 모듈간 흐름을 거쳐 로그가 발생하게 된다.

Spring > jcl-over-slf4j > SLF4J > slfj-log4j > log4j

스프링은 최초 로깅을 할때 META-INF/services/org.apache.commons.logging.LogFactory 에 등록된JCL 구현을 찾는다.

JCL 구현의 하나인 jcl-over-slf4j.jar 파일이 META-INF/services/org.apache.commons.logging.LogFactory 세팅을 가지고 있으므로, 별다른 설정 없이도 jcl-over-slf4j.jar 파일만 등록되어 있으면 JCL이 로딩된다.

## [2] 용어 설명.

### 1. JCL =(Jakarta) Commons Logging

- org.apache.common.logging 패키지를 사용한다.

- 아파치에서 만든 로깅 시스템.

- 스프링 프레임워크가 직접 사용하는 로깅 API.

- tomcat 도 예전에는 그대로 이걸 사용한 것으로 보인다.

### 2. SLF4J = Simple Logging Facade for Java

- slf4j-api

- 여러가지 로깅 시스템을 묶어주기 위한 인테페이스이다.

- 실재로 로깅을 처리하는 부분은 정의하지 않는다.

- JCL, JUL, Log4J와 연동하기 위한 커넥트 모듈이 각각 따로 존재한다.

### 3. log4j

- 실재 로깅하는 부분이다.

## [3] 톰켓 자체 로그 관련.

참고로 톰켓은 JULI 라고 부르는 로깅 모듈을 구현하여 사용한다.

JULI = java.util.logging Implementation

- JUL(java.util.logging) API의 구현이다.

- 아파치 톰켓에서 JCL을 수정하여 만들었음.

- webapp 별로 별개의 로깅 설정이 가능하다.

이걸 log4j 로 리다이렉션 하는 방법은 아직 찾지 못했다. 누가 좀 알려주세요.. 🙂
