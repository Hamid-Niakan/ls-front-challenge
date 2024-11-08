<template>
  <div class="flex justify-center items-center">
    <div
      class="btn"
      :class="{ 'cursor-not-allow': !paginatorObject.previous }"
      @click="iconSelect(paginatorObject.previous, -1)"
    >
      <IconArrow class="rotate-90" size="10px" />
    </div>
    <div v-if="pageNumberRef > 3" class="flex">
      <span class="btn" @click="pageNumberRef = 1">1</span>
      <span v-if="pageNumberRef > 4" class="cursor-default">...</span>
    </div>
    <div
      v-for="num in paginatorObject.pages"
      :key="num"
      class="flex justify-center"
      :class="{ hidden: Math.abs(num - pageNumberRef) >= 3 }"
    >
      <div
        v-if="Math.abs(num - pageNumberRef) < 3"
        class="btn"
        :class="+pageNumberRef === num ? 'btn--active' : ''"
        @click="pageNumberRef = num"
      >
        {{ num }}
      </div>
    </div>
    <span
      v-if="Math.abs(paginatorObject.pages - pageNumberRef) > 3"
      class="cursor-default"
    >
      ...
    </span>
    <div
      v-if="Math.abs(paginatorObject.pages - pageNumberRef) > 2"
      class="btn"
      @click="pageNumberRef = paginatorObject.pages"
    >
      {{ paginatorObject.pages }}
    </div>
    <div class="btn" :class="{ 'cursor-not-allow': !paginatorObject.next }" @click="iconSelect(paginatorObject.next, 1)">
      <IconArrow class="-rotate-90" size="10px" />
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "BasePaginator" });

const props = defineProps({
  paginatorObject: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["change:page"]);
const router = useRouter();
const route = useRoute();
const pageNumberRef = toRef(props.paginatorObject.page);
watch(
  () => pageNumberRef.value,
  () => {
    router.push({
      path: router.currentRoute.value.fullPath,
      query: {
        ...route.query,
        page: pageNumberRef.value,
      },
    });
    emit("change:page", pageNumberRef.value);
  }
);
watch(
  () => route.query.page,
  (newPage) => {
    pageNumberRef.value = newPage || 1;
  }
);

const iconSelect = (paginator, value) => {
  if (paginator) {
    pageNumberRef.value = +pageNumberRef.value + value;
  }
};
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
.-rotate-90 {
  transform: rotate(-90deg);
}
.cursor-default {
  cursor: default;
}
.cursor-not-allow {
  cursor: not-allowed !important;
}
.hidden {
  display: none;
}
.btn {
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  margin: 0 8px;
  cursor: pointer;
}
.btn:hover,
.btn--active {
  border: 1px solid #0d6efd;
}
</style>
