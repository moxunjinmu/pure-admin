<template>
  <Dialog
    :before-close="customClose"
    @confirm="confirm"
    v-model="visible"
    :title="mode == MODE.ADD ? '添加广告' : '编辑广告'"
    :confirm-text="mode == MODE.ADD ? '添加' : '修改'"
  >
    <el-form
      label-width="100px"
      :model="formData"
      ref="formDataRef"
      style="max-width: 460px"
      :rules="rules"
    >
      <el-form-item label="广告名称" prop="title">
        <el-input placeholder="广告名称" v-model="formData.title" />
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
import { PostPositionList, getPositionList } from "@/api/poster";

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
      const res = await PostPositionList(formData.value);
      console.log("res", res);
      ElMessage({
        message: "提交成功",
        type: "success"
      });
      const getRes = await getPositionList();
      console.log("getRes", getRes);

      closeDialog();
    }
  });
};

const customClose = () => {
  ElMessage({
    message: "取消提交",
    type: "info"
  });
  closeDialog();
};
defineExpose({
  closeDialog,
  openDialog
});
</script>
<style lang="scss" scoped></style>
