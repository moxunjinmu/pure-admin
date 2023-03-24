// import { tableData } from "@/components/ReTable/high/data";
import { delay } from "@pureadmin/utils";
import { ref, onMounted, reactive, watchEffect } from "vue";
import type { PaginationProps, LoadingConfig, Align } from "@pureadmin/table";
import { getPosterList } from "@/api/poster";

export function useColumns() {
  const dataList = ref([]);
  const loading = ref(true);
  const hideVal = ref("nohide");
  const tableSize = ref("default");
  const paginationSmall = ref(false);
  const paginationAlign = ref("right");
  const columns: TableColumnList = [
    {
      label: "位置",
      prop: "position",
      slot: "position"
    },
    {
      label: "类型",
      prop: "poster_category",
      hide: () => (hideVal.value === "hideName" ? true : false)
    },
    {
      label: "地址",
      prop: "link_url",
      hide: () => (hideVal.value === "hideLinkUrl" ? true : false)
    },
    {
      label: "上传时间",
      prop: "start_time",
      hide: () => (hideVal.value === "hideStartTime" ? true : false)
    },
    {
      label: "状态",
      prop: "state",
      slot: "state"
    },
    {
      label: "更新时间",
      prop: "end_time",
      hide: () => (hideVal.value === "hideEndTime" ? true : false)
    },
    {
      label: "操作",
      width: "380",
      slot: "operation"
    }
  ];
  const information = ref({});

  /** 分页配置 */
  const pagination = reactive<PaginationProps>({
    pageSize: 10,
    currentPage: 1,
    pageSizes: [10, 15, 20],
    total: 0,
    align: "right",
    background: true,
    small: false
  });

  /** 加载动画配置 */
  const loadingConfig = reactive<LoadingConfig>({
    text: "正在加载第一页...",
    viewBox: "-10, -10, 50, 50",
    spinner: `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `
    // svg: "",
    // background: rgba()
  });

  function onChange(val) {
    pagination.small = val;
  }

  function onSizeChange(val) {
    console.log("onSizeChange", val);
  }

  function onCurrentChange(val) {
    loadingConfig.text = `正在加载第${val}页...`;
    loading.value = true;
    delay(600).then(() => {
      loading.value = false;
    });
  }

  watchEffect(() => {
    pagination.align = paginationAlign.value as Align;
  });

  async function search(e = {}) {
    console.log("e:search>>", e);
    const params = { ...e };
    loading.value = true;
    const res = await getPosterList(e);
    console.log("posterList", res.data);
    dataList.value = res.data.results;
    pagination.total = res.data.count;
    pagination.currentPage = 1;
    loading.value = false;
  }

  onMounted(() => {
    search();
  });

  return {
    loading,
    columns,
    dataList,
    hideVal,
    tableSize,
    pagination,
    loadingConfig,
    paginationAlign,
    paginationSmall,
    information,
    onChange,
    onSizeChange,
    onCurrentChange,
    search
  };
}

export function useFrom() {
  const searchForm = reactive({
    status: ""
  });

  return {
    searchForm
  };
}
