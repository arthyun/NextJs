import React, { useEffect } from 'react';

type ResBody = {
  [key: string]: string;
};

export default function WeatherTest() {
  const resBody: ResBody = {
    serviceKey: '9D7Rg6V6wDr4R1GG9TV/Y1c4JU9ttSuq9KL8/+5PMw4tls0giUwdYXMH751nxznUp7lL3wQL0YDgFZYc/dNtwQ==',
    pageNo: '1',
    numOfRows: '10',
    dataType: 'json',
    base_date: '20240627',
    base_time: '0600',
    nx: '33',
    ny: '127'
  };

  const createParam = (urlData: ResBody) => {
    return Object.keys(urlData)
      .map((item) => `${item}=${encodeURIComponent(resBody[item])}`)
      .join('&');
  };

  const getData = async () => {
    const response = await fetch(`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?${createParam(resBody)}`);
    const result = await response.json();
    console.log(result.response);
  };

  useEffect(() => {
    // createParam(resBody);
    getData();
  }, []);

  return <div>WeatherTest</div>;
}
