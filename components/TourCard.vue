<template>
  <b-div background-color="white" margin="y-4" class="h-199">
    <Row columns="1 md-2">
      <Col col="12 md-9">
        <b-div padding="4" class="flex flex-wrap" style="position: relative">
          <b-img
            :src="tour.image"
            object-fit="cover"
            rounded
            width="213"
            height="151"
          />
          <b-div
            class="h-151 flex flex-col justify-between p-8"
            style="margin-right: 8px"
          >
            <span style="font-weight: bold">{{ tour.title }}</span>

            <span class="text-tiny">
              <IconLocation size="12px" />
              مبدا: {{ tour.source.titleFa }}
            </span>

            <span class="text-tiny">
              <IconBus size="16px" />
              نوع حمل و نقل: {{ tour.vehicle.title }}
            </span>
          </b-div>
          <b-div
            margin="x-4"
            border="end"
            class="h-92 flex flex-col justify-between p-8"
            style="align-self: flex-end"
          >
            <span class="text-tiny">
              <IconUser size="24px" />
              ظرفیت: {{ tour.defaultSchedule.capacity }}
            </span>

            <span class="text-tiny">
              <IconLevel name="level" size="20px" />
              درجه سختی: {{ tour.hardness.title }}
            </span>
          </b-div>
          <span class="tour-code">کد تور: {{ tour.id }}</span>
        </b-div>
      </Col>
      <Col col="12 md-3">
        <b-div
          background-color="body-secondary"
          border="end"
          relative-height="100"
          border-color="secondary-subtle"
          class="flex flex-col justify-center items-center p-8"
        >
          <b-p text-color="primary">
            <strong>{{ tour.defaultSchedule.price.toLocaleString() }}</strong>
            <span style="color: #707070; font-size: 0.75em; margin-right: 8px"
              >تومان</span
            >
          </b-p>
          <b-button color="primary" margin="t-4"> مشاهده و رزرو </b-button>
        </b-div>
      </Col>
    </Row>
  </b-div>
</template>

<script setup>
defineOptions({ name: "TourCard" });

defineProps({
  tour: { type: Object, required: true },
});
</script>

<style scoped>
.h-199 {
  min-height: 199px;
}
.h-151 {
  min-height: 151px;
  max-height: 151px;
}
.h-92 {
  min-height: 92px;
  max-height: 92px;
}
.text-tiny {
  color: #7c8187;
  font-size: 0.9em;
}
.tour-code {
  color: #5a5a5a;
  font-size: 0.9em;
  position: absolute;
  top: 28px;
  left: 0;
}
.p-8 {
  padding: 8px;
}
</style>
