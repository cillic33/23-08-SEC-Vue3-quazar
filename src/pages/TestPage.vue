<template>

  <div class="wrapper" id="downloadBtnsBlock">
    <q-btn class="cs__button cs__button_light" flat :ripple="false" :fab-mini="true" padding="0" @click="downloadPopup = !downloadPopup">
      <IconDownload />
      <div class="splitter"></div>
      <IconKBArrowDown />
    </q-btn>

    <q-list v-if="downloadPopup" class="popup">
      <q-item clickable v-close-popup @click="onItemClick">
        Excel
      </q-item>
      <q-item clickable v-close-popup @click="onItemClick">
        PDF
      </q-item>
    </q-list>
  </div>

</template>

<script>
import { ref } from 'vue';
import IconDownload from "@/components/svg/IconDownload.vue";
import IconKBArrowDown from "@/components/svg/IconKBArrowDown.vue";

export default {
  setup () {
    const downloadPopup = ref(false);

    return {
      downloadPopup,
      onItemClick () {
        alert('Clicked on an Item')
      },
    }
  },
  components: {
    IconDownload,
    IconKBArrowDown,
  },
  methods: {
    onClick(event) {
      if (event.target.closest('#downloadBtnsBlock') !== null) {
        return;
      }
      this.downloadPopup = false;
    },
  },
  mounted() {
    document.addEventListener('click', this.onClick);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onClick);
  },
}
</script>

<style lang="sass" scoped>
@import "@/assets/css/variables.sass"

.wrapper
  position: relative
  display: inline-block

  .splitter
    background: $color-surface-background
    height: 40px
    width: 1px

  svg
    margin: 0 8px

.popup
  position: absolute
  top: 44px
  right: 0
  width: 200px
  background: #ffffff
  border-radius: 8px

  > div
    display: flex
    align-items: center

    &:first-child
      border-radius: 8px 8px 0 0

    &:last-child
      border-radius: 0 0 8px 8px
</style>
