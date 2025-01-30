<template>
  <q-th :props="props" :class="{active: isActive}" class="cell-tp">
    <div class="alignment">
      {{ props.col.label }}
      <div class="wrapper preventClick">
        <q-btn
            flat
            :ripple="false"
            :fab-mini="true"
            padding="0"
            class="cs__button cs__button_gray cs__button_r4 button preventClick"
            @click="isActive = !isActive"
        >
          <IconFilterBlue v-if="isActive" class="preventClick" />
          <IconFilter v-else class="preventClick" />
        </q-btn>

        <div class="popup" v-if="isActive">

          <q-input v-model="query" outlined class="cs__input" placeholder="Найти практику">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon v-if="query !== ''" name="close" @click="query = ''" class="cursor-pointer" />
            </template>
          </q-input>

          <div class="scroll">
            <q-list class="list">
              <q-item clickable>
                <q-item-section>
                  <q-checkbox v-model="isSelectAll" label="Выделить все" @click.prevent="changeAll" />
                </q-item-section>
              </q-item>

              <q-item clickable v-for="item in tpValues" :key="item">
                <q-item-section>
                  <q-checkbox v-model="selection" :val="item" :label="item" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-th>

</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import SurveyRows from "@/data/surveyRows.js";
import IconFilter from "@/components/svg/IconFilter.vue";
import IconFilterBlue from "@/components/svg/IconFilterBlue.vue";

let tpVal = [];
SurveyRows.forEach(function(item) {
  tpVal = tpVal.concat(item.tp);
});
tpVal = Array.from(new Set(tpVal)).sort();

export default {
  props: ['props', 'searchTp'],
  emits: ['searchTp'],
  setup(props, { emit }) {
    const tpValues = ref(tpVal);
    const isSelectAll = ref(false);
    const selection = ref([]);
    const isActive = ref(false);
    const query = ref('');

    /* Клик по документу - закрытие окна с фильтром */
    const onDocumentClick = (event) => {
      if (event.target.closest('.preventClick') !== null) {
        return;
      }
      isActive.value = false;
    }

    /* Клик по чекбоксу "Выделить все" */
    const changeAll = () => {
      if (isSelectAll.value) {
        selection.value = tpValues.value;
      } else {
        selection.value = [];
      }
    }

    onMounted(() => {
      document.addEventListener('click', onDocumentClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', onDocumentClick);
    });

    /* При изменении в  массиве чекбоксов - менять чекбокс all */
    watch(selection, (value) => {
      emit('update:searchTp', value);
      if (selection.value.length === tpValues.value.length) {
        isSelectAll.value = true;
      } else {
        isSelectAll.value = false;
      }
    });

    return {
      tpValues,
      isSelectAll,
      selection,
      isActive,
      query,

      onDocumentClick,
      changeAll,
    }
  },
  components: {
    IconFilter,
    IconFilterBlue,
  },
}
</script>

<style lang="sass" scoped>
@import '../../../../assets/css/mixins.sass'

th.active
  z-index: 2 !important

.cell-tp
  width: 220px

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
