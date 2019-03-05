---
title: Python Introduction
date: 2019-03-06 02:00:00 +09:00
categories:
- dev
layout: post
---

## Goals
- to be able to use numpy, tensorflow, pandas, scikit-learn, jupyter notebook

## Strategy
- introduce programming environments
- expose the goal as demo
- expose the essential concepts with minimal code examples
- visit concepts one by one
  - mindmap
  - in detail with many examples
- recap previous lessons at the beginning of the lesson
- recap current lesson at the end

## Topics
- types
- collection types
- operators
- operator precedence
- loop
- conditional statements
- function
- scope
- class
- exception
- io
- standard libraries
- git
- pip
- virtual environment
- shell and terminal
- markdown
- csv
- jupyter notebook
- numpy
- pandas
- pytorch
- lambda
- functional programming

## Lessons

### 0 demo
git
jupyter notebook
matrix multiplication
tensorflow machine learning example

### 1 setup

install programs
- git
- vscode
- python3

git clone
activate virtual environments
```sh
python -m venv venv
venv/Scripts/activate
```
install requirements using pip

try environments
- REPL(Read-Eval-Print Loop)

```py
1
2
1+2
1 + 2
None
print(None)
print(1)
print(1+2)
print(1, 2)
print
import sys
print(sys)
print(sys.version)
def mean(a, b)
mean
mean(3, 4)
2 + mean(3, 4) + 5
1 + 2 * 3 + 5
(1 + 2) * (3 + 5)
# this is a comment
mean(3, 4) # will be evaluated as the average of 3 and 4
```
- command line
  - with interactive user input
  - with arguments

- jupyter notebook

topics covered
- environments
- evaluation
- function and function call
- print
- input
- programming environments
- comments

topics exposed
- git clone
- vscode
- virtual environment
- pip
- path
- operator precedences
- using module

### 2 types

types
- bool
- int
- float
- str
- module
- function
- ...

```py
type(1)
type(2)
type(2.0)
type(3/2)
type(3.0/2)
type(0.2)
type(.2)
type("3")
type('3')
type("hello")
type([3, 4])
sum([3,4])
type(sum)
sum(sum[3,4])
type(None)
type("None")
type(print)
def mean(a, b):
  return (a + b) / 2
type(mean)
type(mean(1, 2))
class dummy:
  pass
import sys
type(sys)
type(sys.version)
type(dummy)
type(True)
type(False)
type(print("hi"))
type(int("3"))
type(float("3"))
type(str(3))
3 + 2
"3" + 2
float("3") + 2
int("3") + 2
"3" + str(2)
```


topics covered
- dir()
- type()
- casting

topics exposed
- list
- class
- pass


### 3 operators and precedences
arithmetic operators
```py
2**3
10%2
10/3
10//3
"hi"*3
"hi" + "hi"
```

comparison operators
```py
(3 == 4) == False
3 == False
3 + 4 > 2
2 + 1 <= 2
3 != 4
```
assignment operators
```py
a = 7
c = b = a + 1
d, e = a, b
c += 1 # c = c + 1
d *= 2
a //= 3
```

logical operators
```py
False and False
False or True
False and 3
False or 3
None and 3
None or 3
print("Hello") and print("Hi")
print("Hello") or print("Hi")
```

identity operators
```py
3 == 3.0
3 is 3.0
is not
```

membership operators
```py
5 in [2, 5, 6]
3 in [2, 5, 6]
3 not in  [2, 5, 6]
```

bitwise operators
```py
a = 60 # 0011 1100
b = 13 # 0000 1101

a&b    # 0000 1100 - binary and
a|b    # 0011 1101 - binary or
a^b    # 0011 0001 - binary xor
~a     # 1100 0011 - binary ones complement
a >> 4 # 0000 0011 - binary left shift
b << 4 # 1101 0000 - binary right shift
```

ternery operator
```py
a = "same" if 3==4  else "different"
```

### 4 loops and conditional statements

- if
- else
- while
- for
- break
- continue
- range

examples


### 5 function and scopes

- lambda function
```py
(lambda x: x + 1)(4)
```

- globals()
- locals()
- dir()

- generator function
  - https://www.programiz.com/python-programming/generator
  - `__iter__()`
  - `__next__()`
  - `yield`
  - `next()`

```py
print('r:')
r = range(4)
for i in r:
  print(i)

def gen():
  yield 1
  yield 2
  yield 3
  yield 7

print('\ng1:')
g1 = gen()
for i in g1:
  print(i)

print('\ng2:')
g2 = gen()
print(next(g2))
print(next(g2))
print(next(g2))
print(next(g2))
print(next(g2))
```

- recursive function

```py
def fibo(n):
   if n == 1:
       return 1
   if n == 2:
       return 1
   return fibo(n - 2) + fibo(n - 1)

for i in range(10):
   print(fibo(i+1))
```

### 6 collections

- dict
- tuple
- list
- set

```py
mydict = {'a': 3, 'b': 4, 'c': 5}
mydict['a']
keyset = set(mydict)
myset = {}
for k in mydict:
  myset.add(mydict[])
mylist = []
for k in mydict:
  mylist.append(k * mydict[k])
mylist[0]
mytuple = tuple(mylist)
```

- list comprehension
  - https://www.pythonforbeginners.com/basics/list-comprehensions-in-python
  - `new_list = [expression(i) for i in old_list if filter(i)]`

```py
x1 = [i for i in range(10)]
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

x2 = [i for i in range(10) if i % 2 == 0]
# [0, 2, 4, 6, 8]

x3 = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

list1 = [3,4,5]
x4 = [item*3 for item in list1]
# [9,12,15]

listOfWords = ["this","is","a","list","of","words"]
x5 = [ word[0] for word in listOfWords ]
# ['t', 'i', 'a', 'l', 'o', 'w']

string = "Hello 12345 World"
x6 = [x for x in string if x.isdigit()]
# ['1', '2', '3', '4', '5']

x7 = [x*2 for x in range(10) if x%2==0]
# [0, 4, 8, 12, 16]
```

### 7 class

- `__init__`
- inheritance
- `__add__`
- `__call__`

examples
```py
class dummy():
  def __call__(self):
    print("Hello")

d = dummy()
d()
```
### 8 exception handling
examples

### 9 `with` clause and file IO

examples

### 10 numpy, pandas, pytorch

examples

## References
- https://docs.python.org/3/tutorial/
- https://www.w3schools.com/python/
- https://www.tutorialspoint.com/python/
- https://tutorial.djangogirls.org/ko/python_introduction/
- https://nolboo.kim/blog/2013/10/06/github-for-beginner/
