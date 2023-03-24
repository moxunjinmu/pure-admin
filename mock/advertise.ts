// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/mock/v1/notice/notice/",
    method: "get",
    response: () => {
      // if (params.username === "admin") {
      return {
        success: true,
        data: {
          count: 2,
          next: null,
          pervious: null,
          results: [
            {
              category: [{ state: true, title: "111" }],
              id: 1,
              state: true,
              title: "问题"
            }
          ]
        }
        // };
      };
    }
  }
] as MockMethod[];
