---
id: 47
title: 'CentOS 에 OpenSSL 1.0.1g 보안 업데이트 적용'
date: 2014-04-17T00:40:57+00:00
author: hotohoto
layout: post
guid: http://hotohoto82.cafe24.com/?p=47
permalink: '/2014/04/centos-%ec%97%90-openssl-101g-%eb%b3%b4%ec%95%88-%ec%97%85%eb%8d%b0%ec%9d%b4%ed%8a%b8-%ec%a0%81%ec%9a%a9/'
categories:
  - dev
tags:
  - CentOS
  - linux
  - OpenSSL
---


<p>
  <span style="color: #333333;">Heartbleed 라는 문제가 OpenSSL 에 취약점으로 등장하여 openssl 1.0.1.g 라는 버전이 나왔습니다.</span>
</p>

<p>
  <span style="color: #333333;">이걸 운영중인 CentOS에 업데이트하기 위해 다음 명령을 실행했습니다.</span>
</p>

<div class="txc-textbox" style="border: 1px dashed #c1c1c1; background-color: #eeeeee; padding: 10px;">
  <p>
    <span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;"># yum update openssl</span>
  </p>
</div>

<p>
  <span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">그리고 버전을 확인해 보았더니 버전이 1.0.1e 입니다.</span>
</p>

<div class="txc-textbox" style="border: 1px dashed #c1c1c1; background-color: #eeeeee; padding: 10px;">
  <p>
    <span style="color: #333333;"># rpm -q openssl</span>
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    <span style="color: #333333;">openssl-1.0.1e-16.el6_5.7.x86_64</span>
  </p>
</div>

<div>
</div>

<div>
  <span style="color: #333333;">그래서 처음에는 뭔가 적용이 덜 된 것으로 생각했다. 좀 더 자세한 정보를 찍어보았습니다.</span>
</div>

<div>
</div>

<div class="txc-textbox" style="border: 1px dashed #c1c1c1; background-color: #eeeeee; padding: 10px;">
  <p>
    <span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;"># rpm -qi openssl</span>
  </p>
  
  <p>
    <span style="color: #333333;">Name        : openssl                      Relocations: (not relocatable)</span>
  </p>
  
  <p>
    <span style="color: #333333;">Version     : 1.0.1e                            Vendor: CentOS</span>
  </p>
  
  <p>
    <span style="color: #333333;">Release     : 16.el6_5.7                    Build Date: Tue 08 Apr 2014 11:43:19 AM KST</span>
  </p>
  
  <p>
    <span style="color: #333333;">Install Date: Wed 16 Apr 2014 02:35:36 PM KST      Build Host: c6b10.bsys.dev.centos.org</span>
  </p>
  
  <p>
    <span style="color: #333333;">Group       : System Environment/Libraries   Source RPM: openssl-1.0.1e-16.el6_5.7.src.rpm</span>
  </p>
  
  <p>
    <span style="color: #333333;">Size        : 4209635                          License: OpenSSL</span>
  </p>
  
  <p>
    <span style="color: #333333;">Signature   : RSA/SHA1, Tue 08 Apr 2014 11:49:16 AM KST, Key ID 0946fca2c105b9de</span>
  </p>
  
  <p>
    <span style="color: #333333;">Packager    : CentOS BuildSystem <http://bugs.centos.org></span>
  </p>
  
  <p>
    <span style="color: #333333;">URL         : http://www.openssl.org/</span>
  </p>
  
  <p>
    <span style="color: #333333;">Summary     : A general purpose cryptography library with TLS implementation</span>
  </p>
  
  <p>
    <span style="color: #333333;">Description :</span>
  </p>
  
  <p>
    <span style="color: #333333;">The OpenSSL toolkit provides support for secure communications between</span>
  </p>
  
  <p>
    <span style="color: #333333;">machines. OpenSSL includes a certificate management tool and shared</span>
  </p>
  
  <p>
    <span style="color: #333333;">libraries which provide various cryptographic algorithms and</span>
  </p>
  
  <p>
    &nbsp;
  </p>
  
  <p>
    <span style="color: #333333;">protocols.</span>
  </p>
</div>

<div>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;"> </span>
</div>

<div>
  <span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">업데이트의 빌드 날자가 2014년 4월 8일인 걸보니 </span><span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">heartbleed</span><span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">  보안 이슈 발생 이후 </span><span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">등록된 것이네요.</span>
</div>

<div>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;"> </span>
</div>

<div>
  <span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">알고 보니. CentOS 에서는 </span><span style="font-size: 9pt; line-height: 1.5; color: #333333; background-color: transparent;">openssl-1.0.1e-16 이 1.0.1e 에 1.0.1g 의 heartbleed 보안 취약점 패치를 적용한 버전이라고 합니다.</span>
</div>

<div>
  <span style="background-color: transparent; font-size: 9pt; line-height: 1.5;"> </span>
</div>

<div>
  <span style="background-color: transparent;"><a class="tx-link" href="https://rhn.redhat.com/errata/RHSA-2014-0376.html" target="_blank"><span style="color: #333333;">https://rhn.redhat.com/errata/RHSA-2014-0376.html</span></a></span>
</div>

<div>
  <span style="background-color: transparent;"> </span>
</div>

<div>
  <span style="color: #333333; background-color: transparent;">리눅스 배포판별로 해당 패치가 적용된 rpm 패키지 버전이 다르니 궁금하신 분은 참고하시기 바랍니다.</span>
</div>

<div>
  <span style="background-color: transparent;"> </span>
</div>

<div>
  <span style="background-color: transparent;"><a class="tx-link" href="https://www.digitalocean.com/community/articles/how-to-protect-your-server-against-the-heartbleed-openssl-vulnerability" target="_blank"><span style="color: #333333;">https://www.digitalocean.com/community/articles/how-to-protect-your-server-against-the-heartbleed-openssl-vulnerability</span></a></span>
</div>

<div>
  <span style="background-color: transparent;"> </span>
</div>

<div>
  <span style="color: #333333;">참고로, OpenSSL 보안 업데이트 이후 OpenSSL을 사용하고 있는 프로세스/데몬들은 재시작해야 한다고 합니다. 가능하면 서버 재시작하는 것이 좋겠지요?</span>
</div>

<div>
</div>

<div>
  <span style="color: #333333;">heartbleed 취약점에 대한 상세한 설명도 있네요.</span>
</div>

<div>
  <a class="tx-link broken_link" href="http://www.krcert.or.kr/kor/data/secNoticeView.jsp?p_bulletin_writing_sequence=20884" target="_blank"><span style="color: #333333;">http://www.krcert.or.kr/kor/data/secNoticeView.jsp?p_bulletin_writing_sequence=20884</span></a>
</div>

<div>
</div>

<div>
  <span style="color: #333333;">이상입니다~</span>
</div>

<p>
  &nbsp;
</p>