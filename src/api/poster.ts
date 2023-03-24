import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type position = {
  id: number;
  title: string;
};
// 广告表格数据
export type PlatformTable = {
  end_time: string;
  link_url: string;
  position: Array<position>;
  poster_category: string;
  start_time: string;
  state: boolean;
  title: string;
};

// 广告获取数据返回值
export type StatisticResult<T> = {
  success: boolean;
  data: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<T>;
  };
  msg: string;
  code: number;
  nj_logo?: string;
};

/** 获取广告列表 */
export const getPosterList = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "get",
    baseUrlApi("poster/posters/"),
    {
      data
    }
  );
};

/** 新增广告列表 */
export const PostAddAdvertiseList = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "post",
    baseUrlApi("poster/posters/"),
    {
      data
    }
  );
};

/** 新增广告位置 */
export const PostPositionList = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "post",
    baseUrlApi("poster/positions/"),
    {
      data
    }
  );
};

/** 查询广告位置 */
export const getPositionList = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "get",
    baseUrlApi("poster/positions/"),
    {
      data
    }
  );
};
