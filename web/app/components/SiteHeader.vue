<template>
  <header class="header">
    <slot></slot>
  </header>
</template>

<style lang='scss' scoped>
@import '../styles/mixins';

.header {
  @include flex(row);

  padding: 0.3em;
  background-color: white;
  box-shadow: 0 0.1em 0.2em #aaa;

  position: -webkit-sticky;
  position: sticky;
  top: 0;

  height: max-content;
}

.header-item {
  margin-left: 0.2em;
  margin-right: 0.2em;
}

.header-item--stretch {
  width: 0;
  flex-grow: 1;
}

.header-title {
  @media (max-width: 480px) {
    display: none;
  }
}
</style>

<script></script>
