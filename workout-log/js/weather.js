/* 브라우저에서 현재 위치를 요청해요. 거부하면 서울 좌표를 사용해요. */
      function 현재위치가져오기() {
        document.getElementById("날씨상태").innerText =
          "날씨를 불러오는 중입니다.";

        if (navigator.geolocation === undefined) {
          날씨불러오기(37.5665, 126.978, "서울 (기본 위치)");
          return;
        }

        navigator.geolocation.getCurrentPosition(
          function (위치) {
            날씨불러오기(
              위치.coords.latitude,
              위치.coords.longitude,
              "현재 위치",
            );
          },
          function () {
            날씨불러오기(37.5665, 126.978, "서울 (기본 위치)");
          },
        );
      }

/* Open-Meteo 날씨 API를 fetch로 불러와요. */
      function 날씨불러오기(위도, 경도, 위치이름) {
        const 날씨주소 =
          "https://api.open-meteo.com/v1/forecast?latitude=" +
          위도 +
          "&longitude=" +
          경도 +
          "&current=temperature_2m,apparent_temperature,relative_humidity_2m,precipitation";

        fetch(날씨주소)
          .then(function (결과) {
            return 결과.json();
          })
          .then(function (날씨결과) {
            현재날씨 = 날씨결과.current;
            날씨화면그리기(위치이름);
            공기질불러오기(위도, 경도);
          })
          .catch(function () {
            document.getElementById("날씨상태").innerText =
              "날씨 정보를 불러오지 못했습니다.";
            추천그리기();
          });
      }

/* 같은 위치의 공기질 정보도 Open-Meteo에서 불러와요. */
      function 공기질불러오기(위도, 경도) {
        const 공기주소 =
          "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" +
          위도 +
          "&longitude=" +
          경도 +
          "&current=pm2_5,pm10,european_aqi";

        fetch(공기주소)
          .then(function (결과) {
            return 결과.json();
          })
          .then(function (공기결과) {
            현재날씨.pm25 = 공기결과.current.pm2_5;
            현재날씨.pm10 = 공기결과.current.pm10;
            현재날씨.aqi = 공기결과.current.european_aqi;
            날씨를불러왔는지 = true;
            공기질화면그리기();
            추천그리기();
          })
          .catch(function () {
            날씨를불러왔는지 = true;
            추천그리기();
          });
      }

/* 같은 위치의 공기질 정보도 Open-Meteo에서 불러와요. */
      function 공기질불러오기(위도, 경도) {
        const 공기주소 =
          "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" +
          위도 +
          "&longitude=" +
          경도 +
          "&current=pm2_5,pm10,european_aqi";

        fetch(공기주소)
          .then(function (결과) {
            return 결과.json();
          })
          .then(function (공기결과) {
            현재날씨.pm25 = 공기결과.current.pm2_5;
            현재날씨.pm10 = 공기결과.current.pm10;
            현재날씨.aqi = 공기결과.current.european_aqi;
            날씨를불러왔는지 = true;
            공기질화면그리기();
            추천그리기();
          })
          .catch(function () {
            날씨를불러왔는지 = true;
            추천그리기();
          });
      }

      function 날씨화면그리기(위치이름) {
        document.getElementById("날씨상태").innerText = 위치이름;
        document.getElementById("기온").innerText =
          현재날씨.temperature_2m + "℃";
        document.getElementById("체감온도").innerText =
          현재날씨.apparent_temperature + "℃";
        document.getElementById("습도").innerText =
          현재날씨.relative_humidity_2m + "%";
        document.getElementById("강수").innerText =
          현재날씨.precipitation + "mm";
      }

/* 같은 위치의 공기질 정보도 Open-Meteo에서 불러와요. */
      function 공기질불러오기(위도, 경도) {
        const 공기주소 =
          "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=" +
          위도 +
          "&longitude=" +
          경도 +
          "&current=pm2_5,pm10,european_aqi";

        fetch(공기주소)
          .then(function (결과) {
            return 결과.json();
          })
          .then(function (공기결과) {
            현재날씨.pm25 = 공기결과.current.pm2_5;
            현재날씨.pm10 = 공기결과.current.pm10;
            현재날씨.aqi = 공기결과.current.european_aqi;
            날씨를불러왔는지 = true;
            공기질화면그리기();
            추천그리기();
          })
          .catch(function () {
            날씨를불러왔는지 = true;
            추천그리기();
          });
      }

      function 날씨화면그리기(위치이름) {
        document.getElementById("날씨상태").innerText = 위치이름;
        document.getElementById("기온").innerText =
          현재날씨.temperature_2m + "℃";
        document.getElementById("체감온도").innerText =
          현재날씨.apparent_temperature + "℃";
        document.getElementById("습도").innerText =
          현재날씨.relative_humidity_2m + "%";
        document.getElementById("강수").innerText =
          현재날씨.precipitation + "mm";
      }

      function 공기질화면그리기() {
        document.getElementById("미세먼지").innerText = 현재날씨.pm25 + "㎍/㎥";
        document.getElementById("AQI").innerText = 현재날씨.aqi;
      }

/* 최근 운동 부위와 날씨를 보고 아주 간단하게 오늘 운동을 추천해요. */
      function 추천그리기() {
        let 상체 = 0;
        let 하체 = 0;
        let 코어 = 0;

        const 최근기록 = 운동일지
          .slice()
          .sort(function (앞, 뒤) {
            return 뒤.날짜.localeCompare(앞.날짜);
          })
          .slice(0, 3);

        최근기록.map(function (하루) {
          하루.운동목록.map(function (운동) {
            if (운동.부위 === "상체") 상체 = 상체 + 1;
            if (운동.부위 === "하체") 하체 = 하체 + 1;
            if (운동.부위 === "코어") 코어 = 코어 + 1;
          });
        });

        let 추천부위 = "상체";
        if (하체 <= 상체 && 하체 <= 코어) 추천부위 = "하체";
        if (코어 <= 상체 && 코어 <= 하체) 추천부위 = "코어";

        let 장소추천 = "가벼운 야외 유산소를 함께 해도 좋습니다.";

        if (현재날씨 !== null) {
          if (현재날씨.precipitation > 0 || 현재날씨.aqi > 100) {
            장소추천 = "비나 공기질을 고려해 오늘은 실내 운동을 추천합니다.";
          }
        }

        if (운동일지.length === 0) {
          document.getElementById("추천내용").innerText =
            "아직 운동 기록이 없습니다. 오늘은 상체, 하체, 코어 중 한 부위를 가볍게 시작해 보세요. " +
            장소추천;
        } else {
          document.getElementById("추천내용").innerText =
            "최근 3일 기록에서 비교적 적게 한 부위는 " +
            추천부위 +
            "입니다. 오늘은 " +
            추천부위 +
            " 운동을 추천합니다. " +
            장소추천;
        }
      }
