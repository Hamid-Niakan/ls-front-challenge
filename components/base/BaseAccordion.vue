<template>
  <div
    class="accordion-box flex flex-col"
    :class="{ 'scale-0': !isOpenRef, 'scale-1': isOpenRef }"
  >
    <div
      class="accordion-box__title flex justify-between cursor-pointer"
      @click="isOpenRef = !isOpenRef"
    >
      <span>{{ title }}</span>
      <IconArrow
        size="16px"
        class="transition"
        :class="{ rotate: !isOpenRef }"
      />
    </div>
    <div class="accordion-box__body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "BaseAccordion" });

const props = defineProps({
  title: { type: String, default: "" },
  background: { type: String, default: "white" },
});

const isOpenRef = ref(true);

const backgroundRef = toRef(() => props.background);
</script>

<style scoped>
.accordion-box {
  background: v-bind(backgroundRef);
  padding: 16px;
  display: grid;
  transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
  transition-duration: 200ms;
  transition-property: grid-template-rows;
}

.accordion-box__title {
  margin-bottom: 28px;
}

.rotate {
  transform: rotate(180deg);
}

.accordion-box__body {
  overflow: hidden;
}

.scale-0 {
  grid-template-rows: 0fr 0fr;
}

.scale-1 {
  grid-template-rows: 0fr 1fr;
}
</style>
