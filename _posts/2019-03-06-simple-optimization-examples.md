---
title: Simple Optimization Examples in Python - TensorFlow, PyTorch, SciPy
date: 2019-03-06 02:30:00 +09:00
categories:
- ai
layout: post
---

We're going to minimize $x^2 + 2x + 1$ using different methods.

## TensorFlow

```py
import tensorflow as tf

x = tf.get_variable("x", 1)

y = x**2 + 2*x +1

step = tf.train.AdamOptimizer(0.01).minimize(y)

with tf.Session() as sess:
    sess.run([tf.global_variables_initializer()])
    _x, _y = sess.run([x, y])
    print(0, _x, _y)
    for i in range(10000):
        _, _x, _y = sess.run([step, x, y])
        if (i + 1) % 1000 == 0:
            print(i + 1, _x, _y)
```

Result:

```text
0 [-0.21650434] [0.61386544]
1000 [-0.99999976] [0.]
2000 [-0.9999999] [0.]
3000 [-0.99999994] [0.]
4000 [-1.] [0.]
5000 [-1.] [0.]
6000 [-1.] [0.]
7000 [-1.] [0.]
8000 [-1.] [0.]
9000 [-1.] [0.]
10000 [-1.] [0.]
```

## PyTorch

```py
import torch

x = torch.rand(1, requires_grad=True)

optimizer = torch.optim.Adam([x], lr=0.01)

print(0, x)
for i in range(10000):
    optimizer.zero_grad()

    y = x**2 + 2*x + 1
    y.backward(retain_graph=True)
    optimizer.step()

    if (i + 1) % 1000 == 0:
        print(i + 1, x, y)
```

Result:

```text
0 tensor([0.4604], requires_grad=True)
1000 tensor([-1.0000], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
2000 tensor([-1.0000], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
3000 tensor([-1.0000], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
4000 tensor([-1.0000], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
5000 tensor([-1.0000], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
6000 tensor([-1.], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
7000 tensor([-1.], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
8000 tensor([-1.], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
9000 tensor([-1.], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
10000 tensor([-1.], requires_grad=True) tensor([0.], grad_fn=<AddBackward0>)
```

## Quadratic Programming

```py
from scipy.optimize import minimize
import numpy as np

def f(x):
    return x**2  + 2*x + 1

x = np.random.rand()
res = minimize(f, x)

print(res)
```

Result:

```text
      fun: 0.0
 hess_inv: array([[0.5]])
      jac: array([7.4505806e-09])
  message: 'Optimization terminated successfully.'
     nfev: 9
      nit: 2
     njev: 3
   status: 0
  success: True
        x: array([-1.])
```