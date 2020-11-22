<template>
  <div>
    <button class="header_img"  @click='$router.go(-1)'>
      <img src="@/assets/images/public/arrow.jpg" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="" scoped>
.header_img {
  margin-left: 0.3rem;
  margin-top: .1rem;
  width: 0.5rem;
}
.header_img img {
  width: 0.35rem;
  height: 0.42rem;
}
</style>
