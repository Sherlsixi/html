<!-- <template>
  <h2>A child component!</h2>
</template> -->

<!-- <script setup>
const props = defineProps({
  msg: String,
});
</script>
<template>
  <h2>{{ msg || "no props passed yet" }}</h2>
</template> -->

<!-- <script setup>
const emit = defineEmits(["response"]);
emit("response", "hi from child");
</script>
<template>
  <h2>Child component</h2>
</template> -->

<template>
  <slot>Fallback content</slot>
</template>
