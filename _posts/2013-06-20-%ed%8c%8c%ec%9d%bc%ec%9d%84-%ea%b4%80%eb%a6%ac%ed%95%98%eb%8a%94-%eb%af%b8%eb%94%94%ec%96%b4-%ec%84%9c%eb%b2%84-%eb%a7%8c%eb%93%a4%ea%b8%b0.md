---
id: 28
title: '(파일을 관리하는) 미디어 서버 만들기.'
date: 2013-06-20T03:48:00+00:00
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=28
permalink: '/2013/06/%ed%8c%8c%ec%9d%bc%ec%9d%84-%ea%b4%80%eb%a6%ac%ed%95%98%eb%8a%94-%eb%af%b8%eb%94%94%ec%96%b4-%ec%84%9c%eb%b2%84-%eb%a7%8c%eb%93%a4%ea%b8%b0/'
categories:
  - dev
---


<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  클라이언트에서 서버로 파일을 올리고 내리고 관리하는 로직은 꽤나 복잡하다.
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  &#8211; 파일을 업로드하면 파일의 용량 / 파일의 보안 안전성 검사, 그리고 미디어 파일의 초기 변환 작업 등이 필요하다.
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  <span style="line-height: 1.5;">&#8211; 썸네일 처럼 여러개의 파일을 만들어 관리하고 처리하다 보면 파일 관리가 복잡해진다.</span>
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  <span style="line-height: 1.5;">&#8211; 웹서버가 파일의 물리적 위치까지 직접 관여할 필요는 없다. (코드의 복잡성이 증가한다.)</span>
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  <span style="line-height: 1.5;">&#8211; 요구사항은 바뀌기 마련이다. 서비스가 개편되면 이미지 사이즈가 바뀔 것이다.</span>
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  &nbsp;
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  그래서 이 부분은 별도의 서비스로 관리하는 것이 좋을것 같다.
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  네이버 파일 서버의 URL을 토대로 대략적으로 파악한 것과, 회사 프로젝트를 하며 느꼈던 점을 토대로.. 미디어 서버의 요구사항을 잡아본다.
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  &nbsp;
</p>

<ul style="margin: 0px 0px 0px 3.5em; padding: 0px; list-style-position: initial; list-style-image: initial; text-align: justify;">
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;">임시 파일에 사용한 handle을 영구 파일의 handle에도 그대로 사용한다.</span>
  </li>
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;">임시 파일을 영구파일로 변환하는 요청을 처리한다.</span>
  </li>
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;">클라이언트는 미디어 서버로 파일을 업로드하고 업로드 결과와 handle을 json 형식의 응답으로 받는다.</span>
  </li>
  <li style="color: rgb(64, 64, 64);">
    파일 업로드 경로는&nbsp;<a href="http://media.myserver.co.kr/upload/spec_name" target="_blank" class="con_link" style="word-wrap: break-word;">http://media.myserver.co.kr/upload/spec_name</a>&nbsp;(기존 대형 서비스들에서는 어떻게 하는지 확인 필요..)
  </li>
  <li style="color: rgb(64, 64, 64);">
    필요한 경우 로그인 처리할 수 있어야 함. (SSO 처리 스터디 필요.)
  </li>
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;">미디어 파일 별로 필요한 스펙을 미리 정의하여 설정 파일에 둔다.</span>
  </li>
  <ul style="color: rgb(64, 64, 64); margin: 0px 0px 0px 3.5em; padding: 0px; list-style: circle;">
    <li>
      <span style="line-height: 1.5;">최대 파일의 용량</span>
    </li>
    <li>
      <span style="line-height: 1.5;">최대, 최소 가로,세로 사이즈</span>
    </li>
    <li>
      <span style="line-height: 1.5;">미디어 품질</span>
    </li>
    <li>
      <span style="line-height: 1.5;">cropping 전략</span>
    </li>
    <li>
      <span style="line-height: 1.5;">허용되는 파일 확장자</span>
    </li>
    <li>
      <span style="line-height: 1.5;">변형 파일 생성 정책</span>
    </li>
    <li>
      내용을 기반으로 하여 썸네일을 생성하기 힘든 파일에 대한 기본 이미지 제공 기능.
    </li>
    <li>
      <span style="line-height: 1.5;">임시파일 생성 정책 &#8211; 필수/선택/사용안함.</span>
    </li>
    <li>
      <span style="line-height: 1.5;">임시파일 삭제 정책 &#8211; m분 동안 사용하지 않았으면 삭제 가능.</span>
    </li>
    <li>
      <span style="line-height: 1.5;">영구파일 변환 권한 &#8211; 특정 IP</span>
    </li>
    <li>
      <span style="line-height: 1.5;">파일 삭제 권한 &#8211; 특정 IP</span>
    </li>
    <li>
      분당 최대 허용 파일 업로드 개수. &#8211; 최대 허용개수.
    </li>
  </ul>
  
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;">클라이언트는 미디어 서버에 handle을 가지고 접근한다.</span>
  </li>
  <li style="color: rgb(64, 64, 64);">
    <span style="line-height: 1.5;"><a href="http://media.myserver.co.kr/handle/variant_code_defined_in_spec" target="_blank" class="con_link" style="word-wrap: break-word;">http://media.myserver.co.kr/handle/variant_code_defined_in_spec</a></span>
  </li>
  <li style="color: rgb(64, 64, 64);">
    파일 스펙은 이미 서비스를 시작한 시점에도 요구사항에 맞게 변경될 수 있다.
  </li>
  <li style="color: rgb(64, 64, 64);">
    클라이언트가 특정 변형된 파일을 요청하였을때 아직 파일이 준비되지 않았다면 바로 파일을 변형하여 전달해준다.
  </li>
  <li style="color: rgb(64, 64, 64);">
    서비스 거부 공격을 차단할 수 있어야 한다.
  </li>
  <ul style="color: rgb(64, 64, 64); margin: 0px 0px 0px 3.5em; padding: 0px; list-style: circle;">
    <li>
      웹서버가 미디어서버에 토큰을 요청한다.
    </li>
    <li>
      이 토큰은 정해진 시간 안에만 유효하다. 로그인 세션 시간 보다만 길면 된다.
    </li>
    <li>
      클라이언트는 이 토큰이 포함된 URL을 통하여 미디어 서버에 파일을 업로드한다.
    </li>
    <li>
      토큰이 없는 파일 업로드 요청은 처리하지 않는다.
    </li>
  </ul>
  
  <li style="color: rgb(64, 64, 64);">
    보안상의 문제로 파일 삭제및 임시파일 삭제 처리 기능은 별도 서버로 구성하는 것도 고려되어야 할 수도 있다.
  </li>
  <li style="color: rgb(64, 64, 64);">
    임시파일은 주기적으로 제거되어야 한다.
  </li>
  <li style="color: rgb(64, 64, 64);">
    파일 다운로드는 톰캣에서도 할 수 있게 서블릿으로 구현한다.
  </li>
  <ul style="color: rgb(64, 64, 64); margin: 0px 0px 0px 3.5em; padding: 0px; list-style: circle;">
    <li>
      설정 파일로 저장된 미디어 파일들의 위치를 자유롭게 변경할 수 있다.
    </li>
    <li>
      <a href="http://stackoverflow.com/questions/1812244/simplest-way-to-serve-static-data-from-outside-the-application-server-in-a-java" target="_blank" class="con_link" style="word-wrap: break-word;">http://stackoverflow.com/questions/1812244/simplest-way-to-serve-static-data-from-outside-the-application-server-in-a-java</a>
    </li>
  </ul>
  
  <li style="color: rgb(64, 64, 64);">
    썸네일 생성 요구사항 (예)
  </li>
  <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; list-style-position: initial; list-style-image: initial; text-align: justify;">
    <li style="color: rgb(64, 64, 64);">
      썸네일을 생성할 수 있으면 미리 주어진 설정을 따라 만든다.
    </li>
    <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; list-style-position: initial; list-style-image: initial; text-align: justify;">
      <li style="color: rgb(64, 64, 64);">
        썸네일의 크기는 달라질 수 있다.
      </li>
      <li style="color: rgb(64, 64, 64);">
        썸네일을 디스크에 저장할지를 옵션으로 지정할 수 있다.
      </li>
    </ul>
    
    <li style="color: rgb(64, 64, 64);">
      대표 아이콘을&nbsp;리턴할 수 있게 해준다.
    </li>
    <ul style="margin-top: 0px; margin-right: 0px; margin-bottom: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; list-style-position: initial; list-style-image: initial; text-align: justify;">
      <li style="color: rgb(64, 64, 64);">
        확장자에 따라 다른 아이콘을 리턴한다.
      </li>
      <li style="color: rgb(64, 64, 64);">
        크기별로 다른 아이콘 셋이 있을 수 있다.
      </li>
    </ul>
  </ul>
</ul>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  &nbsp;
</p>

<p style="margin: 0px; padding: 0px; color: rgb(64, 64, 64); text-align: justify;">
  &nbsp;이상ㅋ
</p>