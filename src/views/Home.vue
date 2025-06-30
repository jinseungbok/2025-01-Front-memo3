<script setup>
import { reactive, onMounted } from "vue";
import httpService from "@/services/HttpService";
import MemoCard from "@/components/MemoCard.vue";

const state = reactive({
  memos: [],
});

onMounted(() => {
  getItems();
});

const getItems = async (param) => {
  const data = await httpService.getMemoList(param);
  state.memos = data.resultData;
  console.log("state.memos :", state.memos);
};

const removeItem = async (id) => {
  const deleteIdx = state.memos.findIndex((item, idx) => item.id === id);
  console.log("removeItem: ", id, deleteIdx);

  if (confirm("삭제하시겠습니까?")) {
    console.log("삭제되었습니다.");
    const params = { memo_id: id };
    const data = await httpService.deleteMemo(params);
    if (data.resultData === 1) {
      // getItems({});
      const deleteIdx = state.memos.findIndex((item, idx) => item.id === id);
      if (deleteIdx >= 0) {
        state.memos.splice(deleteIdx, 1);
      }
    }
  }
};
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light"> + 추가하기 </router-link>
    <MemoCard
      @delete-item="removeItem"
      v-for="m in state.memos"
      :item="m"
      :key="m.id"
    />
    <!-- v-for 사용시 :key="" 값 반드시 들어가야 함 -->
  </div>
</template>

<style lang="scss" scoped>
/*
.memo-list {
  .item {
    background-color: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    &:hover {
      border-color: #aaa;
    }
  }
}
*/

.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>
