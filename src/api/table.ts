import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

// 平台表格数据
export type PlatformTable = {
  user: string;
  platform: string;
  create_time: string;
  update_time: string;
};

// 平台获取数据返回值
export type StatisticResult<T> = {
  code: number;
  success: boolean;
  data: {
    user_online_statistics: Array<T>;
    new_req_user_statistics: Array<T>;
  };
  msg: string;
};

/** 登录 */
export const getStatistic = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "get",
    baseUrlApi("statistic/"),
    {
      data
    }
  );
};
