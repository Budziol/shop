<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import Basket from "../icons/NavIcons/Basket.vue";

const props = defineProps({
  products: Object,
  activeCategory: String,
  favourites: Array,
});

const emits = defineEmits(["like-click"]);

const likeProduct = (val) => {
  emits("like-click", val);
};

const addToBasket = (product) => {
  let existing = JSON.parse(localStorage.getItem("basket"));
  if (existing) {
    if (existing.find((item) => item.id === product.id) !== undefined) {
      return;
    } else {
      existing = [...existing, product];
    }
  } else {
    existing = [product];
  }
  localStorage.setItem("basket", JSON.stringify(existing));
};
</script>

<template>
  <div class="categoryWrapper">
    <h2 class="category">
      {{ activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) }}
    </h2>
    <span class="line"></span>
  </div>
  <div class="wrapper">
    <div class="card" v-for="product in products" :key="product.id">
      <img class="cardThumbnail" :src="product.thumbnail" alt="item" />
      <p class="cardTitle">{{ product.title }}</p>
      <p class="cardPrice">
        ${{ product.price % 1 !== 0 ? product.price : product.price + ".00" }}
      </p>
      <span class="icon" @click="likeProduct(product)">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="background"
            :class="
              favourites.find((item) => item.id === product.id) ? 'filled' : ''
            "
            d="M6 3L11.5 4.5L16.5 3L20.5 4.5L22 9.5L20.5 14L12 21L7.5 18L5 15.5L3 13L2 10L2.5 6L6 3Z"
            fill="background"
          />
          <path
            class="stroke"
            :class="
              favourites.find((item) => item.id === product.id) ? 'filled' : ''
            "
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.5532 2.00002C15.1056 2 14.1724 2.17246 13.1027 2.69607C12.7066 2.88993 12.335 3.12339 11.99 3.39576C11.6582 3.13866 11.3015 2.91592 10.9218 2.72813C9.83132 2.18878 8.85028 2 7.45455 2C3.71644 2 1 5.09727 1 9.11988C1 12.1578 2.69383 15.0923 5.84884 17.9299C7.50489 19.4193 9.61932 20.8933 11.1336 21.6775L12 22.1261L12.8664 21.6775C14.3807 20.8933 16.4951 19.4193 18.1512 17.9299C21.3062 15.0923 23 12.1578 23 9.11988C23 5.13984 20.2579 2.01536 16.5532 2.00002ZM21 9.11988C21 11.4999 19.5862 13.9493 16.8137 16.4429C15.3022 17.8023 13.359 19.1609 12 19.8737C10.641 19.1609 8.69782 17.8023 7.18628 16.4429C4.41382 13.9493 3 11.4999 3 9.11988C3 6.14772 4.88364 4 7.45455 4C8.56428 4 9.24813 4.13159 10.0351 4.52084C10.5 4.75077 10.9109 5.05437 11.2665 5.43377L12.0023 6.2187L12.7315 5.42755C13.0951 5.03295 13.512 4.72244 13.9819 4.49243C14.7459 4.11849 15.387 4 16.5491 4.00001C19.0882 4.01053 21 6.18896 21 9.11988Z"
            fill="black"
          />
        </svg>
      </span>
      <span class="icon" @click="addToBasket(product)">
        <Basket />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles.scss";
.categoryWrapper {
  display: flex;
  flex-direction: column;
  column-gap: 5rem;
  .category {
    @include heading;
  }
  .line {
    @include line;
  }
}
.wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 20rem;

  .card {
    min-height: 200px;
    text-align: center;
    .cardThumbnail {
      border-radius: 30px;
      width: 100%;
      aspect-ratio: 1/1;
    }
    .cardTitle {
      font-size: 16rem;
      font-weight: 400;
      color: $main-font-clr;
      min-height: 40px;
    }
    .cardPrice {
      font-size: 18rem;
      font-weight: 400;
      color: $secondary-font-clr;
    }
    .icon:hover {
      svg {
        .background {
          transition: all 0.5s ease-in-out;
          fill: #6342e8;
        }
        .stroke {
          transition: all 0.5s ease-in-out;
          fill: #6342e8;
        }
      }
    }
    .filled {
      fill: #6342e8;
    }
  }
}
</style>
