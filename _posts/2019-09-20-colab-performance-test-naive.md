---
title: Colab performance test (naive)
date: 2019-09-20 13:00:00 +09:00
categories:
- ai
layout: post
comments: true
---

## settings

- 모델
  - MNIST CNN 분류 문제 (Classification)
  - [소스코드](https://github.com/pytorch/examples/tree/master/mnist)
  - CUDA 항목 제외하고 모두 디폴트 설정. (epoch: 10)
- Colab
  - PyTorch v1.1 설치되어 있었음.
- PC
  - 2019 Samsung i7 notebook (no GPU)
  - PyTorch v1.2

## results

| |Colab-CPU|Colab-GPU|PC|
|-|-|-|-|
|걸린시간(sec)|550.8|194.0|353.1|

## conclusion

Colab은 꽤 쓸만한(?) 노트북 한대를 머신러닝 공부용으로 제공해주는 효과가 있다. (모델에 따라 다르겠지만 개인 노트북에 비해 54% 정도로 시간 단축을 기대할수도 있다.)

## misc

### 질문

Colab에서 쓰이는 GPU가 k80 이라는데, 100만원 이상 하는거에 비해 성능향상이 적게 나온걸수도 있을거 같다. 실험 셋팅 자체에 문제가 있었을수도 있을것 같다.

### 희망사항

조만간 Colab에서 PyTorch + TPU를 사용해볼수 있으면 좋겠다.

> Today, we're pleased to announce that engineers on Google's TPU team are actively collaborating with core PyTorch developers to connect PyTorch to Cloud TPUs.

[원문](https://cloud.google.com/blog/products/ai-machine-learning/introducing-pytorch-across-google-cloud)
