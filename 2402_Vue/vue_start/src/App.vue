<!--１、 宣言的レンダリング -->
<!-- <script setup>
import { ref, reactive } from "vue";
const counter = reactive({ count: 0 });
const message = ref("Hello World");
function increment() {
  counter.count++;
}
</script>
<template>
  <h1>{{ message.split("").reverse().join("") }}</h1>
  <p>count is :{{ counter.count }}</p>
  <button @click="increment">{{ counter.count }}</button>
</template> -->
<!-- <script>
import { ref } from "vue";
const message = ref("Hello World");
console.log(message.value);
</script> -->

<!--２、 属性バインディング -->
<!-- <script setup>
import { ref } from "vue";
const titleClass = ref("title");
const id = ref("titleId");
const rawHtml = ref("<span style='color:red'>this should be red</spna>");
const seen = ref(true);
</script>
<template>
  <h1 v-bind:class="titleClass">make me red</h1>
  <h1 :id>make me blue</h1>
  <p>Using text interpolation:{{ rawHtml }}</p>
  <p>Using v-html directive:<span v-html="rawHtml"></span></p>
  <p v-if="seen">now you can see me</p>
</template>
<style>
.title {
  color: red;
}
#titleId {
  color: blue;
}
</style> -->

<!-- ３、イベントリスナー -->
<!-- <script setup>
import { ref } from "vue";
const count = ref(0);
function increment() {
  count.value++;
}
const name = ref("Vue.js");
function greet(event) {
  alert(`Hello,${name.value}`);
  if (event) {
    alert(event.target.tagName);
  }
}
</script>

<template>
  <p>count is:{{ count }}</p>
  <button v-on:click="increment">+</button>
  <button v-on:click="count--">-</button>
  <button @click="greet">Greet</button>
</template> -->

<!-- ４、フォームバインバインディング -->

<!-- <script setup>
import { ref } from "vue";
const text = ref("");
// function onInput(e) {
//   text.value = e.target.value;
// }

const message = ref("");

const checked = ref(false);

const checkNames = ref([]);
</script> -->
<!-- <template>
  <input :value="text" @input="onInput" placeholder="Type here" />
  <input v-model="text" placeholder="type here" />
  <p>{{ text }}</p>

  <span>Multiline message is:</span>
  <p style="white-space: pre-line">{{ message }}</p>
  <textarea v-model="message" placeholder="add multiple lines"></textarea>

  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="checkbox">{{ checked }}</label>

  <div>Checked names:{{ checkNames }}</div>
  <input type="checkbox" id="jack" value="Jack" v-model="checkNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="rose" value="Rose" v-model="checkNames" />
  <label for="rose">Rose</label>
  <input type="checkbox" id="tom" value="Tom" v-model="checkNames" />
  <label for="tom">Tom</label>
</template> -->

<!-- 5、条件付けレンダリング -->
<!-- <script setup>
import { ref } from "vue";
let awesome = ref(true);
function toggle() {
  awesome.value = !awesome.value;
}
</script>
<template>
  <button @click="toggle">toggle</button>
  <h1 v-if="awesome">Vue is awesome</h1>
  <h1 v-else>Oh no!</h1>
</template> -->

<!-- 6、リストレンダリング -->
<!-- 7、算出プロパティー -->
<script setup>
import { ref, computed } from "vue";
let id = 0;
const newTodo = ref("");
const hideCompleted = ref(false);

const todos = ref([
  { id: id++, text: "learn HTML", done: true },
  { id: id++, text: "learn JavaScript", done: true },
  { id: id++, text: "learn Vue", done: false },
]);
function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value });
  newTodo.value = "";
}
function removeTodo(id) {
  todos.value = todos.value.filter((todo) => todo.id !== id);
}
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
});
</script>
<template>
  <form @submit.prevent="addTodo">
    <input v-model="newTodo" />
    <button>Add Todo</button>
  </form>
  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input type="checkbox" v-model="todo.done" />
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
      <button @click="removeTodo(todo.id)">X</button>
    </li>
  </ul>
  <button @click="hideCompleted = !hideCompleted">
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button>
</template>

<style>
.done {
  text-decoration: line-through;
}
</style>
