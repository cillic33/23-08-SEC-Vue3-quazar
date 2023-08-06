<template>
  <q-th :props="props" :class="{active: isActive}" class="cell-name">
    <div class="alignment">
      {{ props.col.label }}
    </div>
  </q-th>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ['props'],
})
</script>

<style lang="sass" scoped>
@import '../../../../assets/css/mixins.sass'

th.active
  z-index: 2 !important

.cell-name
  width: 400px

.alignment
  display: flex
  align-items: center
  gap: 8px

.wrapper
  position: relative

.button
  width: 24px
  height: 24px

.popup
  position: absolute
  z-index: 9
  top: 28px
  left: 0
  background: #ffffff
  border-radius: 8px
  border: 1px solid $color-on-surface-quaternary
  padding-right: 6px

.scroll
  width: 272px
  max-height: 256px
  padding: 4px 0
  overflow-y: scroll
  @include scroll

.list
  display: flex
  flex-direction: column
  gap: 4px

  > div
    padding: 4px 8px
    min-height: 24px

</style>
