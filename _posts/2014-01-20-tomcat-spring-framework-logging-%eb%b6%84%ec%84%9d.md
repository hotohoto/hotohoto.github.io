---
id: 46
title: 'tomcat + spring framework logging system 분석'
date: 2014-01-20T06:56:45+00:00
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=46
permalink: '/2014/01/tomcat-spring-framework-logging-%eb%b6%84%ec%84%9d/'
categories:
  - dev
tags:
  - JCL
  - Juli
  - log4j
  - slf4j
  - Spring
  - tomcat
---


<p>
  <b><span style="color: rgb(51, 51, 51);">[1] 흐름</span></b>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">톰켓 + 스프링 + log4j 를 사용할 경우 스프링이 출력한 로그는 아래 같은 모듈간 흐름을 거쳐 로그가 발생하게 된다.</span>
</p>

<p>
</p>

<p style="margin-left: 2em;">
  <b><span style="color: rgb(51, 51, 51);">Spring >&nbsp;jcl-over-slf4j&nbsp;> SLF4J >slfj-log4j >&nbsp;log4j</span></b>
</p>

<p>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">스프링은 최초 로깅을 할때&nbsp;</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">META-INF/services/org.apache.commons.logging.LogFactory 에 등록된&nbsp;</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent;"><span style="color: rgb(51, 51, 51);">JCL 구현을&nbsp;찾는다.</span><br /></span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">JCL 구현의 하나인&nbsp;jcl-over-slf4j.jar 파일이</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">&nbsp;</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">META-INF/services/org.apache.commons.logging.LogFactory 세팅을 가지고 있으므로,&nbsp;별다른 설</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">정 없이도 jcl-over-slf4j.jar</span><span style="font-size: 9pt; line-height: 1.5; background-color: transparent; color: rgb(51, 51, 51);">&nbsp;파일만 등록되어 있으면 JCL이 로딩된다.</span>
</p>

<p>
</p>

<p>
  <b><span style="color: rgb(51, 51, 51);">[2] 용어 설명.</span></b>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">1. JCL =&nbsp;</span><span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">(Jakarta) C</span><span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">ommons L</span><span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">ogging</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; org.apache.common.logging 패키지를 사용한다.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; 아파치에서&nbsp;만든 로깅 시스템.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; 스프링 프레임워크가 직접 사용하는 로깅 API.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; tomcat 도 예전에는 그대로 이걸 사용한 것으로 보인다.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;"><br /></span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">2. SLF4J = Simple Logging Facade for Java</span>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">&#8211; slf4j-api</span>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">&#8211; 여러가지 로깅 시스템을 묶어주기 위한 인테페이스이다.</span>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">&#8211; 실재로 로깅을 처리하는 부분은 정의하지 않는다.</span>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">&#8211; JCL, JUL, Log4J와 연동하기 위한 커넥트 모듈이 각각 따로 존재한다.</span>
</p>

<p>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">3. log4j</span>
</p>

<p>
  <span style="color: rgb(51, 51, 51);">&#8211; 실재 로깅하는 부분이다.</span>
</p>

<p>
</p>

<p>
  <b><span style="color: rgb(51, 51, 51);">[3] 톰켓 자체 로그 관련.</span></b>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">참고로 톰켓은 JULI 라고 부르는&nbsp;로깅 모듈을&nbsp;구현하여 사용한다.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">JULI = java.util.logging Implementation</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; JUL(java.util.logging) API의 구현이다.</span>
</p></p> 

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; 아파치 톰켓에서 JCL을 수정하여 만들었음.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">&#8211; webapp 별로 별개의 로깅 설정이 가능하다.</span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;"><br /></span>
</p>

<p>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5; color: rgb(51, 51, 51);">이걸 log4j 로 리다이렉션 하는 방법은 아직 찾지 못했다. 누가 좀 알려주세요..&nbsp;🙂</span>
</p></p> 

<p>
</p>