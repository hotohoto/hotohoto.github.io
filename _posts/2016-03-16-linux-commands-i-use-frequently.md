---
id: 98
title: 'Linux commands I use frequently.'
date: 2016-03-16T16:49:52+00:00
author: hotohoto
layout: post
guid: http://www.jollybus.kr/?p=98
permalink: /2016/03/linux-commands-i-use-frequently/
categories:
  - dev
---


<h3>
  :common shell technics (pipe and redirection)
</h3>

<p>
  command_to_run | grep text_to_find<br /> command_to_run | more<br /> command_to_run > file_to_write_ouput.txt
</p>

<h3>
  :Reading or Editing a file
</h3>

<p>
  less abc.txt<br /> vim abc.txt<br /> tail -f abc.txt<br /> head abc.txt<br /> cat abc.txt
</p>

<h3>
  :Searching text in files
</h3>

<p>
  grep text_to_search -rniH .
</p>

<h3>
  :Managing files
</h3>

<p>
  ls<br /> ls -al<br /> ln -s abc def<br /> chown some_user_name:some_group_name -R *<br /> chmod +x command_to_run _later.sh<br /> rm<br /> rm -rf folder_name_to_delete_recursively_and_dangerously<br /> rmdir folder_name_to_delete<br /> touch filename<br /> tar cvzf abc.tgz source_folder_name_or_Filename<br /> tar xvzf abc.tgz
</p>

<h3>
  :Etc.
</h3>

<p>
  ps -ef<br /> netstat -an<br /> sudo command_to_run<br /> su<br /> su &#8211;<br /> wget http://www.abc.co.kr/file_to_download.txt<br /> history<br /> df -h<br /> mount -l<br /> ifconfig<br /> ping google.com<br /> export<br /> export ABC=DEF<br /> echo<br /> top<br /> service network restart<br /> source env_file_to_run
</p>