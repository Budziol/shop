<script setup>
import Close from "../icons/NavIcons/Close.vue";
import Categories from "./Categories.vue";
import Favourites from "./Favourites.vue";

const props = defineProps({
  modalComponent: String,
  categories: Array,
  activeCategory: String,
});

const emits = defineEmits(["open", "clicked-category"]);

const categoryClicked = (val) => {
  emits("clicked-category", val);
};
</script>

<template>
  <div class="modal">
    <div class="headingWrapper">
      <h2 class="heading">
        {{ modalComponent.charAt(0).toUpperCase() + modalComponent.slice(1) }}
      </h2>
      <span class="icon" @click="$emit('open')">
        <Close />
      </span>
    </div>
    <span class="line"></span>
    <div class="modalContent">
      <Categories
        v-if="modalComponent === 'menu'"
        :categories="categories"
        :activeCategory="activeCategory"
        @category-name="categoryClicked"
      />
      <Favourites v-if="modalComponent === 'favourites'" />
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles.scss";
.modal {
  position: absolute;
  top: 0;
  right: 0;
  min-height: 100%;
  padding: 10rem 20rem;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-left: 3px solid $active-font-color;
  @media (max-width: 768px) {
    left: 0;
  }
  .headingWrapper {
    display: flex;
    align-items: center;
    column-gap: 20px;
    .heading {
      font-size: 20px;
    }
    .icon {
      cursor: pointer;
    }
  }
  .line {
    @include line;
    margin: 10rem 0;
  }
  .modalContent {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-start;
    row-gap: 10rem;
  }
}
</style>
