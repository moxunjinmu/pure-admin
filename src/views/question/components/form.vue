<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="广告位置">
      <el-select v-model="formInline.region" placeholder="选择广告位置">
        <el-option label="首页轮播图" value="rotograph" />
        <el-option label="左侧广告图" value="left" />
      </el-select>
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
      <el-button @click="addQuestion()">新增</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from "vue";

const formInline = ref({
  user: "",
  region: "",
  status: ""
});
const emit = defineEmits(["search", "add", "addPosition"]);
const addQuestion = () => {
  emit("add");
};
const onSubmit = () => {
  console.log("submit!");
  emit("search", formInline);
};
</script>
