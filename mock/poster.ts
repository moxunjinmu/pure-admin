// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";
const posterList = {
  msg: "SUCCESS",
  code: 200,
  success: true,
  data: {
    count: 3,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        position: null,
        title: "xxx",
        link_url: "http://www.baidu.com",
        type: "1",
        start_time: "2023-03-10",
        end_time: "2023-03-25",
        status: true,
        create_time: "2023-03-10 16:20:31",
        update_time: "2023-03-10 16:20:34"
      },
      {
        id: 2,
        position: null,
        title: "asas",
        link_url: "sd",
        type: "1",
        start_time: "2023-03-10",
        end_time: "2023-03-10",
        status: true,
        create_time: "2023-03-10 20:07:22",
        update_time: "2023-03-10 20:07:25"
      },
      {
        id: 3,
        position: null,
        title: "ad",
        link_url: "dasdas",
        type: "1",
        start_time: "2023-03-10",
        end_time: "2023-03-10",
        status: true,
        create_time: "2023-03-10 20:07:56",
        update_time: "2023-03-10 20:07:59"
      }
    ]
  },
  nj_logo: "南京机敏",
  extra_kwargs: {
    张文剑: "傻逼",
    袁进坤: "沙雕、雕花哥",
    王渊: "里卡多",
    于勇: "实习生大王"
  }
};
const add = {
  msg: "SUCCESS",
  code: 201,
  success: true,
  data: {
    title: "士大夫地方",
    link_url: "士大夫",
    start_time: "2023-03-02",
    end_time: "2023-03-17",
    state: true,
    position: [{ id: 1, title: "轮播图" }],
    poster_category: "免费类型"
  }
};

const addPosition = {
  msg: "SUCCESS",
  code: 200,
  success: true,
  data: { title: "是的", state: true }
};

const getPosition = {
  msg: "SUCCESS",
  code: 200,
  success: true,
  data: [
    { title: "轮播图", state: true },
    { title: "首页顶部", state: true },
    { title: "首页底部", state: true },
    { title: "撒打算", state: true },
    { title: "是的", state: true },
    { title: "是的是否", state: true }
  ]
};
export default [
  {
    url: "/login",
    method: "post",
    response: ({ body }) => {
      if (body.username === "admin") {
        return posterList;
      }
    }
  }
] as MockMethod[];
