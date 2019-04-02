---
title: Counting strategies
date: 2019-04-03 02:00:00 +09:00
categories:
- ai
layout: post
---

## Binomial coefficient

$$
{\displaystyle {\begin{array}{rcl}(1{+}x)^{4}&=&{\tbinom {4}{0}}x^{0}+{\tbinom {4}{1}}x^{1}+{\tbinom {4}{2}}x^{2}+{\tbinom {4}{3}}x^{3}+{\tbinom {4}{4}}x^{4}\\&=&1+4x+6x^{2}+4x^{3}+x^{4},\end{array}}}
$$

where

$$
{\binom {n}{k}} = \text{n choose k} = {\frac {n!}{k!(n-k)!}}
$$
.

## Ball picking

Consider an infinite repository containing balls of $n$ different types. Then the following table summarizes the number of distinct ways in which $k$ balls can be picked for four common definitions of "distinct."

- $n$ types
- pick $k$ times
- count number of possible outcomes

|category|number of possible outcomes|
|---|---|
|ordered sampling with replacement|$n^k$|
|ordered sampling without replacement|$P(n,k)={n\cdot (n-1)\cdot (n-2)\cdots (n-k+1)}$|
|unordered sampling without replacement|$\binom{n}{k}$|
|unordered sampling with replacement|$\binom{n + k - 1}{k}$|

The last case can be considered k icecream scoops with (n - 1) moves to the next type.

## Story proof

(proof by interpretation)

### example 1

$$
\binom{n}{k} = \binom{n}{n-k}
$$

Chooseing $k$ people out of $n$ people is also picking the other $n-k$ people not to choose.

### example 2

$$
n{\binom{n-1}{k-1}} = k{\binom{n}{k}}
$$

To pick a leader from a group of $k$ members,

- we can choose a leader and make a club of $k-1$ members out of $n - 1$ people. Or,
- we can make a club of $k$ members and choose a leader out of a group.

### example 3 - Vandermonde Identity

$$
{\binom{m+n}{k}} = {\sum_{j=0}^{k}\binom{m}{j}}{\binom{n}{k-j}}
$$

## References

- [Statistics 110 course of Harvard University](https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo)
