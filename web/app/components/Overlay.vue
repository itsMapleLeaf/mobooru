<template>
  <section class="overlay-shade" @click.self="$emit('close')">
    <div class="overlay-panel">
      <slot></slot>
    </div>
  </section>
</template>

<style lang='scss' scoped>
@import "../styles/mixins";

.overlay-shade {
  @include fullscreen;
  @include flex(row, center, flex-start);
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  padding: 2em 1em;
  overflow-y: auto;
}

.overlay-panel {
  width: max-content;
  height: max-content;
  max-width: 100%;
  background-color: white;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
}
</style>
