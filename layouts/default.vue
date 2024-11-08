<template>
  <div>
    <div class="header flex items-center layout-padding">تورهای ایرانگردی</div>
    <div class="layout-padding">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #444b54;
  color: white;
  height: 97px;
}
.layout-padding {
  padding: 0 5%;
}
</style>
