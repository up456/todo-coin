# Todo-Coin 프로젝트

### [📓프로젝트 보드 (노션)](https://gold-route-090.notion.site/To-do-Coin-b75b3b4bb3de4b16a4341878154c37ae)
### [[⚡todo-coin]할일 작성하러 가기](https://todo-coin.netlify.app/)

## 버전 정보
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




