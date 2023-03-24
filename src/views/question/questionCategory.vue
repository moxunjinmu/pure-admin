<script setup lang="ts">
import { ref } from "vue";
import { useColumns } from "./components/category";
import categoryFrom from "./components/categoryFrom.vue";
import AddCategoryDialog from "./components/AddCategoryDialog.vue";
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
const form = ref({});
// const formDialogRef = ref<InstanceType<typeof AddAdvertiseDialog>>();
const addCategory = ref<InstanceType<typeof AddCategoryDialog>>();
const openDialog = (mode: MODE) => {
  if (!addCategory.value) return;
  addCategory.value.openDialog(mode);
};
// const openPositionDialog = (mode: MODE) => {
//   console.log("advertiseRef", advertiseRef.value);

//   if (!advertiseRef.value) return;
//   advertiseRef.value.openDialog(mode);
// };
hideVal.value = "nohide";
paginationAlign.value = "right";
// function formatPosition(row) {
//   if (!row.position) return "";
//   return row?.position?.map(item => item.title).toString();
// }
onChange(false);

function search(e = null) {
  if (!e) e = form.value;
  form.value = e;
  tableSearch(e);
}
function onStateChange(e) {
  console.log("e", e);
}
function editRow(row) {
  formDialogRef.value.setFromData(row);
  openDialog(MODE.EDIT);
}
function viewRow(row) {
  console.log("row", row);
}
function deleteRow(row) {
  console.log("row", row);
}
// defineExpose({ search });
</script>

<template>
  <div class="advertise">
    <categoryFrom
      @search="search"
      @add="openDialog(MODE.ADD)"
      @addPosition="openPositionDialog(MODE.ADD)"
    />
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
      <template #state="{ row }">
        {{ row.state ? "启用" : "禁用" }}
      </template>
      <template #operation="{ row }">
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
    <AddCategoryDialog ref="addCategory" @close="search()" />
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
