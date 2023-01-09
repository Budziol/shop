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
    <div class="overlay" @click="$emit('open')">
      <div class="modalContent" @click.stop="">
        <div class="headingOuterWrapper">
          <div class="headingWrapper">
            <h2 class="heading">
              {{
                modalComponent.charAt(0).toUpperCase() + modalComponent.slice(1)
              }}
            </h2>
            <span class="icon" @click="$emit('open')">
              <Close />
            </span>
          </div>
          <span class="line"></span>
        </div>
        <div class="modalData">
          <Categories
            v-if="modalComponent === 'menu'"
            :categories="categories"
            :activeCategory="activeCategory"
            @category-name="categoryClicked"
          />
          <Favourites v-if="modalComponent === 'favourites'" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "../assets/styles.scss";
.modal {
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  @media (max-width: 768px) {
    left: 0;
  }
  .overlay {
    background-color: hsla(0, 0%, 7%, 0.4);
    width: 100vw;
    .modalContent {
      padding: 20rem;
      background-color: #fff;
      width: fit-content;
      min-height: 100vh;
      margin-left: auto;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      border-left: 3px solid $active-font-color;
      @media (max-width: 768px) {
        width: auto;
        border: none;
        border-radius: none;
      }
      .headingOuterWrapper {
        display: flex;
        flex-direction: column;
        row-gap: 20rem;

        @media (max-width: 768px) {
          align-items: center;
        }
        .headingWrapper {
          display: flex;
          align-items: center;
          column-gap: 20rem;
          .heading {
            font-size: 22rem;
            color: $active-font-color;
          }
          .icon {
            margin-left: auto;
          }
        }
        .line {
          @include line;
        }
      }
      .modalData {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        row-gap: 10rem;
        padding: 20rem 0;
        @media (max-width: 768px) {
          align-items: center;
        }
      }
    }
  }
}
</style>
