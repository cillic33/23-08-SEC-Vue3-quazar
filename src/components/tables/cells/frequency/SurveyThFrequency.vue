<template>
  <q-th :props="props" class="cell-name">
    {{ props.col.label }}
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

.cell-name
  width: 500px

.alignment
  display: flex
  align-items: center
  gap: 8px
</style>
