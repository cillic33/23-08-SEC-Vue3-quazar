<template>
  <q-th :props="props" class="cell-sm">
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
.cell-sm
  width: 120px
</style>
