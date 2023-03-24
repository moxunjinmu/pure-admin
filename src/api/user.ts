import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  data: {
    /** 用户名 */
    username: string;
    /** 当前登陆用户的角色 */
    roles: Array<string>;
    /** `token` */
    access: string;
    /** 用于调用刷新`access`的接口时所需的`token` */
    refresh: string;
    /** `access`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type refreshResult = {
  success: boolean;
  data: {
    /** `token` */
    access: string;
    /** 用于调用刷新`access`的接口时所需的`token` */
    refresh: string;
    /** `access`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("token/"), { data });
};

// /statistic/

/** 刷新token */
export const refreshApi = (data?: object) => {
  console.log("refreshApi", data);

  return http.request<refreshResult>("post", baseUrlApi("token/refresh/"), {
    data
  });
};
