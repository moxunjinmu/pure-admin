import request from "@/utils/request";
import store from "@/store";

// 请求响应器
request.interceptors.request.use(
  function (config) {
    // config ：本次请求的配置对象
    // config 里面有一个属性：headers
    const { user } = store.state;
    //请求头未配置信息的时候才会配置
    if (user.token && config.headers.Authorizatio === undefined) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // 这里必须将config返回出去，否则请求会停在这 里
    return config;
  },
  function (error) {
    // 如果请求出错（还没发送出去，可能是代码写错了的问题），就会进入这里
    return Promise.reject(error);
  }
);

// 阻拦响应器
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response && error.response.status === 401) {
      // token续签方式2: refreshToken(用户无感知)
      // 将过期的token值清空
      store.commit("updataToken", "");
      //请求刷新token接口
      const { data: res } = await updataTokenAPI();
      //保存新的token值
      store.commit("updataToken", res.data.token);
      // 再调用一次未完成的请求啊(用户无感知)
      // error.config 就是上一次axios请求的配置对象
      // console.dir(error.config)
      // 把新的token赋予到下一次axios请求的请求头中
      error.config.headers.Authorization = "Bearer " + res.data.token;
      // return到await的地方，将未完成的请求再次发起，
      return axios(error.config);
    } else if (
      error.response.status === 500 &&
      error.config.url === "/v1_0/authorizations"
    ) {
      // 因为500的情况有很多种，refresh_token失效也是其中一种情况，所有再加上error.config.url === '/v1_0/authorizations'条件，确保是refresh_token失效情况
      // 清空所有的token和refresh_toekn，并且强制跳转登录页面
      store.commit("upUser", {});
      router.push({ path: "/login" });
      Toast.fail("身份已过期");
    }
    return Promise.reject(error);
  }
);
