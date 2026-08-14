/* 운동 기록 전체를 담는 배열이에요. */
      let 운동일지 = [];
      let 선택한부위 = "전체";
      let 입력한검색어 = "";
      let 검색타이머 = "아직실행안함";
      let 삭제종류 = "";
      let 삭제하루번호 = 0;
      let 삭제종목순서 = -1;
      let 날씨를불러왔는지 = false;
      let 현재날씨 = null;

      /* localStorage에서 운동 기록을 불러와요. */

/* localStorage에서 운동 기록을 불러와요. */
      function 처음화면준비하기() {
        const 저장된운동 = localStorage.getItem("용휘운동일지");

        if (저장된운동 !== null) {
          운동일지 = JSON.parse(저장된운동);
        }

        운동목록그리기(운동일지);
      }

/* 운동 기록을 localStorage에 저장해요. */
      function 운동저장하기() {
        localStorage.setItem("용휘운동일지", JSON.stringify(운동일지));
      }

/* 날짜를 YYYY-MM-DD 모양으로 만들어요. */
      function 오늘날짜가져오기() {
        const 오늘 = new Date();
        const 년 = 오늘.getFullYear();
        const 월 = String(오늘.getMonth() + 1).padStart(2, "0");
        const 일 = String(오늘.getDate()).padStart(2, "0");
        return 년 + "-" + 월 + "-" + 일;
      }

/* 탭을 누르면 선택한 메뉴만 보여 줘요. */
      function 메뉴이동(메뉴이름) {
        const 기록메뉴 = document.getElementById("기록메뉴");
        const 통계메뉴 = document.getElementById("통계메뉴");
        const 오늘메뉴 = document.getElementById("오늘메뉴");

        기록메뉴.style.display = 메뉴이름 === "기록" ? "block" : "none";
        통계메뉴.style.display = 메뉴이름 === "통계" ? "block" : "none";
        오늘메뉴.style.display = 메뉴이름 === "오늘" ? "block" : "none";

        document.getElementById("기록탭").className =
          메뉴이름 === "기록" ? "탭버튼 선택된탭" : "탭버튼";
        document.getElementById("통계탭").className =
          메뉴이름 === "통계" ? "탭버튼 선택된탭" : "탭버튼";
        document.getElementById("오늘탭").className =
          메뉴이름 === "오늘" ? "탭버튼 선택된탭" : "탭버튼";

        if (메뉴이름 === "통계") 통계그리기();

        if (메뉴이름 === "오늘" && 날씨를불러왔는지 === false) {
          현재위치가져오기();
        }
      }

/* 다크모드는 body 클래스만 바꿔요. 새로고침하면 원래대로 돌아와요. */
      function 다크모드바꾸기() {
        document.body.classList.toggle("다크모드");
      }

window.addEventListener("keydown", function (event) {
        if (event.key !== "Escape") return;

        if (document.getElementById("삭제확인모달").style.display === "flex") {
          삭제모달닫기();
          return;
        }

        if (document.getElementById("저장완료모달").style.display === "flex") {
          완료모달닫기();
          return;
        }

        if (document.getElementById("운동등록모달").style.display === "flex") {
          모달닫기();
          return;
        }

        if (document.getElementById("상세보기모달").style.display === "flex") {
          상세보기닫기();
        }
      });

      window.onload = function () {
        처음화면준비하기();
      };
