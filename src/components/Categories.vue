<script setup>
const props = defineProps({
  categories: Array,
  activeCategory: String,
});

const emits = defineEmits(["category-name"]);
</script>

<template>
  <h2
    class="categoryName"
    v-for="category in categories"
    @click="$emit('category-name', category)"
    :style="[
      category === activeCategory ? { color: '#6342E8' } : { color: '#a1a1a1' },
    ]"
  >
    {{ category.charAt(0).toUpperCase() + category.slice(1) }}
  </h2>
</template>

<style lang="scss" scoped>
@import "../assets/styles.scss";

.categoryName {
  padding-right: 60rem;
  display: flex;
  font-size: 18px;
  color: $secondary-font-clr;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 10rem;
  }
}
</style>
