<script setup lang="ts">
import { ref } from "vue";
import { useColumns } from "./components/columns";
import Form from "./components/form.vue";
import AddQuestionDialog from "./components/AddQuestionDialog.vue";
import { View, Delete, Edit } from "@element-plus/icons-vue";
import { MODE } from "@/components/Base/BaseDialog/types";

const {
  loading,
  columns,
  dataList,
  hideVal,
  tableSize,
  pagination,
  loadingConfig,
  paginationAlign,
  // paginationSmall,
  onChange,
  onSizeChange,
  onCurrentChange,
  search: tableSearch
} = useColumns();
const formDialogRef = ref<InstanceType<typeof AddQuestionDialog>>();
const openDialog = (mode: MODE) => {
  if (!formDialogRef.value) return;
  formDialogRef.value.openDialog(mode);
};
// const openPositionDialog = (mode: MODE) => {
//   console.log("advertiseRef", advertiseRef.value);

//   if (!advertiseRef.value) return;
//   advertiseRef.value.openDialog(mode);
// };
hideVal.value = "nohide";
paginationAlign.value = "right";
function formatCategory(row) {
  if (!row.category) return "";
  return row?.category?.map(item => item.title).toString();
}
onChange(false);
// 暴露搜索方法
function search(e) {
  tableSearch(e);
}
function onStateChange(e) {
  console.log("e", e);
}
function editRow(row) {
  formDialogRef.value.setFromData(row);
  openDialog(MODE.EDIT);
}
defineExpose({ search });
</script>

<template>
  <div class="advertise">
    <Form @search="search" @add="openDialog(MODE.ADD)" />
    <pure-table
      border
      row-key="id"
      alignWhole="center"
      showOverflowTooltip
      :size="tableSize"
      :loading="loading"
      :loading-config="loadingConfig"
      :height="tableSize === 'small' ? 352 : 440"
      :data="dataList"
      :columns="columns"
      :pagination="pagination"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    >
      <template #category="{ row }">
        {{ formatCategory(row) }}
      </template>
      <template #state="{ row }">
        {{ row.state ? "启用" : "禁用" }}
      </template>
      <template #operation="{ row }">
        <el-button
          link
          type="primary"
          style="font-size: 18px; margin-right: 10px"
          :icon="Edit"
          size="small"
          @click.prevent="editRow(row)"
          >编辑</el-button
        >
        <span style="margin-right: 10px" @change.stop="">
          <!-- ts-ignore -->
          <el-switch
            @change="onStateChange"
            v-model="row.state"
            class="ml-2 mr-2"
            size="small"
            :active-value="true"
            :inactive-value="false"
            style="
              --el-switch-on-color: #13ce66;
              --el-switch-off-color: #cccccc;
            "
          />
          {{ row.state == true ? "启用" : "关闭" }}
        </span>
      </template>
    </pure-table>
    <AddQuestionDialog ref="formDialogRef" />
  </div>
</template>
<style lang="scss" scoped>
.advertise {
  padding: 20px;
  box-shadow: 0px 3px 6px 1px rgba(0, 0, 0, 0.16);
  background-color: #ffffff;
  border-radius: 8px;
}
</style>
