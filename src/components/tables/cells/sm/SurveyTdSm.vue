<template>
  <q-td :props="props">
    {{ props.value }}
  </q-td>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: ['props'],
})
</script>
