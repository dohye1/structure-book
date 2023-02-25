# structure-book

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
    item: { id: "test1", type: "FOLDER", name: "test" },
    children: {
      test2222: {
        item: { id: "test2", type: "FOLDER", name: "test2222" },
        children: {
          test3333: { item: { id: "test3", type: "FILE", name: "test3333" } },
        },
      },
    },
  },
  folderOnly: {
    item: { id: "folderOnly", type: "FOLDER", name: "folderOnly" },
  },
  test444444: {
    item: { id: "test4", type: "FOLDER", name: "test444444" },
    children: {
      test55555: {
        item: { id: "test5", type: "FOLDER", name: "test55555" },
        children: {
          test66666: {
            item: { id: "test6", type: "FOLDER", name: "test66666" },
            children: {
              test777777: {
                item: { id: "test77777", type: "FILE", name: "test777777" },
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
