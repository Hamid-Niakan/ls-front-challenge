<template>
  <svg
    width="1000"
    viewBox="0 0 12 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
  >
    <path
      d="M0.734354 10.3535L5.48435 5.32266C5.6281 5.13984 5.8156 5.0625 5.99998 5.0625C6.18435 5.0625 6.37123 5.13942 6.5156 5.2932L11.2656 10.3241C11.5664 10.6449 11.579 11.1787 11.2949 11.5169C11.0097 11.8575 10.533 11.8695 10.2343 11.5499L5.9999 7.0358L1.76553 11.5499C1.46671 11.8696 0.992089 11.8575 0.704901 11.5169C0.420917 11.2113 0.433417 10.677 0.734354 10.3535Z"
      fill="#7C8187"
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
