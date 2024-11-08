<template>
  <svg
    width="1000"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <line
      x1="1"
      y1="18.2799"
      x2="23"
      y2="18.2799"
      stroke="#FE7A67"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="3.40039"
      y1="13.96"
      x2="20.6004"
      y2="13.96"
      stroke="#FE7A67"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="5.80005"
      y1="9.64001"
      x2="18.2001"
      y2="9.64001"
      stroke="#FE7A67"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="8.19995"
      y1="4.83984"
      x2="15.8"
      y2="4.83984"
      stroke="#FE7A67"
      stroke-width="2"
      stroke-linecap="round"
    />
    <line
      x1="10.5996"
      y1="1"
      x2="13.3996"
      y2="1"
      stroke="#D9D9D9"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  size: { type: String, default: "24px" },
});

const sizeRef = toRef(() => props.size);
</script>

<style scoped>
.icon {
  width: v-bind(sizeRef);
  height: auto;
}
</style>
