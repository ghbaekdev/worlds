#### next.js api를 이용한 게임 데이터 제공 어플리케이션

<br/>

# 목차

- [실행](#1-실행)

<br/>
<br/>

## Tech Stack

<div>
    <img src="https://img.shields.io/badge/Next-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=black">
    <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
     <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
     
</div>

<br/>
<br/>

## 1. 실행

### 실행 방법

```sh
npm install

npm run dev
```

<br/>
<br/>

### 2-1 Stage

- lodash 라이브러리 cloneDeep 메소드로 복사 후 스테이지 별 정렬.
  ![image](https://user-images.githubusercontent.com/97820540/202878816-750d4e22-2fd1-4e60-bf2a-70a474355e06.png)
  <br />

- 검색 버튼 클릭 시 userList에서 input Value와 같은 값만 추출 후 filterList에 setState.  
  ![image](https://user-images.githubusercontent.com/97820540/202878860-34de3af0-eb13-48e5-a8ee-99facfc90dab.png)
  <br />

- 조건부 렌더링으로 filterList에 데이터가 있을 경우 랭킹테이블을 필터리스트를 , 데이터가 없을 경우 기존 stageRank에 4위 부터 보여줌
  ![image](https://user-images.githubusercontent.com/97820540/202878912-dbbecdc2-0266-4d9c-87ea-eea683addf17.png)

<br/>

- top3 트로피 컴포넌트는 정렬한 stageRank에 slice 메소드로 추출하여 사용
  ![image](https://user-images.githubusercontent.com/97820540/202878947-159f24ee-a4cc-434c-8d48-7bbb2cd991a8.png)

<br/>

### 2-2 Ranking

- level,pvp 별 정렬하여 랭킹테이블 컴포넌트에 사용.
  ![image](https://user-images.githubusercontent.com/97820540/202879014-6dcd2a3e-2b6e-49f6-ae2b-457429cc4f91.png)

<br/>

### 2-3 Reward

- reduce 메소드를 사용하여 국가별 인구분포 추출하여 Pie 차트에 사용.
  ![image](https://user-images.githubusercontent.com/97820540/202879043-a5a72795-ad48-47fd-bc82-65c46f0b0dd3.png)

 <br />

- 위와 동일하여 reduce 메소드를 사용하여 reward type 데이터 추출하여 Bar 차트에 사용.
  ![image](https://user-images.githubusercontent.com/97820540/202879118-2d30fe2d-789d-45fa-a614-e2049ecf984d.png)

해당 카테고리 클릭시 페이지 이동.

<br/>

### 2-4 usePagination

- userList와 페이지당 아이템 개수를 인자로 받는 훅 사용.
- 현재 페이지, 다음, 이전페이지 이동 및 페이지 점프 기능 구현.

![image](https://user-images.githubusercontent.com/97820540/202879175-81b4c3d7-daab-4ace-b2a3-643868515553.png)

### 2-5 useGetList

- 페이지 별 데이터 통신 코드가 중복되어 훅으로 작성.
- userList는 recoil을 사용한 global state로 userlist에 데이터가 안 담겨 있을 경우 getUserList함수 실행.
- userList는 global state로 리턴이 불필요. 로딩 state만 리턴하여 사용.
  ![image](https://user-images.githubusercontent.com/97820540/202879422-ad7f69f0-bbf8-4b97-95de-b5f247410043.png)

<br/>

<br/>

<br/>
