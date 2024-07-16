<!-- ８、ライフサイクル -->
<!-- <script setup>
import { ref, onMounted, onBeforeMount } from "vue";
const pElementRef = ref(null);
onBeforeMount(() => {
  console.log(pElementRef.value);
});
onMounted(() => {
  console.log(pElementRef.value);
  pElementRef.value.textContent = "hi";
});
</script>
<template>
  <p ref="pElementRef">hello</p>
</template> -->

<!-- 9、ウォッチャー -->
<!-- <script setup>
import { ref, watch } from "vue";
const todoId = ref(1);
const todoData = ref(null);

async function fetchData() {
  todoData.value = null;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  );
  todoData.value = await res.json();
}
fetchData();
watch(todoId, fetchData);
</script>

<template>
  <p>Todo id:{{ todoId }}</p>
  <button @click="todoId++" :disabled="!todoData">Fetch next todo</button>
  <p v-if="!todoData">Loading...</p>
  <pre v-else>{{ todoData }}</pre>
</template> -->

<!-- 10、コンポーネント -->

<!-- <script setup>
import ChildComp from "./components/ChildComp.vue";
</script>
<template>
  <ChildComp />
</template> -->

<!-- 11、props -->
<!-- <script setup>
import ChildComp from "./components/ChildComp.vue";
import { ref } from "vue";
const greeting = ref("Hello from parent");
</script>
<template>
  <ChildComp :msg="greeting" />
</template> -->

<!-- 12、イベントの発行 -->
<!-- <script setup>
import { ref } from "vue";
import ChildComp from "./components/ChildComp.vue";
const childMsg = ref("no child message yet");
</script>
<template>
  <ChildComp @response="(msg) => (childMsg = msg)" />
  <p>{{ childMsg }}</p>
</template> -->

<!-- 13、スロット -->
<script setup>
import { ref } from "vue";
import ChildComp from "./components/ChildComp.vue";
// const msg = ref("from parent");
</script>

<template>
  <ChildComp>{{ msg }}</ChildComp>
</template>
