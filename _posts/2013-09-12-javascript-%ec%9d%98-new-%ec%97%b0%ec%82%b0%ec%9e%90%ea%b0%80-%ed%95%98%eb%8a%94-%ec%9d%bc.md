---
id: 40
title: 'javascript 의 new 연산자가 하는 일.'
date: 2013-09-12T03:49:00+00:00
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=40
permalink: '/2013/09/javascript-%ec%9d%98-new-%ec%97%b0%ec%82%b0%ec%9e%90%ea%b0%80-%ed%95%98%eb%8a%94-%ec%9d%bc/'
categories:
  - dev
---


<p style="margin: 0px 0px 1em; padding: 0px; color: rgb(64, 64, 64); text-align: justify; border: 0px; vertical-align: baseline; clear: both; word-wrap: break-word;">
  <font face="Arial, Liberation Sans, DejaVu Sans, sans-serif"><span style="font-size: 14px; line-height: 17.59375px;">javascript 의 new 연산자가 하는 일을 설명하면 다음과 같다.</span></font>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; color: rgb(64, 64, 64); text-align: justify; border: 0px; vertical-align: baseline; clear: both; word-wrap: break-word;">
  <font face="Arial, Liberation Sans, DejaVu Sans, sans-serif"><span style="font-size: 14px; line-height: 17.59375px;"><br /></span></font>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  new C(arg1, arg2);
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  라는 표현이 있다고 하자. (여기서 C는 미리 정의된 어떤 함수이다)
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  javascript 엔진은 내부적으로 다음과 같은 일을 한다.&nbsp;
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <span style="font-size: 13.600000381469727px; line-height: 17.600000381469727px;">1. 비어있는 객체 c&#8217; 를 만든다. (아무런 속성이 없는 객체이다.)</span>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <span style="font-size: 13.600000381469727px; line-height: 17.600000381469727px;">2. 만들어진 객체 c&#8217; 의 __proto__ 속성을 C 함수의 prototype 속성 값을 복사해서 가리키도록 한다.</span>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <span style="font-size: 13.600000381469727px; line-height: 17.600000381469727px;">&#8211; prototype 이라는 속성은 함수에만 존재한다.</span>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <span style="font-size: 13.600000381469727px; line-height: 17.600000381469727px;">3. C 함수를 실행한다. 단 함수가 실행되는 동안 this 라는 키워드가 만들어진 객체 c&#8217; 를 가리키도록 한다.</span>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  4. C 함수는 어떤 다른 값을 리턴할 수도 있고, 그렇지 않으면 만들어진 객체 c&#8217; 를 리턴한다.
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  &nbsp;
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  &nbsp;
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  참고 원문:
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <a href="http://stackoverflow.com/questions/6750880/javascript-how-does-new-work-internally" target="_blank" class="con_link" style="word-wrap: break-word; font-family: 돋움, Dotum, Helvetica, sans-serif; font-size: 12px; line-height: 1.5;">http://stackoverflow.com/questions/6750880/javascript-how-does-new-work-internally</a>
</p>

<p style="margin: 0px 0px 1em; padding: 0px; line-height: 17.600000381469727px; color: rgb(64, 64, 64); text-align: justify; border: 0px; font-size: 13.600000381469727px; vertical-align: baseline; clear: both; word-wrap: break-word; font-family: Arial, 'Liberation Sans', 'DejaVu Sans', sans-serif;">
  <span style="font-size: 9pt;"><a href="http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript" target="_blank" class="con_link" style="word-wrap: break-word;">http://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript</a></span>
</p>