import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

type position = {
  id: number;
  title: string;
};
type Category = {
  state: boolean;
  title: string;
};
// 问题表格数据
export type PlatformTable = {
  category: Array<position>;
  state: boolean;
  title: string;
};

export type CategoryTable = {
  category: Array<Category>;
  id: number;
  state: boolean;
  title: string;
};

export type AddCategory = {
  create_time: string;
  state: boolean;
  title: string;
};

// 问题获取数据返回值
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

/** 获取问题列表 */
export const getQuestionList = (params?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "get",
    baseUrlApi("notice/notice/"),
    {
      params
    }
  );
};

/** 编辑问题 */
export const putQuestionList = (data: any) => {
  return http.request<StatisticResult<PlatformTable>>(
    "put",
    baseUrlApi(`notice/notice/${data.id}/`),
    {
      data
    }
  );
};

/** 获取问题分类列表 */
export const getQuestionCategoryList = (params?: object) => {
  console.log("data", params);

  return http.request<StatisticResult<CategoryTable>>(
    "get",
    baseUrlApi("notice/category/"),
    {
      params
    }
  );
};

/** 新增问题分类列表 */
export const PostAddCategory = (data?: object) => {
  return http.request<StatisticResult<AddCategory>>(
    "post",
    baseUrlApi("notice/category/"),
    {
      data
    }
  );
};

/** 新增问题 */
export const PostQuestion = (data?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "post",
    baseUrlApi("notice/notice/"),
    {
      data
    }
  );
};

/** 查询广告位置 */
export const getPositionList = (params?: object) => {
  return http.request<StatisticResult<PlatformTable>>(
    "get",
    baseUrlApi("poster/positions/"),
    {
      params
    }
  );
};
