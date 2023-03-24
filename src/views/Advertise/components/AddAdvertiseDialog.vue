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
      <el-form-item label="链接" prop="link_url">
        <el-input v-model="formData.link_url" />
      </el-form-item>
      <el-form-item label="广告类型" prop="category">
        <el-select v-model="formData.category" placeholder="选择广告类型">
          <el-option label="免费类型" value="001" />
          <el-option label="收费类型" value="002" />
        </el-select>
      </el-form-item>
      <el-form-item label="位置" prop="position">
        <el-select v-model="formData.position" placeholder="选择广告位置">
          <el-option label="首页轮播图" :value="1" />
          <el-option label="左侧广告图" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
        <el-date-picker
          v-model="formData.start_time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="开始时间"
        />
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-date-picker
          v-model="formData.end_time"
          type="date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          placeholder="结束时间"
        />
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
import { PostAddAdvertiseList } from "@/api/poster";

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
  },
  link_url: {
    type: "string",
    required: true,
    // pattern: /^[0-9]+$/,
    trigger: "change",
    message: "年龄只能是数字哦",
    transform(value: string) {
      return value.trim();
    }
  },
  position: {
    type: "number",
    required: true,
    // pattern:
    //   /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
    trigger: "change",
    message: "请选择位置",
    transform(value: string) {
      return value.trim();
    }
  }
};

interface FromDataType {
  title: string;
  link_url: string;
  position: string;
  start_time: string;
  end_time: string;
  category: string;
}

const formDataRef = ref<FormInstance | null>(null);

const formData = ref<FromDataType>({
  title: "",
  link_url: "",
  position: "",
  start_time: "",
  end_time: "",
  category: ""
});

const { visible, closeDialog, openDialog, mode } = useDialogWithForm(
  formDataRef as Ref<FormInstance>
);

const confirm = () => {
  if (!formDataRef.value) return;
  console.log("formData", formData.value);

  formDataRef.value.validate(async valid => {
    if (valid) {
      const res = await PostAddAdvertiseList(formData.value);
      console.log("res", res);
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
  // formData.value = editRow;
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
  openDialog,
  setFromData
});
</script>
<style lang="scss" scoped></style>
