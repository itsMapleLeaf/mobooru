<template>
  <header class="header">
    <h2 class="header-title header-item">
      <a href="/">mobooru</a>
    </h2>
    <input class="mb-input header-item header-item--stretch" placeholder="Search...">
    <button class="mb-button header-item">
      <i class="mdi mdi-magnify"></i>
    </button>
    <button class="mb-button header-item">
      <i class="mdi mdi-upload"></i>
    </button>
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
