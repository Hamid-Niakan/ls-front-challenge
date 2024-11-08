<template>
  <Row columns="1 lg-2">
    <Col col="12 lg-3">
      <div class="filter-box flex flex-col">
        <div
          class="filter-box__header flex justify-center items-center"
          style="font-weight: bold"
        >
          <ClientOnly fallback="در حال به روز رسانی...">
            {{ paginatorState.totalCount }} تور ایرانگردی یافت شد
          </ClientOnly>
        </div>
        <BaseAccordion title="مرتب‌سازی بر اساس">
          <div class="flex justify-center items-center">
            <b-button
              id="cheap-btn"
              rounded="pill"
              margin="x-2"
              :color="`outline-${
                filterState.price === priceTypes.cheap ? 'primary' : 'secondary'
              }`"
              @click="onFilterPrice(priceTypes.cheap)"
            >
              ارزان‌ترین تورها
            </b-button>
            <b-button
              id="expensive-btn"
              rounded="pill"
              margin="x-2"
              :color="`outline-${
                filterState.price === priceTypes.expensive
                  ? 'primary'
                  : 'secondary'
              }`"
              @click="onFilterPrice(priceTypes.expensive)"
            >
              گران‌ترین تورها
            </b-button>
          </div>
        </BaseAccordion>
        <BaseAccordion title="جستجوی نام تور" background="#f8f9fa">
          <b-div padding="x-2">
            <b-form-input
              :model-value="filterState.tour"
              type="text"
              placeholder="جستجوی عنوان"
              @input="onFilterTour"
            />
          </b-div>
        </BaseAccordion>
        <BaseAccordion title="درجه سختی">
          <b-div padding="x-2">
            <b-form-check reverse>
              <b-form-check-input
                :model-value="filterState.easy"
                :checked="filterState.easy"
                id="easy"
                @click="onFilterLevel('easy', !filterState.easy)"
              />
              <b-form-check-label for="easy"> آسان </b-form-check-label>
            </b-form-check>
            <b-form-check reverse>
              <b-form-check-input
                :model-value="filterState.moderate"
                :checked="filterState.moderate"
                id="moderate"
                @input="onFilterLevel('moderate', !filterState.moderate)"
              />
              <b-form-check-label for="moderate"> متوسط </b-form-check-label>
            </b-form-check>
            <b-form-check reverse>
              <b-form-check-input
                :model-value="filterState.hard"
                :checked="filterState.hard"
                id="hard"
                @input="onFilterLevel('hard', !filterState.hard)"
              />
              <b-form-check-label for="hard"> سخت </b-form-check-label>
            </b-form-check>
            <b-form-check reverse>
              <b-form-check-input
                :model-value="filterState.veryHard"
                :checked="filterState.veryHard"
                id="veryHard"
                @input="onFilterLevel('veryHard', !filterState.veryHard)"
              />
              <b-form-check-label for="veryHard"> خیلی سخت </b-form-check-label>
            </b-form-check>
          </b-div>
        </BaseAccordion>
      </div>
    </Col>
    <Col col="12 lg-9" flex-order="lg-first">
      <ClientOnly fallback-tag="span" fallback="در حال بارگزاری...">
        <TourCard
          v-for="tour in tourDisplayResult"
          :key="tour.id"
          :tour="tour"
        />
        <BasePaginator
          v-if="paginatorState.pages > 1"
          :paginator-object="paginatorState"
          style="margin-bottom: 16px"
          @change:page="updatePaginator"
        />
      </ClientOnly>
    </Col>
  </Row>
</template>

<script setup>
defineOptions({ name: "HomePage" });
definePageMeta({ name: "Home", title: "لیست تورها" });

const route = useRoute();
const router = useRouter();

const listState = reactive({
  tours: [],
  filtered: [],
});
async function getTours() {
  const { data: tours, status } = await useApi(serviceTours.tours);
  if (status.value === "success") {
    listState.tours = tours.value;
    filterAndSort();
  }
}

// pagination controls
const paginatorState = reactive({
  totalCount: 0,
  pages: 0,
  previous: false,
  next: false,
  page: 1,
});
const tourDisplayResult = computed(() => {
  const from = 6 * (paginatorState.page - 1);
  const to =
    from + 6 > paginatorState.totalCount ? paginatorState.totalCount : from + 6;
  return listState.filtered.slice(from, to);
});
function fillPaginator(listLength) {
  paginatorState.totalCount = listLength;
  paginatorState.pages = Math.ceil(listLength / 6);
  paginatorState.page = 1;
  if (paginatorState.pages > 1) paginatorState.next = true;
  paginatorState.previous = false;
}
function updatePaginator(page) {
  paginatorState.page = page;
  paginatorState.previous = page > 1;
  paginatorState.next = page < paginatorState.pages;
}

// filter and sort controls
const priceTypes = {
  expensive: "expensive",
  cheap: "cheap",
};
const filterState = reactive({
  price: "",
  tour: "",
  easy: false,
  moderate: false,
  hard: false,
  veryHard: false,
});
function updateQuery(key, value) {
  const query = { ...route.query };
  if (!value && query[key]) delete query[key];
  else if (value) query[key] = value;
  router.push({
    path: router.currentRoute.value.fullPath,
    query,
  });
}
function filterAndSort() {
  let list = [];
  const hardnessIdMap = {
    easy: 1,
    moderate: 2,
    hard: 3,
    veryHard: 4,
  };
  for (const key of Object.keys(hardnessIdMap)) {
    if (filterState[key]) {
      const tempList = [...listState.tours];
      list = [
        ...list,
        ...tempList.filter((el) => el.hardness.id === hardnessIdMap[key]),
      ];
    }
  }
  if (!list.length) list = [...listState.tours];
  if (filterState.tour)
    list = list.filter((el) => el.title.includes(filterState.tour));
  if (filterState.price === priceTypes.cheap)
    list.sort((a, b) => a.defaultSchedule.price - b.defaultSchedule.price);
  else if (filterState.price === priceTypes.expensive)
    list.sort((a, b) => b.defaultSchedule.price - a.defaultSchedule.price);
  listState.filtered = list;
  fillPaginator(list.length);
}
function onFilterPrice(selection) {
  filterState.price = filterState.price === selection ? "" : selection;
  updateQuery("price", filterState.price);
  filterAndSort();
}
const { lazyCaller } = useLazyCaller();
function onFilterTour(event) {
  lazyCaller(() => {
    const { value } = event.target;
    filterState.tour = value;
    updateQuery("tour", filterState.tour);
    filterAndSort();
  });
}
function onFilterLevel(level, value) {
  filterState[level] = value;
  updateQuery(level, value);
  filterAndSort();
}
function initFilter() {
  for (const key of Object.keys(filterState)) {
    if (route.query[key]) {
      if (["price", "tour"].includes(key)) filterState[key] = route.query[key];
      else filterState[key] = true;
    }
  }
}
initFilter();

getTours();
</script>

<style scoped>
.filter-box {
  width: 358px;
  position: relative;
  top: -60px;
}

@media (max-width: 992px) {
  .filter-box {
    width: 358px;
    position: relative;
    top: 0px;
    margin-top: 10px;
  }
}
.filter-box__header {
  height: 51px;
  background: #0197f6;
  color: white;
  border-radius: 4px 4px 0 0;
}
</style>
