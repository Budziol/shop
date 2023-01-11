<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import Favourite from "../icons/NavIcons/Favourite.vue";
import Basket from "../icons/NavIcons/Basket.vue";

const props = defineProps({
  products: Object,
  activeCategory: String,
});

const emits = defineEmits(["basket-product"]);

const addToFavourites = (product) => {
  let existing = JSON.parse(localStorage.getItem("favourites"));
  if (existing) {
    if (existing.find((item) => item.id === product.id) !== undefined) {
      existing = existing.filter((item) => item.id !== product.id);
    } else {
      existing = [...existing, product];
    }
  } else {
    existing = [product];
  }
  localStorage.setItem("favourites", JSON.stringify(existing));
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
      <span class="icon" @click="addToFavourites(product)">
        <Favourite />
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
  }
}
</style>
