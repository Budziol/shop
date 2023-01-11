<script setup>
import Notification from "../icons/NavIcons/Notification.vue";
import Basket from "../icons/NavIcons/Basket.vue";
import Favourite from "../icons/NavIcons/Favourite.vue";
import Search from "../icons/NavIcons/Search.vue";
import Menu from "../icons/NavIcons/Menu.vue";
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <h1 class="logo">Shop.</h1>
    </router-link>
    <ul class="container">
      <li class="icon">
        <Notification />
      </li>
      <router-link class="icon" to="/basket">
        <Basket />
      </router-link>
      <li class="icon" @click="$emit('icon-click', 'favourites')">
        <Favourite />
      </li>
      <li class="icon">
        <Search />
      </li>
      <li class="icon" @click="$emit('icon-click', 'menu')">
        <Menu />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss">
@import "../assets/styles.scss";
.navbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 10rem;
  display: flex;
  align-items: center;
  background-color: $bg-color;
  a {
    color: unset;
    text-decoration: none;
  }
  .logo {
    font-size: 24rem;
    font-weight: 400;
  }
  .container {
    list-style-type: none;
    display: flex;
    align-items: center;
    margin-left: auto;

    .icon {
      margin: 10rem;
      cursor: pointer;
    }
  }
}
</style>
