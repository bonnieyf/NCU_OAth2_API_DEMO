<template>
  <div>
    <p v-if="error">Error: {{ error }}</p>
    <p v-else-if="userInfo">歡迎, {{ userInfo.name }}!</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const error = ref(null);

onMounted(() => {
  const queryParams = new URLSearchParams(window.location.search);
  const code = queryParams.get("code");
  if (!code) {
    error.value = "No code found on callback.";
  } else {
    store
      .dispatch("fetchUserInfo", code)
      .then(() => {
        router.push("/page");
      })
      .catch((err) => {
        console.error(err);
        error.value = err.message || "Failed to fetch user info";
      });
  }
});

const userInfo = computed(() => store.state.userInfo);
</script>
