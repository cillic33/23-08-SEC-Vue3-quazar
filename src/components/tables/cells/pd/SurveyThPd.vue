<template>
  <q-th :props="props" class="cell-frequency">
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
.cell-frequency
  width: 180px
</style>
