/* 이번 달 운동 기록을 간단하게 계산해요. */
      function 통계그리기() {
        const 이번달 = 오늘날짜가져오기().slice(0, 7);
        let 운동일수 = 0;
        let 종목수 = 0;
        let 세트수 = 0;
        let 유산소거리 = 0;
        let 상체 = 0;
        let 하체 = 0;
        let 코어 = 0;
        let 유산소 = 0;
        let 종목횟수 = {};

        운동일지.map(function (하루) {
          if (하루.날짜.slice(0, 7) !== 이번달) return;

          운동일수 = 운동일수 + 1;

          하루.운동목록.map(function (운동) {
            종목수 = 종목수 + 1;

            if (운동.유형 === "웨이트") 세트수 = 세트수 + 운동.세트수;
            if (운동.유형 === "유산소") 유산소거리 = 유산소거리 + 운동.거리;

            if (운동.부위 === "상체") 상체 = 상체 + 1;
            if (운동.부위 === "하체") 하체 = 하체 + 1;
            if (운동.부위 === "코어") 코어 = 코어 + 1;
            if (운동.부위 === "유산소") 유산소 = 유산소 + 1;

            if (종목횟수[운동.종목] === undefined) 종목횟수[운동.종목] = 0;
            종목횟수[운동.종목] = 종목횟수[운동.종목] + 1;
          });
        });

        document.getElementById("운동일수").innerText = 운동일수 + "일";
        document.getElementById("종목수").innerText = 종목수 + "개";
        document.getElementById("세트수").innerText = 세트수 + "세트";
        document.getElementById("유산소거리").innerText =
          유산소거리.toFixed(1) + "km";

        const 전체 = 상체 + 하체 + 코어 + 유산소;
        부위막대그리기("상체", 상체, 전체);
        부위막대그리기("하체", 하체, 전체);
        부위막대그리기("코어", 코어, 전체);
        부위막대그리기("유산소", 유산소, 전체);

        let 가장많이한종목 = "기록 없음";
        let 가장많은횟수 = 0;

        Object.keys(종목횟수).map(function (종목) {
          if (종목횟수[종목] > 가장많은횟수) {
            가장많은횟수 = 종목횟수[종목];
            가장많이한종목 = 종목;
          }
        });

        document.getElementById("자주한운동").innerText = 가장많이한종목;
      }

/* 이번 달 운동 기록을 간단하게 계산해요. */
      function 통계그리기() {
        const 이번달 = 오늘날짜가져오기().slice(0, 7);
        let 운동일수 = 0;
        let 종목수 = 0;
        let 세트수 = 0;
        let 유산소거리 = 0;
        let 상체 = 0;
        let 하체 = 0;
        let 코어 = 0;
        let 유산소 = 0;
        let 종목횟수 = {};

        운동일지.map(function (하루) {
          if (하루.날짜.slice(0, 7) !== 이번달) return;

          운동일수 = 운동일수 + 1;

          하루.운동목록.map(function (운동) {
            종목수 = 종목수 + 1;

            if (운동.유형 === "웨이트") 세트수 = 세트수 + 운동.세트수;
            if (운동.유형 === "유산소") 유산소거리 = 유산소거리 + 운동.거리;

            if (운동.부위 === "상체") 상체 = 상체 + 1;
            if (운동.부위 === "하체") 하체 = 하체 + 1;
            if (운동.부위 === "코어") 코어 = 코어 + 1;
            if (운동.부위 === "유산소") 유산소 = 유산소 + 1;

            if (종목횟수[운동.종목] === undefined) 종목횟수[운동.종목] = 0;
            종목횟수[운동.종목] = 종목횟수[운동.종목] + 1;
          });
        });

        document.getElementById("운동일수").innerText = 운동일수 + "일";
        document.getElementById("종목수").innerText = 종목수 + "개";
        document.getElementById("세트수").innerText = 세트수 + "세트";
        document.getElementById("유산소거리").innerText =
          유산소거리.toFixed(1) + "km";

        const 전체 = 상체 + 하체 + 코어 + 유산소;
        부위막대그리기("상체", 상체, 전체);
        부위막대그리기("하체", 하체, 전체);
        부위막대그리기("코어", 코어, 전체);
        부위막대그리기("유산소", 유산소, 전체);

        let 가장많이한종목 = "기록 없음";
        let 가장많은횟수 = 0;

        Object.keys(종목횟수).map(function (종목) {
          if (종목횟수[종목] > 가장많은횟수) {
            가장많은횟수 = 종목횟수[종목];
            가장많이한종목 = 종목;
          }
        });

        document.getElementById("자주한운동").innerText = 가장많이한종목;
      }

      function 부위막대그리기(부위, 개수, 전체) {
        let 퍼센트 = 0;
        if (전체 > 0) 퍼센트 = Math.round((개수 / 전체) * 100);

        document.getElementById(부위 + "퍼센트").innerText = 퍼센트 + "%";
        document.getElementById(부위 + "막대").style.width = 퍼센트 + "%";
      }
