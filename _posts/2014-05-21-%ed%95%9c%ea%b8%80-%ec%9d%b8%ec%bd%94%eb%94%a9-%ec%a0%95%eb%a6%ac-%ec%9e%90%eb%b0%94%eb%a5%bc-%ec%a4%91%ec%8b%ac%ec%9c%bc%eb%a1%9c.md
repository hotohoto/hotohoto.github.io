---
id: 50
title: '한글 인코딩 정리 (자바를 중심으로)'
date: 2014-05-21T06:18:19+00:00
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=50
permalink: '/2014/05/%ed%95%9c%ea%b8%80-%ec%9d%b8%ec%bd%94%eb%94%a9-%ec%a0%95%eb%a6%ac-%ec%9e%90%eb%b0%94%eb%a5%bc-%ec%a4%91%ec%8b%ac%ec%9c%bc%eb%a1%9c/'
categories:
  - dev
tags:
  - ASCII
  - Character Set
  - CP949
  - Encoding
  - ISO-8859-1
  - Java
  - Unicode
  - 통합완성형한글
---


<div>
  <h4>
    [1] 요약
  </h4>
</div>

<div dir="ltr">
  <table>
    <colgroup> <col width="20%" /> <col width="20%" /> <col width="20%" /> <col width="40%" /></colgroup> <tr>
      <th>
        <p dir="ltr">
          인코딩<br /> (코드페이지)
        </p>
      </th>
      
      <th>
        <p dir="ltr">
          자바의 대응<br /> 인코딩
        </p>
      </th>
      
      <th>
        <p dir="ltr">
          문자셋
        </p>
      </th>
      
      <th>
        <p dir="ltr">
          비고
        </p>
      </th>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          ASCII<br /> =US-ASCII
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          US-ASCII
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          (인코딩과 동일)
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          기본적으로 0~127까지의 7bit 임.
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          ISO 8859-1
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          ISO-8859-1
        </p>
      </td>
      
      <td>
      </td>
      
      <td>
        <p dir="ltr">
          8bit 코드.<br /> 확장(extended) ASCII 의 일종으로 분류하기도 함.
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          windows-1252 = cp-1252
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          windows-1252
        </p>
      </td>
      
      <td>
      </td>
      
      <td>
        <p dir="ltr">
          8bit 코드.<br /> 영문 윈도우에 기본적으로 사용되는 인코딩(?)
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          euc-kr
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          EUC-KR
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          ks x 1001<br /> =ks c 5601
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          한글 2350자
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          (windows 95 이전 cp949)
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          x-IBM949<br /> = Cp949<br /> 또는<br /> x-IBM949C<br /> = Cp949C
        </p>
      </td>
      
      <td>
      </td>
      
      <td>
        <p dir="ltr">
          한글 2620자.<br /> euc-kr 에 비해 한글은 추가되었고, 특수문자, 한자의 포함여부가 약간 차이가 난다. x-IBM949C는 xIBM949와달리  0x5c이 원화표시가 아닌 역슬래시를 (\) 의미함.
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          windows-949<br /> = ms-949<br /> = cp-949
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          x-windows-949<br /> = MS949
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          UHC(Unified Hangul Code)<br /> = 확장 완성형<br /> = 통합형 한글 코드
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          한글 11172자<br /> (ks X 1001 에 8822자 추가)<br /> IANA에 등록되어 있지 않아서 통신용으로 사용할 수 없음.
        </p>
      </td>
    </tr>
    
    <tr>
      <td>
        <p dir="ltr">
          utf-8<br /> utf-16le<br /> utf-16be<br /> utf-32le<br /> utf-32be
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          UTF-8<br /> UTF-16<br /> UTF-16BE<br /> UTF-16LE<br /> UTF-32<br /> UTF-32BE<br /> UTF-32LE
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          UCS
        </p>
      </td>
      
      <td>
        <p dir="ltr">
          유니코드.
        </p>
      </td>
    </tr>
  </table>
</div>

<p>
  &nbsp;
</p>

<h4>
  [2] 부연 설명
</h4>

<ul>
  <li>
    <p dir="ltr">
      문자셋(Chracter Set)과 인코딩(Encoding)은 다른 개념.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      유니코드 문자셋에서 ‘가’ 는 U+AC00 값으로 표현함.<br /> 그러나 이것을 데이터로 저장할때는 인코딩의 종류(utf-8, utf-16be, utf-16le, utf-32be, utf-32le) 에 따라  대응하는 값이 각각 다르다.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      US-ASCII 처럼 인코딩과 문자셋이 개념상 구분없이 사용될 수도 있는 경우도 있음.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      CP(Code Page)는 문자셋보다는 인코딩 개념임.
    </p>
  </li>
</ul>

<div>
</div>

<ul>
  <li>
    <p dir="ltr">
      CP949는 마이크로소프트사가 만들었음.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      CP949는 최초에는 일부 한글만 표현 가능하였으나 윈도우 95부터는 확장 완성형(UHC)을 지원하여 모든 현대 한글 11172자를 표현할 수 있게되었음.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      일반적으로 CP949는 확장 완성형을 모두 표현할수 있는 현재의 윈도우 한글 인코딩 방식을 의미 하나, 자바에서는 CP949가 예전의 한글 2350자만을 포함하는  문자셋/인코딩을 지칭할 때 사용하는 것으로 보임. 자바는 대신 x-windows-949 를 현재의 확장 완성형을 지원하는 한글 인코딩/문자셋을 지칭할 때 사용함.
    </p>
  </li>
</ul>

<div>
</div>

<ul>
  <li>
    <p dir="ltr">
      윈도우 계열 인코딩을 ANSI라고 부르기도 하나 잘못된 표현임.
    </p>
  </li>
  
  <li>
    <p dir="ltr">
      SBCS, DBCS, MBCS, WBCS는 주로 윈도우에서 프로그램이 메모리상의 문자열을 다루는 것과 관련하여, 문자셋들을 구분/분류하기 위해 사용하는 용어로 보임. SBCS는 주로 ASCII 계열에 대응하고 WBCS는 16비트 유니코드 문자셋에 대응한다고 보면 될듯.
    </p>
  </li>
</ul>

<div>
</div>

<h4>
  [3] 분석 및 테스트에 관하여..
</h4>

<div>
  참고 문서들에 나와있는 설명으로는 자바에 정의된 문자셋 간의 차이가 명확해 보이지지 않은 점들이 있었습니다.
</div>

<div>
  그래서 x-IBM949C와 x-IBM949 의 차이 등을 확인하기 위하여, 인터넷에 공개된 sun java 소스코드를 직접 분석하여 판단하였음을 알려드립니다.
</div>

<div>
</div>

<div>
  그리고 EUC-KR, x-IBM949, x-windows-949 의 문자셋의 범위를 확인하기 위해 유니코드를 기준으로 어떤 문자가 포함되어있고 어떤 문자는 빠져있는지 아래에 작성한 프로그램으로 테스트 해보았습니다.
</div>

<div>
</div>

<div>
  <p>
    <a href="http://hotohoto82.cafe24.com/wp-content/uploads/1/cfile26.uf.267CB04E537C486F225CC5.java">EncodingTest3.java<br /> </a><a href="http://hotohoto82.cafe24.com/wp-content/uploads/1/cfile29.uf.2733504E537C4870034E4F.txt">EUC-KR.txt<br /> </a><a href="http://hotohoto82.cafe24.com/wp-content/uploads/1/cfile5.uf.233F194E537C487030D1B6.txt">x-IBM949.txt<br /> </a><a href="http://hotohoto82.cafe24.com/wp-content/uploads/1/cfile3.uf.2260D74E537C487013D055.txt">x-windows-949.txt</a>
  </p>
</div>

<div>
  첨부해드린 파일을 Winmerge 등의 툴을 사용해서 확인해보시면 명확하게 파악하실 수 있으실것 같네요.
</div>

<div>
</div>

<h4 dir="ltr">
  [4] 참고
</h4>

<p dir="ltr">
  (특히 아래 세가지는 한글 인코딩/문자셋에 개념을 잡아주는데 좋은 글입니다.)
</p>

<p dir="ltr">
  <a href="http://helloworld.naver.com/helloworld/19187">http://helloworld.naver.com/helloworld/19187<br /> </a><a href="http://helloworld.naver.com/helloworld/76650" target="_blank">http://helloworld.naver.com/helloworld/76650<br /> </a><a href="http://jinuine.blogspot.kr/2013/09/ms949.html">http://jinuine.blogspot.kr/2013/09/ms949.html</a>
</p>

<p>
  &nbsp;
</p>

<p>
  (아래는 정리하면서 함께 참고한 글들입니다.)
</p>

<p dir="ltr">
  <a href="http://ko.wikipedia.org/wiki/KS_X_1001">http://ko.wikipedia.org/wiki/KS_X_1001<br /> </a><a href="http://ko.wikipedia.org/wiki/KS_X_1003">http://ko.wikipedia.org/wiki/KS_X_1003<br /> </a><a href="http://ko.wikipedia.org/wiki/EUC-KR">http://ko.wikipedia.org/wiki/EUC-KR<br /> </a><a href="http://ko.wikipedia.org/wiki/%EC%BD%94%EB%93%9C_%ED%8E%98%EC%9D%B4%EC%A7%80_949">http://ko.wikipedia.org/wiki/%EC%BD%94%EB%93%9C_%ED%8E%98%EC%9D%B4%EC%A7%80_949<br /> </a><a href="http://en.wikipedia.org/wiki/ISO/IEC_8859-1">http://en.wikipedia.org/wiki/ISO/IEC_8859-1<br /> </a><a href="http://en.wikipedia.org/wiki/Windows-1252">http://en.wikipedia.org/wiki/Windows-1252<br /> </a><a href="http://www.iana.org/assignments/character-sets/character-sets.xhtml">http://www.iana.org/assignments/character-sets/character-sets.xhtml<br /> </a><a href="http://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html">http://docs.oracle.com/javase/8/docs/technotes/guides/intl/encoding.doc.html</a>
</p>

<p>
  (혹시, HTTP나, HTML, 그리고 톰켓과 관련한 사항이 궁금하시다면 아래 글을 정독해보세요. 제일 명확한 설명인듯 하더군요.)
</p>

<p>
  <a href="http://wiki.apache.org/tomcat/FAQ/CharacterEncoding" target="_blank">http://wiki.apache.org/tomcat/FAQ/CharacterEncoding</a>
</p>