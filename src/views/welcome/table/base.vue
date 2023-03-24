<script setup lang="ts">
// import { tableData } from "./data";
import { defineProps, toRefs } from "vue";
const props = withDefaults(
  defineProps<{
    tableData?: Array<any>;
    columns?: Array<any>;
  }>(),
  {
    tableData: () => [],
    columns: () => []
  }
);
const { tableData, columns } = toRefs(props);
</script>

<template>
  <pure-table :data="tableData" :columns="columns" />
</template>
