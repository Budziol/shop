<script setup>
const props = defineProps({
  favourites: Array,
});

const emits = defineEmits(["delete-liked-product"]);

const deleteLikedProduct = (val) => {
  emits("delete-liked-product", val);
};
</script>

<template>
  <h2 v-if="props.favourites.length === 0" class="infoHeading">Empty</h2>
  <div
    v-else
    class="likedCard"
    v-for="likedProduct in favourites"
    :key="likedProduct.id"
  >
    <div class="cardWrapper">
      <img class="cardThumbnail" :src="likedProduct.thumbnail" alt="item" />
      <p class="cardTitle">{{ likedProduct.title }}</p>
      <p class="cardPrice">
        ${{
          likedProduct.price % 1 !== 0
            ? likedProduct.price
            : likedProduct.price + ".00"
        }}
      </p>
    </div>
    <button class="delBtn" @click="deleteLikedProduct(likedProduct)">
      Delete
    </button>
  </div>
</template>

<style lang="scss">
@import "../assets/styles.scss";
.infoHeading {
  @include infoHeading;
}
.likedCard {
  width: 100%;
  display: flex;
  flex-direction: column;
  .cardWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 10rem;
    .cardThumbnail {
      display: block;
      max-width: 150px;
      aspect-ratio: 1/1;
    }
    .cardTitle {
      font-size: 16rem;
      font-weight: 400;
      color: $main-font-clr;
    }
    .cardPrice {
      font-size: 18rem;
      font-weight: 400;
      color: $secondary-font-clr;
    }
  }
  .delBtn {
    @include btn;
    margin: auto;
    background-color: $delBtn-clr;
    margin-top: 10rem;
  }
}
</style>
