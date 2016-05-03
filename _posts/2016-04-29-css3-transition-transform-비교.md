---
layout: post
title: transition left와 transform:translate()의 차이
comments: true
categories:
- css
---

실무에서 모션 작업은 항상 자바스크립트로만 처리해 왔던터라(크로스 브라우징 이슈때문에...) 잉여시간이 남아 css transition에 대해서 공부를 하고 있었는데, ```left```를 이용하여 모션을 주었더니 웹에서는 끊김없이 잘 보였었는데 모바일에서는 뭔가 좀 끊기는 느낌이 들어 방법이 없을까 생각하다가 ```transform:translate```를 이용하니 모션이 부드럽게 처리가 됐었다. 왜 이렇게 퍼포먼스에 큰 차이를 보이는지 이유를 알아보기로 하였다.

```left```를 이용한 방식은 [이곳](http://jsfiddle.net/qcb2zc5b/){:target="_blank"}을 ```transform:translate```를 이용한 방식은 [이곳](http://jsfiddle.net/qcb2zc5b/1/){:target="_blank"}을 클릭하여 확인해보기 바란다.

> 웹에서는 많이 차이가 나지 않을수 있으니 모바일 모드로 실행화면 보기를 추천한다.

퍼포먼스의 차이는 크롬 개발자 도구를 사용하여 쉽게 알아볼 수 있었다.  
먼저 ```left```를 이용하여 모션을 구현했을 때의 Timeline 모습이다. 총 5.4초의 시간동안 모션이 이루어졌고 Rendering 시간은 247.9 ms, Painting 시간은 292.6 ms 걸렸다.  
![left로 모션을 실행시켰을때의 Timeline](/asset/left.png)

두번째 ```transform:translate```를 이용하여 모션을 구현했을 때의 Timeline 모습이다. 총 5.6초의 시간동안 모션이 이루어졌고 Rendering 시간은 18.6 ms, Painting 시간은 5.1 ms 걸렸다.
![transform으로 모션을 실행시켰을때의 Timeline](/asset/transform.png)

두 방식이 어느정도 차이가 날 것이라고는 생각했지만 이렇게까지 많은 차이가 날 줄 몰랐다. 그렇다면 퍼포먼스가 이렇게 많은 차이를 보이는 까닭은 무엇일까? 이유를 알아보기 전에 먼저 브라우저의 동작원리를 알아볼 필요가 있다.


#### 브라우저의 렌더링 동작 원리 [^1] ####

브라우저 엔진에 따라 동작에 차이가 있겠지만 통상적인 순서는 아래와 같다.

1. 불러오기
    * 리소스 로딩
2. 파싱 
    * DOM[^2] 트리를 만드는 과정
3. 랜더링 트리 만들기
    * 파싱으로 생성된 DOM[^2]트리는 html/xml문서의 내용을 트리형태로 자료구조화 한것
    * 실제 내용을 화면에 표시하기 위해선 위치와 크기 정보, 그리는 순서 등을 저장하기 위한 별도의 트리 구조가 필요 - 이것을 일반적으로 **렌더링 트리**라고 부름
    * ```css display```속성값이 ```none```인것은 화면에 표시될 필요가 없으므로 랜더링 트리에 추가되지 않음
4. css 스타일 결정
	* 모든 css스타일을 분석하여 최종적으로 어떤 태그에 어떤 스타일 규칙이 적용되는지를 결정
5. 레이아웃(Layout)
	* 렌더링 트리가 생성될 때, 각 랜더 객체는 위치나 크기를 가지고 있지 않음
	* 각 랜더 객체가 위치와 크기 값을 갖게되는 과정을 **레이아웃**이라고 함
6. 그리기(Painting)
	* 그리기 단계는 렌더링 트리를 탐색하면서 특정 메모리 공간에 RGB값을 채우는 과정

다시 개발자도구의 Timeline 으로 돌아와서 살펴보면 ```left```로 Element가 이동하는 동안 렌더링 트리를 다시 만들고 css스타일을 다시 결정하고 레이아웃을 다시 설정하고 Painting을 하는 이벤트가 엄청나게 많이 발생하는 것을 볼 수가 있다.
![left이동시에 timeline](/asset/left_proc.png)

그에 반에 ```transform:translate```로 Element가 이동하는 동안에는 이벤트가 거의 발생하지 않는 것을 볼 수가 있다.
![transform이동시에 timeline](/asset/transform_proc.png)

결론을 짓자면 ```left```의 경우는 Element가 이동하는 동안 렌더링 사이클을 계속 순회하는 반면 ```transform:translate```는 이동을 시작하는 지점과 끝 지점에서만 렌더링 사이클이 순회 한다는 것을
유추해 볼 수 있다.

---

[^1]: 출처 : <http://www.slideshare.net/JinKyoungHeo/1-2-53043752>{:target="_blank"}
[^2]: Document Object Model


```
ps. 개인적으로 공부하면서 포스팅작성을 하였기 때문에 제가 잘못 알고 있는부분이 있을수도 있습니다. 그런 경우에는 피드백 부탁드립니다.
```