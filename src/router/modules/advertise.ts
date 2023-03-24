import { $t } from "@/plugins/i18n";
const Layout = () => import("@/layout/index.vue");

export default {
  path: "/",
  name: "Advertise",
  component: Layout,
  redirect: "/AdvertiseList",
  meta: {
    icon: "homeFilled",
    title: $t("menus.advertise"),
    rank: 0
  },
  children: [
    {
      path: "/AdvertiseList",
      name: "AdvertiseList",
      component: () => import("@/views/Advertise/index.vue"),
      meta: {
        title: $t("menus.advertise")
      }
    }
  ]
} as RouteConfigsTable;
