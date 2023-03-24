<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="开始时间" prop="start_time">
      <el-date-picker
        v-model="formInline.start_time"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        placeholder="开始时间"
      />
    </el-form-item>
    <el-form-item label="结束时间" prop="end_time">
      <el-date-picker
        v-model="formInline.end_time"
        type="date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        placeholder="结束时间"
      />
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="formInline.status" placeholder="全部">
        <el-option label="启用" value="enable" />
        <el-option label="禁用" value="disable" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
    </el-form-item>
    <el-form-item>
      <el-button @click="addCategoryType()">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, defineEmits } from "vue";

const formInline = reactive({
  end_time: "",
  start_time: "",
  status: ""
});
const emit = defineEmits(["search", "add", "addPosition"]);
const addCategoryType = () => {
  emit("add");
};

const onSubmit = () => {
  console.log("submit!");
  emit("search", formInline);
};
</script>
