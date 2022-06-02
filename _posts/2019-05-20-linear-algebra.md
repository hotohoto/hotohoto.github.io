---
title: Linear Algebra
date: 2019-05-20 13:00:00 +09:00
categories:
- ai
layout: post
comments: true
---

## Elementary matrix

- elementary matrix
  - types
    - Row-switching transformations
      - The inverse of this matrix is itself
      - The determinant is -1
    - Row-multiplying transformations
      - The inverse of this matrix can be made by replacing the changed element with its reciprocal
      - The determinant is 1/m
    - Row-addition transformations
      - The inverse of this matrix can be made by multiplying -1 to the added element.
      - The determinant is 1.

References:

- [https://en.wikipedia.org/wiki/Elementary_matrix](https://en.wikipedia.org/wiki/Elementary_matrix)
- [http://sites.millersville.edu/bikenaga/linear-algebra/inverse/inverse.html](http://sites.millersville.edu/bikenaga/linear-algebra/inverse/inverse.html)

## Linearly dependent

- at least one of the vectors in a set can be defined as a linear combination of the others

## Linearly independent

- no vector in a set can be written as a linear combination of the others.
- there is no solution of $x$ but the zero vector for $Ax = 0$.

## Ordinary least squares

Ordinary least squares (OLS) is a type of linear least squares method for estimating the unknown parameters in a linear regression model.

$$X\boldsymbol{\beta} = \boldsymbol{y}$$

- $X$ is a [design matrix](https://en.wikipedia.org/wiki/Design_matrix).

Usually this equation is overdetermined so there is no solution $\beta$.

Instead, we want to find ${\hat \beta}$ such that

$$
{\hat {\boldsymbol{\beta}}} = \operatorname{arg\,min}_{\boldsymbol{\beta}} {\lVert X\boldsymbol{\beta} - \boldsymbol{y}\rVert^2}
$$

To find the critical point we calculate the gradient value of the squared error term $S = \lVert X\boldsymbol{\beta} - \boldsymbol{y}\rVert^2$.

$$
\begin{aligned}
\nabla_{\boldsymbol{\beta}}S & = \nabla_{\boldsymbol{\beta}} \lVert X\boldsymbol{\beta} - \boldsymbol{y}\rVert^2 \\
& = \nabla_{\boldsymbol{\beta}} (X\boldsymbol{\beta} - \boldsymbol{y})^{\mathsf {T}}(X\boldsymbol{\beta} - \boldsymbol{y}) \\
& =\nabla_{\boldsymbol{\beta}} (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}} - \boldsymbol{y}^{\mathsf {T}})(X\boldsymbol{\beta} - \boldsymbol{y})\\
& =\nabla_{\boldsymbol{\beta}} (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}X\boldsymbol{\beta} - \boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}\boldsymbol{y} - \boldsymbol{y}^{\mathsf {T}}X\boldsymbol{\beta} + \boldsymbol{y}^{\mathsf {T}}\boldsymbol{y})\\
& =\nabla_{\boldsymbol{\beta}} (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}X\boldsymbol{\beta} - \boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}\boldsymbol{y} - (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}\boldsymbol{y})^{\mathsf {T}} + \boldsymbol{y}^{\mathsf {T}}\boldsymbol{y})\\
& =\nabla_{\boldsymbol{\beta}} (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}X\boldsymbol{\beta} - 2 \boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}\boldsymbol{y} + \boldsymbol{y}^{\mathsf {T}}\boldsymbol{y})\\
& =\nabla_{\boldsymbol{\beta}} (\boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}X\boldsymbol{\beta} - 2 \boldsymbol{\beta}^{\mathsf {T}}X^{\mathsf {T}}\boldsymbol{y})\\
& =2 X^{\mathsf {T}}X\boldsymbol{\beta} - 2 X^{\mathsf {T}}\boldsymbol{y}
\end{aligned}
$$

Set $\nabla_{\boldsymbol{\beta}}S = 0$ for the critical point.

$$
\begin{aligned}
\nabla_{\boldsymbol{\beta}}S = 2 X^{\mathsf {T}}X\boldsymbol{\beta} - 2 X^{\mathsf {T}}\boldsymbol{y} = 0 \\
X^{\mathsf {T}}X\boldsymbol{\beta} = X^{\mathsf {T}}\boldsymbol{y} \\
\boldsymbol{\beta} = (X^{\mathsf {T}}X)^{-1} X^{\mathsf {T}}\boldsymbol{y} \\
\end{aligned}
$$

So

$$
{\hat {\boldsymbol{\beta}}} =(X^{\mathsf {T}}X)^{-1} X^{\mathsf {T}}{\boldsymbol{y}} \\
$$
.

Remarks

- $X^{\mathsf {T}}X$ is called moment matrix.
- If X has [multicollinearity](https://en.wikipedia.org/wiki/Multicollinearity) the coefficient estimates $\boldsymbol{\beta}$ may change erratically in response to small changes in the model or the data.
- If X has perfect multicollinearity the moment matrix has no inverse matrix.

## orthogonal set

- A set of vectors such that
  - nonzero
    - $a_i \neq 0$
  - mutually orthogonal
    - $a_i \cdot a_j = 0$ (where $i \neq j$)

## orthonormal set

- A set of vectors that
  - all vectors in the set are mutually orthogonal
  - and all of unit length.

## standard basis

set of unit vectors to the axis direction in Euclidean space. For example, (0, 1), (1,0).

## det(A)

A determinant expresses the signed n-dimensional volume of n-dimensional parallelepiped.

## diagonal matrix

- no need to be a square matrix
- transformation to the direction of the axises

## symmetric matrix

- eigenvalues are all real numbers.
- eigenvectors are orthogonal
- scaling in mutually perpendicular directions
- can be decomposed as $QDQ^{\mathsf {T}}$

## skew-symmetric matrix (anti-symmetric matrix)

$$A^{\mathsf {T}} = -A$$

- eigenvectors are orthogonal
- eigenvalues are imaginary numbers

## orthogonal matrix

$$Q^{\mathsf {T}} Q = QQ^{\mathsf {T}} = I$$

- square matrix
- length preserving or isometric
- unitary transformation (rotation or reflection or rotoreflection)
- eigenvectors are the rotation axis and they can be complex numbers.

## conjugate transpose

$$A^\ast={\overline {A^{\mathsf {T}}}}$$

## Hermitian matrix

$$A=A^\ast$$

- self-adjoint matrix
- The eigenvalues are all real.
- Eigenvectors belonging to distinct eigenvalues are orthogonal.
- (Spectral Theorem) There exists a unitary matrix U that diagonalizes Hermitian matrix A.

## unitary matrix

Column vectors form an orthonormal set in $C^n$.

- U is unitary if and only if $Q^\ast Q = QQ^\ast = I$.
  - when conjugate transpose matrix = inverse matrix
- Given two complex vectors $x$ and $y$, multiplication by a unitary matrix $U$ preserves their inner product; that is, $⟨Ux, Uy⟩ = ⟨x, y⟩$.

## normal matrix

$A^\ast A = AA^\ast = I$

- A is normal if and only if A posseses a complete orthonormal set of eigenvectors.

## positive definite

$$x^{\mathsf {T}}Ax \gt 0$$

- for symmetric matrices
- eigenvalues are all real numbers and greater than zero.
- can be seen as $x^{\mathsf {T}} \cdot Ax = x \cdot (Ax)$
- that means A is not changing the direction of x too much.
- up to 90 degrees - exclusive
- In eigendecomposition of A, D consists of positive values.

## positive semi-definite

$$x^{\mathsf {T}}Ax \ge 0$$

- for symmetric matrices
- eigenvalues are all real numbers and greater than equal to zero.
- can be seen as $x^{\mathsf {T}} \cdot Ax = x \cdot (Ax)$
- that means A is not changing the direction of x too much.
- up to 90 degrees - inclusive
- In eigendecomposition of A, D consists of non-negative values.

## QR Factorization

$$A = QR$$

- Q: orthogonal matrix
- R: upper triangular matrix

## eigenvalues and eigenvectors

$$Ax = \lambda x$$

- $\lambda_1 + \lambda_2 + ... + \lambda_n = \operatorname{tr}(A)$
- $\lambda_1\lambda_2...\lambda_n = \operatorname{det}(A)$
- Eigenvectors are nonzero.
- Eigenvalues can be zero.

## eigendecomposition

$$A = Q \Lambda Q^{-1}$$

- A: sqaure matrix
- A has eigenvectors as many as dim(A)
- can reduce number of computations by multiplying eigenvalues instead of eigenvectors

(special cases)

for real symmetric matrices

$$A = Q \Lambda Q^{\mathsf {T}}$$
.

## SVD

SVD is similar to finding orthogonal matrix $V$ which still can be represented as a product of another orthogonal matrix $U$ and a diagonal matrix $\Sigma$ when $V$ is transformed by $M$.

- $M$
  - $m \times n$ matrix
- $V$
  - $n \times n$ matrix
  - right singular vector
  - consists of eigenvectors of $A^{\mathsf {T}}A$
  - orthogonal matrix (which is rotation)
  - set of orthonormal eigenvectors of M*M
- $U$
  - left singular vector
  - $m \times m$
  - consists of eigenvectors of $AA^{\mathsf {T}}$
  - orthogonal matrix (which is rotation)
  - set of orthonormal eigenvectors of $MM^\ast$
- $\Sigma$
  - $m \times n$
  - square roots of the non-zero eigenvalues of either $M^\ast M$ or $MM^\ast$
- etc.
  - for the positive definite matrices singular decomposition and eigendecomposition are the same.
  - $M^\ast M = V\Sigma^2V^\ast$
  - $MM^\ast = U\Sigma^2U^\ast$
  - SVD always exists
    - [https://en.wikipedia.org/wiki/Singular_value_decomposition](https://en.wikipedia.org/wiki/Singular_value_decomposition)
- applications
  - [https://www.quora.com/What-is-an-intuitive-explanation-of-singular-value-decomposition-SVD](https://www.quora.com/What-is-an-intuitive-explanation-of-singular-value-decomposition-SVD)

### reduced SVD

- $U$
  - $m \times n$
- $\Sigma$
  - $n \times n$
- $V$
  - $n \times n$

### truncated SVD

Picked $k$ singular values.

- $U$
  - $m \times k$
- $\Sigma$
  - $k \times k$
- $V$
  - $n \times k$

## PCA

- analyze on $M^\ast M = V\Sigma^2V^\ast$
- Data supposed to be centered to apply PCA.
  - [https://stats.stackexchange.com/a/22331/193645](https://stats.stackexchange.com/a/22331/193645)
- How to do dimensionality reduction usually
  - Standardize the d-dimensional dataset.
  - Construct the covariance matrix.
  - Decompose the covariance matrix into its eigenvectors and eigenvalues.
  - Sort the eigenvalues by decreasing order to rank the corresponding eigenvectors.
  - Select k eigenvectors which correspond to the k largest eigenvalues, where k is the dimensionality of the new feature subspace (k ≤ d).
  - Construct a projection matrix W from the "top" k eigenvectors.
  - Transform the d-dimensional input dataset X using the projection matrix W to obtain the new k-dimensional feature subspace.

## Gramian matrix

- [https://en.wikipedia.org/wiki/Gramian_matrix](https://en.wikipedia.org/wiki/Gramian_matrix)
- is the Hermitian matrix of inner products, whose entries are given by $G_{ij} = <v_i, v_j>$ angle
- where $v_1, ..., v_n$ are
  - usually columns of a matrix V
  - in an inner product space.
- positive definite
- applications
  - Given vectors are centered random variable, Gramian matrix is approximately
- equivalent to $A^T A$
- proportional to the covariance with the scaling determined by the number of elements in the vector
- isometry
  - a mapping that preserves distances

## References

- [https://en.wikipedia.org/wiki/Matrix_calculus](https://en.wikipedia.org/wiki/Matrix_calculus)
- [https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf](https://www.math.uwaterloo.ca/~hwolkowi/matrixcookbook.pdf)
- [https://medium.com/@jonathan_hui/machine-learning-linear-algebra-a5b1658f0151](https://medium.com/@jonathan_hui/machine-learning-linear-algebra-a5b1658f0151)
- [https://www.youtube.com/playlist?list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg](https://www.youtube.com/playlist?list=PL127T2Zu76FuVMq1UQnZv9SG-GFIdZfLg)
- [https://towardsdatascience.com/principal-component-analysis-for-dimensionality-reduction-115a3d157bad](https://towardsdatascience.com/principal-component-analysis-for-dimensionality-reduction-115a3d157bad)
