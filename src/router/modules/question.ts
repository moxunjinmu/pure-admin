import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Question",
  component: Layout,
  redirect: "/QuestionList",
  meta: {
    icon: "homeFilled",
    title: $t("menus.question"),
    rank: 0
  },
  children: [
    {
      path: "/QuestionList",
      name: "QuestionList",
      component: () => import("@/views/question/index.vue"),
      meta: {
        title: $t("menus.question")
      }
    },
    {
      path: "/QuestionCategory",
      name: "QuestionCategory",
      component: () => import("@/views/question/questionCategory.vue"),
      meta: {
        title: $t("menus.questionCategory")
      }
    }
  ]
} as RouteConfigsTable;
