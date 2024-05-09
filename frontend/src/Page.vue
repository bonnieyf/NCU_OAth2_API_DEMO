<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <p v-if="isNCUIM">
      歡迎 {{ userInfo.chineseName }} 蒞臨資管系，今天日期是{{ currentDate }}。
    </p>
    <p v-else>
      歡迎 {{ userInfo.chineseName }} 參觀資管系，現在時間是{{ currentTime }}。
    </p>
    <p v-if="error">Error: {{ error }}</p>

    <div class="mt-5">
      <img
        class="mx-auto h-100 w-auto"
        src="./assets/Banner.jpg"
        alt="Your Company"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const userInfo = computed(() => store.state.userInfo);
const error = computed(() => store.state.error);

const isNCUIM = computed(() => {
  return (
    userInfo.value &&
    userInfo.value.academyRecords &&
    userInfo.value.academyRecords.name.includes("資訊管理學系")
  );
});

const currentDate = computed(() => {
  const now = new Date();
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
});

const currentTime = computed(() => {
  const now = new Date();
  return `${now.getHours()}點${now.getMinutes()}分`;
});
</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}
</style>
