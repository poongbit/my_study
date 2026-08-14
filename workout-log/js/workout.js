/* 운동 한 종목의 설명 문장을 만들어요. */
      function 운동설명만들기(운동) {
        if (운동.유형 === "유산소") {
          let 설명 = 운동.시간 + "분";
          if (운동.거리 > 0) 설명 = 설명 + " · " + 운동.거리 + "km";
          return 설명;
        }

        let 설명 = 운동.세트수 + "세트 · " + 운동.횟수 + "회";
        if (운동.무게 > 0) 설명 = 운동.무게 + "kg · " + 설명;
        return 설명;
      }

/* 하루 운동 기록을 카드 HTML로 바꿔요. */
      function 운동카드만들기(하루) {
        let 종목HTML = "";

        하루.운동목록.map(function (운동, 순서) {
          종목HTML =
            종목HTML +
            `
                    <div class="종목한줄">
                        <div>
                            <div class="종목이름">${운동.종목} · ${운동.부위}</div>
                            <div class="종목설명">${운동설명만들기(운동)}</div>
                            ${운동.메모 ? `<div class="종목설명">메모 · ${운동.메모}</div>` : ""}
                        </div>
                        <button class="종목삭제버튼" onclick="event.stopPropagation(); 종목삭제하기(${하루.번호}, ${순서})">삭제</button>
                    </div>
                `;
        });

        const 메모HTML =
          하루.메모 === "" ? "" : `<div class="하루메모">${하루.메모}</div>`;

        return `
                <div class="운동카드" onclick="상세보기열기(${하루.번호})">
                    <div class="카드상단">
                        <div class="날짜">${하루.날짜}</div>
                        <button class="하루삭제버튼" onclick="event.stopPropagation(); 하루삭제하기(${하루.번호})">×</button>
                    </div>
                    ${메모HTML}
                    ${종목HTML}
                </div>
            `;
      }

/* 검색과 부위 필터를 적용한 뒤 카드를 화면에 그려요. */
      function 운동목록그리기(목록) {
        let 카드HTML = "";

        const 정렬된목록 = 목록.slice().sort(function (앞, 뒤) {
          return 뒤.날짜.localeCompare(앞.날짜);
        });

        정렬된목록.map(function (하루) {
          카드HTML = 카드HTML + 운동카드만들기(하루);
        });

        if (카드HTML === "") {
          카드HTML = '<div class="결과없음">아직 운동 기록이 없습니다.</div>';
        }

        document.getElementById("운동목록").innerHTML = 카드HTML;
      }

/* 검색어와 부위 조건에 맞는 기록만 찾아요. */
      function 운동검색하기() {
        const 검색결과 = 운동일지.filter(function (하루) {
          const 조건에맞는운동 = 하루.운동목록.filter(function (운동) {
            const 부위가맞는지 =
              선택한부위 === "전체" || 운동.부위 === 선택한부위;
            const 검색어가있는지 = 운동.종목.indexOf(입력한검색어) !== -1;
            return 부위가맞는지 && 검색어가있는지;
          });

          return 조건에맞는운동.length > 0;
        });

        운동목록그리기(검색결과);
      }

/* 검색어와 부위 조건에 맞는 기록만 찾아요. */
      function 운동검색하기() {
        const 검색결과 = 운동일지.filter(function (하루) {
          const 조건에맞는운동 = 하루.운동목록.filter(function (운동) {
            const 부위가맞는지 =
              선택한부위 === "전체" || 운동.부위 === 선택한부위;
            const 검색어가있는지 = 운동.종목.indexOf(입력한검색어) !== -1;
            return 부위가맞는지 && 검색어가있는지;
          });

          return 조건에맞는운동.length > 0;
        });

        운동목록그리기(검색결과);
      }

      function 부위바꾸기(event) {
        선택한부위 = event.target.value;
        운동검색하기();
      }

/* 글자를 계속 입력할 때 너무 자주 검색하지 않도록 500ms 기다려요. */
      function 검색어바꾸기(event) {
        const 검색어 = event.target.value;
        clearTimeout(검색타이머);

        검색타이머 = setTimeout(function () {
          입력한검색어 = 검색어;
          운동검색하기();
        }, 500);
      }

/* 웨이트/유산소를 바꾸면 필요한 입력칸만 보여 줘요. */
      function 운동유형바꾸기() {
        const 유형 = document.getElementById("유형입력").value;
        const 웨이트입력 = document.getElementById("웨이트입력");
        const 유산소입력 = document.getElementById("유산소입력");
        const 부위입력 = document.getElementById("부위입력");

        if (유형 === "유산소") {
          웨이트입력.style.display = "none";
          유산소입력.style.display = "grid";
          부위입력.value = "유산소";
        } else {
          웨이트입력.style.display = "grid";
          유산소입력.style.display = "none";
          if (부위입력.value === "유산소") 부위입력.value = "상체";
        }
      }

/* 입력한 운동 한 종목을 배열에 추가해요. */
      function 운동등록하기() {
        const 날짜 = document.getElementById("날짜입력").value;
        const 유형 = document.getElementById("유형입력").value;
        const 부위 = document.getElementById("부위입력").value;
        const 종목 = document.getElementById("종목입력").value.trim();
        const 메모 = document.getElementById("메모입력").value.trim();

        if (날짜 === "" || 종목 === "") {
          alert("날짜와 운동 종목을 입력해 주세요.");
          return;
        }

        const 새운동 = {
          유형: 유형,
          부위: 부위,
          종목: 종목,
          세트수: Number(document.getElementById("세트입력").value) || 0,
          무게: Number(document.getElementById("무게입력").value) || 0,
          횟수: Number(document.getElementById("횟수입력").value) || 0,
          시간: Number(document.getElementById("시간입력").value) || 0,
          거리: Number(document.getElementById("거리입력").value) || 0,
          메모: 메모,
        };

        /* 같은 날짜가 있으면 새 카드를 만들지 않고 그 날짜에 운동을 추가해요. */
        let 같은날짜 = 운동일지.find(function (하루) {
          return 하루.날짜 === 날짜;
        });

        if (같은날짜 === undefined) {
          같은날짜 = {
            번호: new Date().getTime(),
            날짜: 날짜,
            메모: "",
            운동목록: [],
          };
          운동일지.push(같은날짜);
        }

        같은날짜.운동목록.push(새운동);

        운동저장하기();
        운동검색하기();
        입력값초기화하기();
        모달닫기();
        완료모달열기();
      }

/* 등록 후 입력창을 비워 줘요. */
      function 입력값초기화하기() {
        document.getElementById("종목입력").value = "";
        document.getElementById("메모입력").value = "";
        document.getElementById("세트입력").value = "3";
        document.getElementById("무게입력").value = "";
        document.getElementById("횟수입력").value = "10";
        document.getElementById("시간입력").value = "30";
        document.getElementById("거리입력").value = "";
      }

/* 삭제 버튼을 누르면 삭제 확인 모달을 먼저 보여 줘요. */
      function 하루삭제하기(번호) {
        삭제종류 = "하루";
        삭제하루번호 = 번호;
        삭제종목순서 = -1;
        document.getElementById("삭제문장").innerText =
          "이 날짜의 운동 기록을 모두 삭제할까요?";
        document.getElementById("삭제확인모달").style.display = "flex";
        document.body.style.overflow = "hidden";
      }

/* 삭제 버튼을 누르면 삭제 확인 모달을 먼저 보여 줘요. */
      function 하루삭제하기(번호) {
        삭제종류 = "하루";
        삭제하루번호 = 번호;
        삭제종목순서 = -1;
        document.getElementById("삭제문장").innerText =
          "이 날짜의 운동 기록을 모두 삭제할까요?";
        document.getElementById("삭제확인모달").style.display = "flex";
        document.body.style.overflow = "hidden";
      }

      function 종목삭제하기(하루번호, 종목순서) {
        삭제종류 = "종목";
        삭제하루번호 = 하루번호;
        삭제종목순서 = 종목순서;
        document.getElementById("삭제문장").innerText =
          "이 운동 종목을 삭제할까요?";
        document.getElementById("삭제확인모달").style.display = "flex";
        document.body.style.overflow = "hidden";
      }

/* 실제 삭제는 확인 버튼을 눌렀을 때 실행해요. */
      function 삭제확인하기() {
        if (삭제종류 === "하루") {
          운동일지 = 운동일지.filter(function (하루) {
            return 하루.번호 !== 삭제하루번호;
          });
        }

        if (삭제종류 === "종목") {
          const 하루 = 운동일지.find(function (기록) {
            return 기록.번호 === 삭제하루번호;
          });

          if (하루 !== undefined) {
            하루.운동목록.splice(삭제종목순서, 1);

            if (하루.운동목록.length === 0) {
              운동일지 = 운동일지.filter(function (기록) {
                return 기록.번호 !== 삭제하루번호;
              });
            }
          }
        }

        운동저장하기();
        운동검색하기();
        삭제모달닫기();
      }
