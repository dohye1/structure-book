# structure-book

## TODO LIST

- [ ] zustand with nextjs
- [ ] styling
- [ ] 공용 컴포넌트
- [ ] 반응형
- [ ] dark mode 지원

### 완전 재미있는 아이디어가 떠올라서 사이드프로젝트를 만드려고한다!

프로젝트의 폴더구조를 공유할수있는 웹사이트를 만들거다

꺅 말만들어도 머리아프고 재미있을것같다!!

<details>
<summary>2023.02.20</summary>
<div markdown="1">       
일단 필요한 뷰를 손으로 그려봤다.

chatGPT~ 이 이미지를 코드로뽑아줘 제발제발~~~

![KakaoTalk_Photo_2023-02-20-20-14-35](https://user-images.githubusercontent.com/64346737/220091121-c064373f-464b-4785-bae1-46dbac749b8c.jpeg)
![KakaoTalk_Photo_2023-02-20-20-14-39](https://user-images.githubusercontent.com/64346737/220091128-f77d301b-ad9e-4527-a5a6-350f4577cb77.jpeg)
![KakaoTalk_Photo_2023-02-20-20-14-41](https://user-images.githubusercontent.com/64346737/220091130-ac1e5463-3e2e-463f-a892-c68e00e4bd8e.jpeg)

기획/디자인/개발(서버도!!!)을 모두 혼자서 해볼거라 쉽진않겠지만, 그래도 그 과정에서 배울게 많을것같다!

</div>
</details>

<details>
<summary>2023.02.21</summary>
<div markdown="1">       
이날은 퍼블리싱을 했다.

프로젝트이름에 book이 들어가있어서 뭔가 책같은느낌을 주고싶었는데, 좀 올드하기도한듯...?

그래도 난 이 프로젝트를 얼른만들고나서, 코드나 스타일을 정리할생각이라 일단 고~
<img width="1512" alt="Screen Shot 2023-02-21 at 9 31 27 PM" src="https://user-images.githubusercontent.com/64346737/220345799-895a0476-ca0e-4f83-9301-560ac75de352.png">

</div>
</details>

<details>
<summary>2023.02.22</summary>
<div markdown="1">       
form을 만들었다.

깃헙 연동을 하고싶어서 낮엔 틈틈이 github api를 찾아보고 저녁에 카페에 와서 작업을 했다!!

낮에 찾아봤을때는 서버가 있어야하나...조금 막막했는데, 생각보다 쉽게 해결되었다!!

`@octokit/rest`를 사용하면 간단하게 할수있다.

그대신 인증과관련된 기능은 사용할수있는진 몰겠다ㅠㅜㅜ 내가 필요한 기능은 그래도 제공해줌!!

<img width="1498" alt="Screen Shot 2023-02-22 at 11 02 59 PM" src="https://user-images.githubusercontent.com/64346737/220644755-12b91939-69d6-4c04-add3-ad5041098649.png">

꺅 재밌당...후후 불타오른김에 빨리해야징..

이 프로젝트는 코드스타일, 디자인, 반응형 등은 최대한 고려하지않고 오로지 기능에 초점을 맞춰서 진행하려고한다.

일단 돌아가게만들고나서 살을 붙일 생각임

</div>
</details>

<details>
<summary>2023.02.23</summary>
<div markdown="1">       
오늘은 트리구조를 어떻게 처리할지 고민을 좀 해봤다.

```typescript
type TreeItem = {
  id: string;
  type: TreeItemType;
  name: string;
  description?: string;
};

type Tree = {
  item: TreeItem;
  children?: Tree[];
};

type TreeList = Tree[];
```

처음엔 이렇게 배열로 관리할까 싶었는데 트리의 데이터를 변경하는 기능도 추가한다고 생각해보면, tree 데이터가 배열로 있을때 인덱스를 항상 찾아줘야하는데,
만약 폴더의 depth가 깊다면....? 정말 생각만해도 복잡해진다.

배열말고 객체로 데이터를 관리한다면 key로 접근하기때문에 배열로 관리할때보다는 좀 더 쉽게 해결할수있을것같다!

내일은 데이터의 구조를 변경해봐야겠다.

<img width="800" alt="폴더 트리구조" src="https://user-images.githubusercontent.com/64346737/220934163-d0d4a062-54ab-4451-82ab-7ccd5cdf1eb9.png">

암튼 오늘은 위의 사진처럼 트리를 만들어봤다.

</div>
</details>

<details>
<summary>2023.02.25</summary>
<div markdown="1">       
후우....데이터 구조때문에 고민을 계속 했다.

폴더구조의 뎁스가 얼마나 깊어질지 예상을 할수가없기때문에, 최대한 다루기쉬운 형태로 만들어야한다.

지금 당장 구현할 기능을 생각해보면
깃허브로 가져온 구조에서 삭제/추가를 쉽게 하려면 객체 key로 하는게 가장 좋은 방법이라는 결론을 냈다.

(일단은 아래와같은 구조로 갈건데, 데이터의 구조는 계속 고민해볼것이다!)

```typescript
const MOCK_TREE: TreeList = {
  test: {
    item: { id: "id-1", type: "FOLDER", name: "test" },
    children: {
      test2222: {
        item: { id: "id-2", type: "FOLDER", name: "test2" },
        children: {
          test3333: { item: { id: "id-3", type: "FILE", name: "test3" } },
        },
      },
    },
  },
  folderOnly: {
    item: { id: "id-4", type: "FOLDER", name: "folderOnly" },
  },
  test444444: {
    item: { id: "id-5", type: "FOLDER", name: "test4" },
    children: {
      test55555: {
        item: { id: "id-6", type: "FOLDER", name: "test5" },
        children: {
          test66666: {
            item: { id: "id-7", type: "FOLDER", name: "test6" },
            children: {
              test777777: {
                item: { id: "id-8", type: "FILE", name: "test7" },
              },
            },
          },
        },
      },
    },
  },
};
```

데이터의 구조를 보면 폴더의 이름 자체가 key가 된다.

근데 만약 폴더이름을 변경하는기능을 넣게되면, 또 골치가 아파질것같다.

왜냐면 폴더명을 변경하게되면 key도 변경해야하기때문에 데이터 관리차원에서 좋지않을것같음.

지금 생각했을땐 각 TreeItem의 id를 key로 가지도록 하는게 좋을것같다! id는 한번 생성되면 변경되지않기때문이다.

지금은 깃허브에서 받아온 데이터를 내 입맛에맞게 구조를 바꾸려고 폴더명을 key로 만들었다.
<img width="800" alt="폴더 트리구조" src="https://user-images.githubusercontent.com/64346737/221353903-57a0be47-b41e-4969-a1e7-d33c05307718.png">

일단 지금은 깃헙트리구조를 화면에 표현하는데까지는 성공!

---

데이터를 삭제할때나 수정할때, depth가 깊다면 또 어떻게 접근을해야하나...고민을 했는데,
github API를 확인해보니, 하나의 파일 데이터가
<img width="400" alt="github file data" src="https://user-images.githubusercontent.com/64346737/221356380-3cccaa59-74c3-4217-857a-6aedbd3a73c6.png">

이런식으로 path도 가지고있다!!

path를 가지고있으면 부모의 정보를 가지고있는것이므로 depth가 깊어도 target을 금방 찾을수있을것같음!!

</div>
</details>

<details>
<summary>2023.02.26</summary>
<div markdown="1">

트리 삭제 기능을 구현해봤다.

그런데 트리와 관련된 컴포넌트들을 많이 만들다보니
데이터를 가지고있는 컴포넌트와 그리는 컴포넌트의 뎁스가 깊어져서, props로 여러단계를 거쳐서 넘겨야하는 상황이 되었고, 기능들은 이제 hook으로 빼야겠다.

기능이 얼마없는데도, 로직이 많아짐..!흐긓긓

아근데 지금 기차에서 코딩하고있는데 멀미가나서 오늘은 조금만해야겠따ㅠㅜ

</div>
</details>

<details>
<summary>2023.02.28 - 03.01</summary>
<div markdown="1">

며칠동안 바빠서 작업을 많이 못했다ㅠㅜㅠㅜ

음...지금 트리 데이터 구조떄문에 계속 고민이다...

github 레포지토리에서 트리 데이터를 받아와서 그리는것까지는 했는데, depth를 어떻게 관리해야 효율적일지 모르겠ㄷ...

폴더와 파일의 이름을 수정할때 depth가 깊은데이터를 직접 변경을 해야하는데, 어떻게 이 작업을 효율적으로 할 수 있을까????????

예전에 한번 생각했던 방식이긴한데, tree data가 depth가 깊은 객체로 관리되고있고, 각 아이템의 id를 key로 관리하는게 지금 내가 생각할수있는 최선의 방식이다!!

지금은 github에서 tree데이터를 받아오면 아래와 같은 구조로 만들고있는데,

```javascript
{
  [name]:{
    item:{item정보},
    children:{
      [name]:{
        item:{item정보},
        children:{}
      },
      [name]:{
        item:{item정보},
        children:{}
      },
    }
  }
}
```

위 구조에서 아래의 구조로 변환해주는 util을 추가했다!!

```javascript
{
  [id]:{
    item:{item정보},
    children:{
      [id]:{
        item:{item정보},
        children:{}
      },
      [id]:{
        item:{item정보},
        children:{}
      },
    }
  }
}
```

그리고 폴더/파일을 추가하는 기능도 구현했다.

거의 하루종일 데이터구조+기능구현한다고 쓴듯ㅋ쿠ㅜ 그래도 성공!!!!
근데 코드가 점점 지저분해진다.

더 진행하기전에 이젠 정말 로직을 분리해야할듯

![Mar-02-2023 09-20-58](https://user-images.githubusercontent.com/64346737/222297713-927cef19-60f5-4b62-afb8-106994504a93.gif)

</div>
</details>

<details>
<summary>2023.03.02</summary>
<div markdown="1">

대구내려온다고 많이 못함ㅠㅜㅜ

기차에서 하려고했는데, 노트북본지 5분만에 멀미나서 그냥 포기!!!

집에와서 create 페이지에서 섞여있던 로직들을 hook으로 빼는 작업만 했다 😂

</div>
</details>

<details>
<summary>2023.03.05</summary>
<div markdown="1">
그동안 일이 좀 많아서 작업을 못했음ㅠㅜㅠㅜ

오늘은 tree toggle기능을 추가햇다.

깃헙 트리 구조를 받아왔을때, 모든 파일과 폴더를 한번에 다 그리니깐 화면에서 차지하는 영역이 너무 길어져서 맨처음에는 tree를 접은상태로 보여주고싶었다.

![Mar-05-2023 17-33-25](https://user-images.githubusercontent.com/64346737/222950318-04074042-d8c6-4fd6-8dff-bb4719aaa14c.gif)

이제 form 제출부분만 남았다

그런데 각 폴더의 설명을 어떻게 추가할가했는데, 지금은 description에 적도록할거다.
그래서 description을 texteditor로 작성할수있게 변경할거다!!

---

일단 생성하기 버튼을 눌렀을때, 제출해야하는 데이터를 콘솔로 출력해봄

<img width="400" alt="github file data" src="https://user-images.githubusercontent.com/64346737/222958997-98e41256-0b85-4be8-888d-5b92d9dd6c07.png">

근데 필수값 처리를 안해줘서 form라이브러리를 쓸까 고민중...
일단은 db에 데이터 쌓는걸 먼저해보자

벌써 떨리는군...^^

</div>
</details>

<details>
<summary>2023.03.06</summary>
<div markdown="1">

오늘은 login처리를 했다.
이 웹사이트는 개발자들만 쓸것같아서 github계정으로 연동하려고했다.

근데 난 서버리스로 만들거라 firebase로 연동을 해봤다.

생각보다 엄청 간단함...!!!!

낼은 낮에 client state를 어떤 방식으로 관리할지 고민을 해보고 저녁에 구현을 해볼것이다!!

</div>
</details>

<details>
<summary>2023.03.07</summary>
<div markdown="1">

user data(client state)를 zustand로 관리하려고한다.
zustand를 실무에서 써보긴했지만 너무 가볍게 찍먹한느낌이라, 이번엔 공식문서좀 보고 어떤 기능들이있는지도 체크해보고 사용해보려고한다!!

[nextjs와 zustand를 함께 사용한 글](https://velog.io/@yhg0337/%EB%91%90%EB%B2%88%EC%A7%B8.-Zustand%EC%99%80-%ED%95%A8%EA%BB%98-SSR-Hydration#zustand-store-ssr%EA%B3%BC-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)을 보고 한번 따라해보려고한다.

nextjs와 함께쓰면 zustand의 데이터를 사용해 hydration작업을 또 해줘야하는것같다....맞나..?

일단 돌아가게만드는게 목표라 데이터 생성하는거 먼저 하고난 뒤에 이 작업을 할거다.
투두가 점점 늘어나니 기록을해놔야겠음!!

</div>
</details>
