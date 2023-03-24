<script setup lang="ts">
// import { tableData } from "./table/data";
import { getStatistic } from "@/api/table";
import { reactive } from "vue";
import Base from "./table/base.vue";
defineOptions({
  name: "Welcome"
});
let new_req_user_statistics = reactive([]);

function getdata() {
  getStatistic().then(res => {
    const { data } = res;
    new_req_user_statistics = data.new_req_user_statistics;
  });
}
getdata();

const columns: TableColumnList = [
  {
    label: "名称",
    prop: "user"
  },
  {
    label: "平台",
    prop: "platform"
  },
  {
    label: "创建日期",
    prop: "create_time"
  },
  {
    label: "更新日期",
    prop: "update_time"
  }
];
</script>

<template>
  <div>
    <h1>平台</h1>
    <Base :columns="columns" :tableData="new_req_user_statistics" />
  </div>
</template>
