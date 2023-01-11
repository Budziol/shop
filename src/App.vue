<script setup>
import Home from "./components/Home.vue";
import Navbar from "./components/Navbar.vue";
import Modal from "./components/Modal.vue";
import Loader from "./components/Loader.vue";
import { onMounted, ref, watch, onBeforeMount } from "vue";
import axios from "axios";

const products = ref(null);
const categories = ref(null);
const activeCategory = ref("smartphones");
const loading = ref(true);
const open = ref(false);
const modalComponent = ref();

const openComponent = (val) => {
  modalComponent.value = val;
  open.value = true;
};

const fetchData = () => {
  //products
  axios
    .get(`https://dummyjson.com/products/category/${activeCategory.value}`)
    .then(function (response) {
      products.value = response.data.products;
      loading.value = false;
    });
  //categories
  axios
    .get("https://dummyjson.com/products/categories")
    .then(function (response) {
      categories.value = response.data;
    });
};

onMounted(() => {
  fetchData();
});

watch([activeCategory], () => {
  fetchData();
  loading.value = true;
  open.value = false;
});

const favourites = ref();

onBeforeMount(() => {
  favourites.value = JSON.parse(localStorage.getItem("favourites"));
});

const handleFavourites = (product) => {
  favourites.value = JSON.parse(localStorage.getItem("favourites"));
  if (favourites.value) {
    if (favourites.value.find((item) => item.id === product.id) !== undefined) {
      favourites.value = favourites.value.filter(
        (item) => item.id !== product.id
      );
    } else {
      favourites.value = [...favourites.value, product];
    }
  } else {
    favourites.value = [product];
  }
  localStorage.setItem("favourites", JSON.stringify(favourites.value));
};
</script>

<template>
  <Navbar @icon-click="openComponent" />
  <div v-if="open">
    <Modal
      :modalComponent="modalComponent"
      @open="open = false"
      :categories="categories"
      :activeCategory="activeCategory"
      @clicked-category="(val) => (activeCategory = val)"
      :favourites="favourites"
      @delete-liked-product="(val) => handleFavourites(val)"
    />
  </div>
  <div v-if="loading"><Loader /></div>
  <div class="home" v-else>
    <router-view
      :products="products"
      :activeCategory="activeCategory"
      :favourites="favourites"
      @like-click="(val) => handleFavourites(val)"
    />
  </div>
</template>

<style scoped>
.home {
  padding: 0 10rem;
  display: flex;
  flex-direction: column;
  row-gap: 20rem;
  margin-top: 50rem;
}
</style>
