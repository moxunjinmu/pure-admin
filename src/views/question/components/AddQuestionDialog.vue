<template>
  <Dialog
    :before-close="customClose"
    @confirm="confirm"
    v-model="visible"
    :title="mode == MODE.ADD ? '添加问题' : '编辑问题'"
    :confirm-text="mode == MODE.ADD ? '添加' : '修改'"
  >
    <el-form
      label-width="100px"
      :model="formData"
      ref="formDataRef"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="问题名称" prop="title">
        <el-input placeholder="问题名称" v-model="formData.title" />
      </el-form-item>
      <el-form-item label="类型" prop="category">
        <el-select v-model="formData.category" placeholder="选择广告类型">
          <el-option
            v-for="item in categoryList"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </Dialog>
</template>
<script setup lang="ts">
import { ElMessage, FormInstance } from "element-plus";
import { Ref, ref } from "vue";
import Dialog from "@/components/Base/BaseDialog/Dialog.vue";
import { MODE } from "@/components/Base/BaseDialog/types";
import useDialogWithForm from "@/components/Base/BaseDialog/useDialogWithForm";
import {
  PostQuestion,
  getQuestionCategoryList,
  putQuestionList
} from "@/api/question";

const rules = {
  title: {
    type: "string",
    required: true,
    // pattern: /^[a-z]+$/,
    trigger: "change",
    message: "只能是英文名称哦",
    transform(value: string) {
      return value.trim();
    }
  }
};

interface FromDataType {
  title: string;
  category: string | Array<any>;
  id: string | number;
}
const formDataRef = ref<FormInstance | null>(null);
const categoryList = ref([]);
const getCategory = async () => {
  const { data } = await getQuestionCategoryList();
  console.log("getQuestionCategoryList", data);
  categoryList.value = data.results;
};

const formData = ref<FromDataType>({
  title: "",
  category: "",
  id: ""
});

const { visible, closeDialog, openDialog, mode } = useDialogWithForm(
  formDataRef as Ref<FormInstance>
);

const confirm = () => {
  if (!formDataRef.value) return;

  formDataRef.value.validate(async valid => {
    if (valid) {
      if (mode.value == MODE.ADD) {
        await PostQuestion(formData.value);
      } else {
        await putQuestionList(formData.value);
      }

      ElMessage({
        message: "提交成功",
        type: "success"
      });
      closeDialog();
    }
  });
};

const setFromData = (editRow: FromDataType) => {
  console.log("editRow", editRow);
  formData.value.id = editRow.id;
  formData.value.category = editRow.category[0].id;
  formData.value.title = editRow.title;
};
const customClose = () => {
  ElMessage({
    message: "取消提交",
    type: "info"
  });
  closeDialog();
};
getCategory();
defineExpose({
  closeDialog,
  openDialog,
  setFromData
});
</script>
<style lang="scss" scoped></style>
