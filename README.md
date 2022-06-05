# Todo-Coin 프로젝트

### [📓프로젝트 보드 (노션)](https://gold-route-090.notion.site/To-do-Coin-b75b3b4bb3de4b16a4341878154c37ae)
### [✨figma 초기 디자인](https://www.figma.com/file/wPBJm0gWJUiY7PQVi2YqiA/To-do-Coin)
### [[⚡todo-coin]할일 작성하러 가기](https://todo-coin.netlify.app/)
<br/>

## 공지 사항
v2.0.0버전의 업데이트에서 새로운 기능의 많이 추가되어 기존 db의 모양이 변경되어 기존 데이터가 초기화되었음을 알려드립니다~!

<br/>

## 버전 정보
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
    1.  휴대폰에서 구글 접속 시 불가능 웹사이트에서만 접속 가능 버그.
        앱이 Google보안 브라우저정책을 준수하지 않았다고 오류가 나옵니다~!
        해결방법을 찾아봐야겠습니다.
        일단 휴대폰에서도 웹사이트로 접속하는 방법이면 사용 가능합니다.



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




