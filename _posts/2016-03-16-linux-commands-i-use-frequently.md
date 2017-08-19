---
title: Linux commands I use frequently.
date: 2016-03-16 16:49:52 Z
permalink: "/2016/03/linux-commands-i-use-frequently/"
categories:
- dev
id: 98
author: hotohoto
layout: post
guid: http://www.jollybus.kr/?p=98
---

### :common shell technics (pipe and redirection)
```
command_to_run | grep text_to_find

command_to_run | more

command_to_runfile_to_write_ouput.txt
```

### :Reading or Editing a file
```
less abc.txt

vim abc.txt

tail -f abc.txt

head abc.txt

cat abc.txt
```

### :Searching text in files
```
grep text_to_search -rniH .

### :Managing files

ls

ls -al

ln -s abc def

chown some_user_name:some_group_name -R *

chmod +x command_to_run _later.sh

rm

rm -rf folder_name_to_delete_recursively_and_dangerously

rmdir folder_name_to_delete

touch filename

tar cvzf abc.tgz source_folder_name_or_Filename

tar xvzf abc.tgz
```

### :Etc.
```
ps -ef

netstat -an

sudo command_to_run

su

su -

wget http://www.abc.co.kr/file_to_download.txt

history

df -h

mount -l

ifconfig

ping google.com

export

export ABC=DEF

echo

top

service network restart

source env_file_to_run
```
