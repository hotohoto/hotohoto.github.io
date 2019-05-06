---
title: Discrete probability distributions
date: 2019-04-03 03:00:00 +09:00
categories:
- ai
layout: post
comments: true
---

## Bernoulli distribution

$$
X \sim Bern(p)
$$

- single experiment
- asks a yes-no question
- indicator random variable
  - 1: if it's the case
  - 0: otherwise

(pmf)
$$
Pr(X = 1) = p = 1 - q
$$

(expected value)

$$
E(X) = 0 \cdot Pr(X = 0) + 1 \cdot Pr(X = 1) = p
$$

## Binomial distribution

$X \sim Binom(n,p)$

- n draws
- k success
- without order
- with replacement

(pmf)

$$
P(k ; n, p) = P(X = k) = \binom{n}{k} p^k q^{n-k}
$$

(expected value)

$$
E(X) = \sum_{k=0}^{n}{k \binom{n}{k} p^{k}q^{n-k}} = \cdots = np
$$

This can be derived easily by the linearity property of expected value.

$$
X_i \sim Bern(p)\\
E(X) = E(X_1 + X_2 + \cdots + X_n) = np
$$

where $X_i$ is indicator random variables

## Multinomial distribution

$X \sim Multinom(n, p_1, p_2, \dots, p_k)$

- n draws
- $\sum_{i}^{k}{x_i} = n$
- $\sum_{i}^{k}{p_i} = 1$
- without order
- with replacement

For example k-sided dice.

(pmf)
$$
\Pr(X_{1}=x_{1}{\text{ and }}\dots {\text{ and }}X_{k}=x_{k}) =
\frac{n!}{x_1!\cdots x_k!} p_1^{x_1} \cdots p_k^{x_k}
$$

(expected value)

$$
\operatorname{E}(X_i) = n p_i
$$

## Geometric distribution

$X \sim Geom(p)$

- independent $Bern(p)$ trials
- count the number of failures before the first success

(pmf)

- $P(X = k) = q^kp$
- $k \in \{0,1,2,\cdots\}$

(validation of pmf)

$$
\begin{aligned}
\sum_{k=0}^{\infty}{q^kp} & = p \sum_{k=0}^{\infty}{q^k}\\
& = \frac{p}{1-q}\\
& = 1
\end{aligned}
$$

(expected value)

$$
\begin{aligned}
E(X) & = \sum_{k=0}^{\infty}{kq^kp}\\
& = p \sum_{k=1}^{\infty}{kq^k} \qquad \text{(1)}
\end{aligned}
$$

We can use the derivative of geometric series to solve this.

$$
\begin{aligned}
\sum_{k=0}^{\infty}{q^k} &= \frac{1}{1-q}\\
\sum_{k=1}^{\infty}{kq^{k-1}} &= \frac{1}{(1-q)^2}\\
\sum_{k=1}^{\infty}{kq^k} &= \frac{q}{p^2}\\
\end{aligned}
$$

By plugging this back into (1),

$$
E(X) = \frac{pq}{p^2} = \frac{q}{p}
$$

(story proof)

- Let's say $E(X) = c$ meaning we expect c failures before the first success.
- For the first trial we get the success with probability $p$ and in that case $X = 0$.
- For the first trial we get the failure with probability $q$ and the case means we got 1 failure and we'll be expecting c more failures again.

$$
c = E(X)\\
c = 0 \cdot p + (1 + c) \cdot q = q + cq\\
c = {q \over 1 - q} = {q \over p}
$$

## Hypergeometric distribution

- total $N$ balls
- total $K$ success balls
  - there are only 2 types of balls like binomial distribution
- $n$ draws
- without order
- without replacement
  - each draw is dependent to each other
  - This is different from Binomial distribution
  - That's why we cannot use term as we do in binomial distribution. We use capital letters $N$ and $K$ instead.

(pmf)
$$
p_{X}(k)=\Pr(X=k)={\frac { {\binom {K}{k}}{\binom {N-K}{n-k}} }{\binom {N}{n}}}
$$

(expected value)
$$
E(X) = n{K \over N}
$$

## Negative binomial distribution

$X \sim \operatorname {NB} (r,p)$

- k succeses
- before $r$ failures
- independent an identically distributed Bernoulli trials

The negative binomial distribution can be considered as generalization of geometric distribution. (In spite of the name, it's not obviously related to the binomial distribution.)

(pmf)
$$
{\displaystyle f(k;r,p)\equiv \Pr(X=k)={\binom {k+r-1}{k}}p^{k}(1-p)^{r}}
$$
(expected value)
$$
E(X) = {\frac {pr}{1-p}}
$$

## Poison Distribution

$X \sim Pois(\lambda)$

(pmf)
$${\displaystyle {\frac {\lambda ^{k}e^{-\lambda }}{k!}}}$$

(derivation)

- $X \sim Binom(n, p)$
- $n \to \infty$
- $p \to 0$
- such that $n \cdot p = c$

## References

- [Statistics 110 course of Harvard University](https://www.youtube.com/playlist?list=PL2SOU6wwxB0uwwH80KTQ6ht66KWxbzTIo)
- Wikipedia
