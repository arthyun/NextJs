export function createGpsTransfer(lat, lon) {
  let xLat = 0; // x좌표로 변환된 위도
  let yLon = 0; // y좌표로 변환된 경도

  function getLat() {
    return lat;
  }

  function getLon() {
    return lon;
  }

  function getxLat() {
    return xLat;
  }

  function getyLon() {
    return yLon;
  }

  function setLat(newLat) {
    lat = newLat;
  }

  function setLon(newLon) {
    lon = newLon;
  }

  function setxLat(newXLat) {
    xLat = newXLat;
  }

  function setyLon(newYLon) {
    yLon = newYLon;
  }

  function transfer(gpt, mode) {
    const RE = 6371.00877; // 지구 반경(km)
    const GRID = 5.0; // 격자 간격(km)
    const SLAT1 = 30.0; // 투영 위도1(degree)
    const SLAT2 = 60.0; // 투영 위도2(degree)
    const OLON = 126.0; // 기준점 경도(degree)
    const OLAT = 38.0; // 기준점 위도(degree)
    const XO = 43; // 기준점 X좌표(GRID)
    const YO = 136; // 기준점 Y좌표(GRID)

    const DEGRAD = Math.PI / 180.0;
    const RADDEG = 180.0 / Math.PI;

    const re = RE / GRID;
    const slat1 = SLAT1 * DEGRAD;
    const slat2 = SLAT2 * DEGRAD;
    const olon = OLON * DEGRAD;
    const olat = OLAT * DEGRAD;

    let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
    let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
    sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
    let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
    ro = (re * sf) / Math.pow(ro, sn);

    if (mode === 0) {
      let ra = Math.tan(Math.PI * 0.25 + gpt.getLat() * DEGRAD * 0.5);
      ra = (re * sf) / Math.pow(ra, sn);
      let theta = gpt.getLon() * DEGRAD - olon;
      if (theta > Math.PI) theta -= 2.0 * Math.PI;
      if (theta < -Math.PI) theta += 2.0 * Math.PI;
      theta *= sn;
      let x = Math.floor(ra * Math.sin(theta) + XO + 0.5);
      let y = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
      gpt.setxLat(x);
      gpt.setyLon(y);
    } else {
      let xlat = gpt.getxLat();
      let ylon = gpt.getyLon();
      let xn = xlat - XO;
      let yn = ro - ylon + YO;
      let ra = Math.sqrt(xn * xn + yn * yn);
      if (sn < 0.0) {
        ra = -ra;
      }
      let alat = Math.pow((re * sf) / ra, 1.0 / sn);
      alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

      let theta = 0.0;
      if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
      } else {
        if (Math.abs(yn) <= 0.0) {
          theta = Math.PI * 0.5;
          if (xn < 0.0) {
            theta = -theta;
          }
        } else {
          theta = Math.atan2(xn, yn);
        }
      }
      let alon = theta / sn + olon;
      gpt.setLat(alat * RADDEG);
      gpt.setLon(alon * RADDEG);
    }
  }

  function toString() {
    return `GpsTransfer{ lat=${lat}, lon=${lon}, xLat=${xLat}, yLon=${yLon} }`;
  }

  return {
    getLat,
    getLon,
    getxLat,
    getyLon,
    setLat,
    setLon,
    setxLat,
    setyLon,
    transfer,
    toString
  };
}

// // Example usage:
// const gpsTransfer = createGpsTransfer(37.5, -122.3); // Replace with your desired initial lat and lon
// console.log(gpsTransfer.toString());

// // Example transfer usage:
// const otherGpsTransfer = createGpsTransfer(38.0, -123.0); // Replace with other GPS coordinates
// gpsTransfer.transfer(otherGpsTransfer, 0); // Transfer mode
// console.log(gpsTransfer.toString()); // Display transferred coordinates
