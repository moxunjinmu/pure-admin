<template>
  <Dialog
    :before-close="customClose"
    @confirm="confirm"
    v-model="visible"
    :title="mode == MODE.ADD ? '添加问题分类' : '编辑问题分类'"
    :confirm-text="mode == MODE.ADD ? '添加' : '修改'"
  >
    <!-- ts-ignore -->
    <el-form
      label-width="100px"
      :model="formData"
      ref="formDataRef"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="问题分类" prop="title">
        <el-input placeholder="问题分类" v-model="formData.title" />
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
import { PostAddCategory } from "@/api/question";

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
}
const emits = defineEmits(["close", "success"]);
const formDataRef = ref<FormInstance | null>(null);

const formData = ref<FromDataType>({
  title: ""
});

const { visible, closeDialog, openDialog, mode } = useDialogWithForm(
  formDataRef as Ref<FormInstance>
);

const confirm = () => {
  if (!formDataRef.value) return;
  console.log("formData", formData.value);

  formDataRef.value.validate(async valid => {
    if (valid) {
      const res = await PostAddCategory(formData.value);
      console.log("res", res);
      ElMessage({
        message: "提交成功",
        type: "success"
      });
      closeDialog();
      emits("close");
    }
  });
};

const customClose = () => {
  ElMessage({
    message: "取消提交",
    type: "info"
  });
  closeDialog();
  emits("close");
};
defineExpose({
  closeDialog,
  openDialog
});
</script>
<style lang="scss" scoped></style>
