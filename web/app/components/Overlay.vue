<template>
  <section class="overlay-shade" :class="{ 'overlay-shade--visible': visible }" @click.self="$emit('closed')">
    <div class="overlay-panel">
      <slot></slot>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    visible: Boolean,
  }
}
</script>

<style lang='scss' scoped>
@import "../styles/mixins";

.overlay-shade {
  @include fullscreen;
  @include flex(column, flex-start);

  background-color: rgba(0, 0, 0, 0.5);

  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
  padding: 1em;

  overflow-y: auto;
}

.overlay-panel {
  width: max-content;
  height: max-content;
  max-width: 100%;
  // max-height: calc(100vh - 2em);
  background-color: white;
  box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.3);
  padding: 0.6em 0.6em;

  transition: 0.3s transform ease-in;
  transform: translateY(-2em);
}

.overlay-shade--visible {
  opacity: 1;
  visibility: visible;

  .overlay-panel {
    transition-timing-function: ease-out;
    transform: translateY(0);
  }
}
</style>
