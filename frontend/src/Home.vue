<template>
  <div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <button
          @click="login"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in with NCU
        </button>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        * 此工具僅限於 EC 資安管理課程使用 <br />
        * API 界接方式使用 NCU Portal Oauth 2.0 API
        (https://portal.ncu.edu.tw/about/howto)
      </p>
    </div>
  </div>
</template>

<script setup>
function login() {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI;
  const scope = "academy-records chinese-name";
  const authUrl = `https://portal.ncu.edu.tw/oauth2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scope)}`;

  window.location.href = authUrl;
}
</script>
