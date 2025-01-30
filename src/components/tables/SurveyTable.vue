<template>
  <div>
    <q-table
        ref="table"
        :columns="columns"
        :rows="currentRows"
        row-key="name"
        :visible-columns="visibleColumns"
        :filter="filter"
        :filter-method="customFilter"
        separator="none"
        class="sticky-table"
        title="Treats"
        :pagination="pagination"
        rows-per-page-label="Показывать по"
        :rows-per-page-options="[5, 10, 25]"
    >
      <!-- Заголовок колонки "ТП" -->
      <template v-slot:header-cell-tp="props" v-model:search-tp="searchTp">
        <SurveyThTp :props="props" v-model:search-tp="searchTp" />
      </template>
      <!-- Ячейки колонки "ТП" -->
      <template v-slot:body-cell-tp="props">
        <SurveyTdTp :props="props" />
      </template>

      <template v-slot:top="scope">
        <!-- Поиск-->
        <q-input v-model="filter.search" outlined class="cs__input cs__input__search" placeholder="Найти опрос">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon v-if="filter.search !== ''" name="close" @click="filter.search = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <q-space />

        <!-- Кнопка для настройки колонок-->
        <q-btn class="cs__button cs__button_light icon-column-blue" flat :ripple="false" :fab-mini="true" padding="8px" @click="columnDialog = true">
          <IconColumnBlue />
        </q-btn>

        <!-- Кнопка скачивания -->
        <DownloadButton />
      </template>

      <!-- Пагинация -->
      <template v-slot:pagination="scope">
        <BasePagination :scope="scope" input-class="test" />
      </template>
    </q-table>

    <!-- Диалог настройки колонок -->
    <ColumnsDialog v-model="columnDialog" v-model:visible-columns="visibleColumns" />
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import IconColumnBlue from "@/components/svg/IconColumnBlue.vue";
import IconFilterCell from "@/components/svg/IconFilterCell.vue";
import ColumnsDialog from "@/components/dialogs/ColumnsDialog.vue";
import columns from "@/data/surveyColumns.js";
import rows from "@/data/surveyRows.js";
import SurveyThTp from "@/components/tables/cells/tp/SurveyThTp.vue";
import SurveyTdTp from "@/components/tables/cells/tp/SurveyTdTp.vue";
import DownloadButton from "@/components/dropdowns/DownloadButton.vue";
import BasePagination from "@/components/base/BasePagination.vue";

export default defineComponent({
  components: {
    IconColumnBlue,
    IconFilterCell,
    ColumnsDialog,
    SurveyThTp,
    SurveyTdTp,
    DownloadButton,
    BasePagination,
  },
  setup() {
    const currentRows = [...rows];
    const columnDialog = ref(false);
    const visibleColumns = ref([ 'name', 'tp', 'frequency', 'pd', 'sm', 'informed', 'year', 'status' ]);
    const pagination = {
          sortBy: 'name',
          descending: false,
          page: 1,
          rowsPerPage: 2,
          // rowsNumber: xx if getting data from a server
        };
    const filter = ref({
      search: '',
    });
    const searchTp = ref([]);

    return {
      columns,
      currentRows,
      columnDialog,
      visibleColumns,
      pagination,
      filter,
      searchTp,
    }
  },
  watch: {
    searchTp(value) {
      this.filter['searchTp'] = value;
    },
  },
  methods: {
    customFilter(rows) {
      let filteredRows = rows;
      if (this.filter.search && this.filter.search.length) {
        filteredRows = filteredRows.filter(
            row => row.name.includes(this.filter.search)
        );
      }
      if (this.filter['searchTp'] && this.filter['searchTp'].length) {
        let filteredSumRows = [];
        this.filter['searchTp'].forEach((query) => {
          filteredSumRows = filteredSumRows.concat(filteredRows.filter(
              row => row.tp.includes(query)
          ));
        });
        filteredRows = Array.from(new Set(filteredSumRows));
      }
      return filteredRows;
    },
  },
})
</script>
