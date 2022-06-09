# Todo-Coin 프로젝트

### [📓프로젝트 보드 (노션)](https://gold-route-090.notion.site/To-do-Coin-b75b3b4bb3de4b16a4341878154c37ae)
### [✨figma 초기 디자인](https://www.figma.com/file/wPBJm0gWJUiY7PQVi2YqiA/To-do-Coin)
### [[⚡todo-coin]할일 작성하러 가기](https://todo-coin.netlify.app/)
<br/>

## 공지 사항
v2.0.0버전의 업데이트에서 새로운 기능의 많이 추가되어 기존 db의 모양이 변경되어 기존 데이터가 초기화되었음을 알려드립니다~!

<br/>

## 발견된 버그 🔍🐞
1. 새로고침 시 사이트 접속 끊김 -2022.06.07 발견-
2. ~~오후 12시입력 했는데 오전으로 표시되는 버그 -2022.06.09 발견~~ (v2.3.1에서 버그 픽스)
3. ~~카테고리 추가 메뉴에서 입력창에서 지우기가 안 됨 -2022.06.09 발견-~~ (v2.3.1에서 버그 픽스)

<br/>

## 버전 정보
<details>
<summary>v2.3.1</summary>
<div markdown="1">

## 수정된 버그 🛠️🐞
    1. 오후 12시입력 했는데 오전으로 표시되는 버그 -2022.06.09 발견
       오전 오후로 변환하는 함수에서 12시부분을 고려하지 못해서 수정했습니다.
       새벽 12시는 0시로 점심 12시는 12시로 출력됩니다~!
  ![image](https://user-images.githubusercontent.com/79118046/172862059-165ca225-3d7a-4ace-a623-30748ba63945.png)
  ![image](https://user-images.githubusercontent.com/79118046/172864937-f0ee951a-c06d-4c92-be42-344fe9435ec7.png)

    
    2. 카테고리 추가 메뉴에서 입력창에서 지우기가 안 됨 -2022.06.09 발견
       preventDefault() 함수로 인한 문제였습니다. 이제 정상적으로 작동합니다.
    
[해결 상세보기](https://gold-route-090.notion.site/To-do-Coin-b75b3b4bb3de4b16a4341878154c37ae#6b65addf60b042458b8923a304595d6b)


</div>
</details>

<details>
<summary>v2.3.0</summary>
<div markdown="1">

## 기능 추가 ✔
    1. 웹사이트 탭창에서 페이지 제목이 출력됩니다.
 ![image](https://user-images.githubusercontent.com/79118046/172830714-e6e2062d-0fec-4bd3-9c95-8bda8b01ceb8.png)
    
    
## 기능 변경 ♻
    1. 카테고리 기능이 변경됩니다.
      기존 카테고리 입력방식은 수정 시에 활용이 불가하고, 또한 재사용성이 떨어져서 아래와 같이 기능을 수정하였습니다.
    
      * 나의 카테고리 등록 방식 변경
       기존: todo생성 시 입력된 카테고리는 나의 카테고리에 추가 (수정 시에는 불가했음)
       변경: 카테고리 추가하기 메뉴에서 나의 카테고리 추가. (카테고리 추가메뉴는 todo생성&수정 및 마이페이지에 있습니다.)
      
      * 카테고리 입력 방식 변경
       기존: 아무 제약없이 막 등록 가능
       변경: 나의 카테고리에 있는 카테고리만 등록가능
![image](https://user-images.githubusercontent.com/79118046/172832382-7ff0caa3-5e49-4b30-aee3-8c9843ede348.png)

    2. Ui가 개선 되었습니다.
       * todo_page
         todoPage에서 고정부분을 헤더뿐만아니라 추가로 (컨트롤 버튼들 + 하단 footer)까지 고정시키고 
         중간에 todo리스트 부분을 스크롤로 변경하여
         사용의 편의성을 높였습니다.
![image](https://user-images.githubusercontent.com/79118046/172833558-334729a8-b59a-413a-943f-42c75dcb44ed.png)

       * todo_card
         할일에서 상태를 변경하는 부분이 눈에 띄지 않아서 입체감을 추가했습니다.
![image](https://user-images.githubusercontent.com/79118046/172833619-c6a9f54d-b2e3-4714-866e-57a350574436.png)
       
     3. 기본 디폴트 프로필 사진을 변경했습니다.
        조금더 컨셉에 맞는 기본사진으로 변경했습니다.
 ![image](https://user-images.githubusercontent.com/79118046/172833995-3d9371ff-ef5a-48fe-906a-6d0dc4198849.png)
    
     4. 웹사이트 기본 폰트를 주아체로 변경했습니다.
        폰트스타일이 바뀌면서 전체적으로 폰트사이즈도 같이 변경 되었습니다.
    

    
</div>
</details>

<details>
<summary>v2.2.0</summary>
<div markdown="1">

## 기능 추가 ✔
    1. pwa사이트로 사이트로 진화하였습니다.
      - 다운로드 받아서 바탕화면 & 홈화면에 두고 사용이 가능합니다.
      - 오프라인에서 사용 시 오프라인임을 알려주는 페이지가 출력됩니다.
![image](https://user-images.githubusercontent.com/79118046/172061559-cb9e2e42-bd4e-4728-aa0e-71af5f3bf557.png)

![image](https://user-images.githubusercontent.com/79118046/172061539-86517357-98d3-4490-967f-785c3d4efa8f.png)

![image](https://user-images.githubusercontent.com/79118046/172061621-8a4e288f-0829-476d-942e-0df9de886f35.png)



</div>
</details>

<details>
<summary>v2.1.0</summary>
<div markdown="1">

## 기능 추가 ✔
    1. item의 이름이 축약기능 추가되었습니다.
       item의 이름이 길어지면 아이템들의 모양이 일관되지 않아 깔끔한 디자인이 아니었습니다.
       그래서 item의 이름이 길어지면 축약되고 이름을 다시 클릭해서 전체이름을 볼 수있는 기능을 추가했습니다.
![image](https://user-images.githubusercontent.com/79118046/172043751-c77f6f9c-6894-4358-a6a8-9c00b11f32fa.png)

## 기능 변경 ♻
    1. 아이템 구매기능이 변경되었습니다.
       아이템 구매 시
       기존: 해당 아이템 자동 삭제.
       변경: 해당 아이템 유지. (삭제는 수동으로 지원됨)
    
    2. 모바일 화면에 잘 맞게 나오도록 ui를 최적화 하였습니다.
    
    3. 로그아웃 버튼의 기능이 변경되었습니다.
       기존: 클릭 시 바로 로그아웃.
       변경: 재확인 후 로그아웃.
 ![image](https://user-images.githubusercontent.com/79118046/172043936-7fac8a2b-a3d2-4af1-b006-34cd7dd1838d.png)
    
    4. 닉네임부분의 ui가 변경되었습니다.
       - 닉네임 변경 버튼이 클릭 전후로 다른 색을 갖게 변경되었습니다.
         기존: 동일색
         변경: 초록색
       - 닉네임 input에 placeholder를 추가하였습니다.

## 발견된 버그 🔍🐞
~~1.휴대폰에서 구글 로그인 시 불가능, 웹사이트에서만 접속 가능 버그.~~
```
앱이 Google보안 브라우저정책을 준수하지 않았다고 오류가 나옵니다~!
해결방법을 찾아봐야겠습니다.
일단 휴대폰에서도 웹사이트로 접속하는 방법이면 사용 가능합니다.
------------------------------------------------------------------------------------------------
해결: 휴대폰에서 로그인이 안 되는 게 아니라 chrome이 아닌 브라우저 즉 카카오 인앱에서 접속 시 구글 로그인이 불가한 것을 알아냈다.
그래서 문자로 보내면거나 해당 주소를 복사해서 chrome에서 실행하면 잘된다.
```
[참고사이트](https://mingeesuh.tistory.com/entry/%EC%9D%B8%EC%95%B1-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%98%A4%EB%A5%98-403-%EC%98%A4%EB%A5%98-disalloweduseragent)

</div>
</details>

<details>
<summary>v2.0.0</summary>
<div markdown="1">

## 기능 추가 ✔
    1. 마이페이지가 오픈되었습니다.
       * 새로운 기능
        - 닉네임과 프로필사진을 저장 할 수 있게 되었습니다.
        - 누적 정보(todo, coin, item)가 추가되었습니다.
        - 하단 세션(나의 카테고리, 나의 아이템)들에 toggle기능이 추가되었습니다.
![image](https://user-images.githubusercontent.com/79118046/172022488-0170b01a-0028-4f27-b0ba-26ef8b342ece.png)
![image](https://user-images.githubusercontent.com/79118046/172022618-2cb5fbac-0267-44b6-8ec1-3a0c1b236767.png)
    
       * 나의 카테고리
        - 나의 카테고리리에 삭제기능이 추가되었습니다.
![image](https://user-images.githubusercontent.com/79118046/172022615-2418b452-2d5e-446c-9520-6229b5fdb64b.png)


## 기능 변경 ♻
    1. 마이페이지의 로그아웃 버튼 변경.
       로그아웃 버튼이 아이콘으로 변경되었으며 아이콘tooltip과 흔들리는 시각효과를 추가하였습니다.
![image](https://user-images.githubusercontent.com/79118046/172022586-9d80032b-5679-4fa0-b10e-9922a7852f69.png)

## 발견된 버그 🔍🐞
    1.  todoPage에서의 header에서만 기본 프로필 사진을 가져오지 못하는 버그.
        사용자가 처음 계정 생성 시 기본프로필 사진인 피카츄가 출력됩니다. 다른 페이지에서의 header에서는 피카츄가 잘 등장하지만
![image](https://user-images.githubusercontent.com/79118046/172022987-26a3216a-82f3-4126-9a1b-983ee4a4c508.png)  
   
        todoPage에서의 header에서는 이상하게 피카츄가 등자하지 않습니다.
        현재 발견된 원인은 header에서 asset폴더 앞에 '/'를 붙여야 되는 경우도 있고 아닌 경우가도 있어서 불규칙적인것으로 확인됐습니다.
        그러나 '/'가 왜 다르게 적용되는 지에 대해에서는 해결점을 찾지 못해 추후에 해결하고자 합니다.
        기본프로필 왜에 새로등록한 사진은 잘 나옵니다~!
 ![image](https://user-images.githubusercontent.com/79118046/172022991-b51f56e8-8bbf-4a58-8c01-a526547b9c33.png)


</div>
</details>

<details>
<summary>v1.1.0</summary>
<div markdown="1">

## 기능 추가 ✔
    1. 헤더메뉴에 tooltip이 추가되었습니다.
       이제 보다 가시적으로 어떤 메뉴인지 알 수 있게 되었습니다.
![image](https://user-images.githubusercontent.com/79118046/171870090-085da9bb-e242-4e22-aa4e-9cab7abd761c.png)

    2. 아이템 기능이 추가되었습니다.
       * 상점
        - 아이템 생성: lv과 구매비용, 이미지 or 아이콘을 저장 할 수 있습니다.
        - 아이템 수정 & 삭제: 이미 생성된 아이템을 수정 및 삭제가 가능합니다. 구매하기 옆에 버튼을 눌러서 실행합니다.
        - 구매하기: 아이템의 조건이 맞으면 구매가 가능합니다. 구매한 상품은 마이페이지로 이동됩니다.
       * 마이페이지
        - 아이템 사용: 아이템 사용 시 해당 아이템은 삭제됩니다.
![image](https://user-images.githubusercontent.com/79118046/171870573-73c3f069-0b50-4208-8e9b-4ccd9a88a6d1.png)


## 기능 변경 ♻
    1. 마이페이지 위치 조정
       마이페이지 작업전까지 임시적으로 로그아웃 버튼을 최상단으로 이동 시켰습니다.
![image](https://user-images.githubusercontent.com/79118046/171870698-c7ce27b8-d33f-4d5a-9c7c-39b3ed65769f.png)

</div>
</details>

<details>
<summary>v1.0.1</summary>
<div markdown="1">
  
## 기능 변경 ♻
    1. 로그아웃 시 로직 변경.
       기존: 바로 로그인페이지로 감 (오류 발생 및 환경에 따라 로그아웃 불가).
       수정: 유저 정보 없음 모달이 나타남.
    2. non_existent_user 컴포넌트 변경 (유저 정보 없으면 나오는 모달 창).
       추가: 5초 뒤에 로그인 페이지로 이동함.
 
## 버그 수정 🐞
    1. 다른 유저가 로그인 하거나, todo생성 시 자신 외의 다른 유저들의 데이터가 전부 삭제되는 버그 수정.
       
  
</div>
</details>

<details>
<summary>v1.0.0</summary>
<div markdown="1">
  
    최초 배포
</div>
</details>




