<template>
  <transition name="overlay" appear>
    <section class="overlay-shade" @click.self="$emit('close')">
      <div class="overlay-panel">
        <slot></slot>
      </div>
    </section>
  </transition>
</template>

<style lang="scss" scoped>
@import "../styles/mixins";

.overlay-shade {
  @include fullscreen;
  @include flex(row, center, center);
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

@keyframes fade {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes slide {
  from { transform: translateY(-2em) }
  to { transform: translateY(0) }
}

.overlay-enter-active {
  &.overlay-shade { animation: 0.3s fade }
  .overlay-panel { animation: 0.3s slide }
}
.overlay-leave-active {
  &.overlay-shade { animation: 0.3s fade reverse }
  .overlay-panel { animation: 0.3s slide reverse }
}
</style>
