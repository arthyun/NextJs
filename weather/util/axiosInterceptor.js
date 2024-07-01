import axios from 'axios';

export const axiosInterceptors = (setFunc) => {
  axios.interceptors.request.use(
    (config) => {
      // if(config.url.includes('/api/')) setFunc(true);
      setFunc(true);
      return config;
    },
    (error) => {
      // 에러 팝업 혹은 콘솔 표출
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      setFunc(false);
      // const data = JSON.parse(JSON.stringify(response.data).replace(/\"ATV\"/g, '"8VSB"'));
      // return { ...response, data };
      // const data = restoreResponseXss(response.data);
      // console.log(data, response.data);
      // return { ...response, data };
      return response;
    },
    (error) => {
      setFunc(false);

      if (error.response?.status === 401 || error.response.data?.status === '401') {
        // setIsLogin(userInfo ? false : undefined);
      }

      // 에러 팝업 혹은 콘솔 표출
      return Promise.reject(error);
    }
  );
};
