---
layout: post
title: Sublime Text 설치 및 플러그인 정리
comments: true
categories:
- etc
---

Sublime Text를 설치하고 세팅할때마다 다른 블로그를 검색해야 하는 불편함을 해소하기 위해 포스팅하려고 합니다. 개인 저장용이기는 하나 참고하실 분들은 참고 하셔도 좋습니다. 설치버전은 Sublime Text3 기준이고 OS는 OS X 기준입니다.

### 설치

[https://www.sublimetext.com/3](https://www.sublimetext.com/3){:target="_blank"} 에서 본인의 OS에 맞는 버전을 다운받아 설치 하시면 됩니다. Sublime Text는 기본적으로 유료 툴입니다. 하지만 중간중간 저장할 때마다 가끔씩 뜨는 구입안내 팝업창이 별로 신경쓰이지 않으시면 구입하지 않으셔도 상관없습니다.


### Package Control

Sublime Text를 제대로 쓰기 위해선 여러가지 Package를 설치해야 합니다. Package를 설치하기 위해선 Package Control을 먼저 설치 해주어야 합니다.<br />
cmd+\`(tab위에 있는 키)를 누르거나 혹은 상단 메뉴 view -> Show Console를 클릭하여 콘솔창을 연 후 아래의 코드를 입력하고 엔터를 칩니다.

```
import urllib.request,os,hashlib; h = '2915d1851351e5ee549c20394736b442' + '8bc59f460fa1548d1514676163dafc88'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://packagecontrol.io/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)
```

상단의 코드로 Package Control이 제대로 설치되지 않을 경우에는 [이 URL](https://packagecontrol.io/installation)을 참고하시기 바랍니다.


### 주요 Package

Package Control 설치가 끝났으면 필수 Package들을 설치해 줍니다.<br />
`cmd + shift + p`를 누르면 아래의 이미지와 같이 상단에 팝업이 뜹니다.
![Package Control pop](/asset/package_control_pop.png)
그림과 같이 package control 명령어들이 잘 나온다면 Package Control이 잘 설치 된것입니다. 명령어가 제대로 나오지 않는다면 Package Control을 다시 설치해 주시기 바랍니다.

- Package Control:Install Package (패키지를 설치합니다.)
- Package Control:List Package (설치된 패키지를 확인합니다.)
- Package Control:Remove Package (패키지를 삭제합니다.)

#### [Theme - Flatland](https://github.com/thinkpixellab/flatland){:target="_blank"}

Sublime Text 자체의 테마를 설정해 주는 Package입니다. 전에는 Theme - Soda를 많이 이용했었는데요. Flatland를 사용하고나서 부터는 Flatland만 쓰게 되는것 같습니다.<br />
상단 메뉴 Sublime Text -> preferences -> Setting - User 를 클릭하여 셋팅 파일을 오픈하고 아래 설정을 추가하여 줍니다.

```json
{
	"color_scheme": "Packages/Theme - Flatland/Flatland Dark.tmTheme",
	"theme": "Flatland Dark.sublime-theme"
}
```
저장을 하면 바로 적용이 되지만 프로그램이 오류난 것처럼 이상하게 적용이 될수도 있습니다. 그럴땐 Sublime Text를 다시 실행시켜 줍니다.
아래는 적용화면 입니다.

![Flatland](/asset/flatland.png)

#### [Emmet](http://emmet.io/blog/sublime-text-3/){:target="_blank"}

강력추천 플러그인입니다.<br />
Emmet이 손에 익으면 작업속도가 엄청나게 빨라지는것을 느낄수가 있습니다.
사용법은 [이곳](http://docs.emmet.io/)을 참고하시기 바랍니다.

#### [convertToUTF8](https://github.com/seanliang/ConvertToUTF8){:target="_blank"}

Sublime Text는 기본적으로 utf-8 인코딩만 제공하지만 convertToUTF8을 설치하게 되면 euc-kr을 사용할 수 있게 됩니다.
패키지를 설치하고 재시작하면 file메뉴 밑에 Set File Encoding To [^1] , Reload With Encoding [^2] 메뉴가 추가 됩니다.

> **추가되는 인코딩 방식**
>
> - Chinese Simplified(GBK) 중국어 간체
> - Chinese Traditional(BIG5) 중국어 번체
> - Korean (EUC-KR) CP949 도
> - Japanese (CP932)
> - Japanese (Shift_JIS)
> - Japanese (EUC-JP)

#### [SideBarEnhancements](https://github.com/titoBouzout/SideBarEnhancements){:target="_blank"}

사이드바의 기능을 확장 해주는 플러그인 입니다.<br />
기존의 허술한 사이드바에 여러가지 유용한 기능들을 추가시켜 줍니다.

#### [AutoBackups](https://github.com/akalongman/sublimetext-autobackups){:target="_blank"}

말 그대로 자동저장 플러그인입니다. 설정방법은 [링크](https://github.com/akalongman/sublimetext-autobackups){:target="_blank"}를 확인하시기 바랍니다.

#### [DocBlockr](https://github.com/spadgos/sublime-jsdocs){:target="_blank"}

주석을 쉽게 달 수 있게 해주는 플러그인 입니다. `/**` 입력후 enter키를 치면 자동으로 주석이 달립니다.<br />
지원하는 언어는 Javascript(ES6 포함), PHP, ActionScript, Haxe, CoffeeScript, TypeScript, Java, Apex, Groovy, Object C, C, C++, Rust입니다.

#### [BracketHighlighter](https://github.com/facelessuser/BracketHighlighter){:target="_blank"}

이 플러그인은 `[]`, `()`, `{}`, `""`, `''`, `<tag></tag>`등과 같이 열림과 닫힘을 매칭시켜 주는 플러그인 입니다.

![bracket_highlighter](/asset/bracket_highlighter.png)

---

[^1]: 선택한 인코딩방식으로 변경
[^2]: 선택한 인코딩방식으로 변경 후 파일 다시 로드
