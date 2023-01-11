<script>
// use normal <script> to declare options
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { ref, watch, onBeforeMount, onUpdated } from "vue";
import router from "@/router";
import Trash from "../icons/Trash.vue";
import Loader from "./Loader.vue";

const basket = ref();
const sum = ref(0);
const isEmpty = ref(true);

const deleteProduct = (val) => {
  basket.value = basket.value.filter((product) => product.id !== val.id);
  localStorage.setItem("basket", JSON.stringify(basket.value));
};

onBeforeMount(() => {
  basket.value = JSON.parse(localStorage.getItem("basket"));
});

watch(basket, () => {
  if (basket.value.length === 0) {
    isEmpty.value = true;
  } else {
    isEmpty.value = false;
  }
});

onUpdated(() => {
  if (basket.value.length > 0) {
    sum.value = basket.value.reduce((x, y) => {
      return x + y.price;
    }, 0);
  } else {
    sum.value = 0;
  }
});

const changeRoute = () => {
  router.push({ path: "/" });
};
</script>

<template>
  <section id="basketWrapper">
    <h2 class="heading">Basket</h2>
    <div class="basket">
      <div v-if="!isEmpty" class="cardsWrapper">
        <div class="card" v-for="product in basket" :key="product.id">
          <img class="cardThumbnail" :src="product.thumbnail" alt="item" />
          <p class="cardTitle">{{ product.title }}</p>
          <p class="cardPrice">
            ${{
              product.price % 1 !== 0 ? product.price : product.price + ".00"
            }}
          </p>
          <span class="icon" @click="deleteProduct(product)"><Trash /></span>
        </div>
      </div>
      <h2 v-else class="infoHeading">Empty</h2>
      <div class="basketSidebar">
        <p class="paragraph">To proceed login or continue without account</p>
        <div class="login">
          <button class="loginBtn" @click="changeRoute">Login</button>
        </div>
        <div class="or">
          <span class="line"></span>
          <p class="paragraph">OR</p>
          <span class="line"></span>
        </div>
        <div class="continue">
          <button
            class="continueBtn"
            :disabled="isEmpty"
            :class="isEmpty ? 'disabled' : ''"
          >
            Continue without account
          </button>
        </div>
        <div v-if="!isEmpty" class="summary">
          <h2 class="total">Total</h2>
          <p class="summaryText">${{ sum }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import "../assets/styles.scss";
#basketWrapper {
  text-align: center;
  .heading {
    @include heading;
    padding-bottom: 40rem;
  }
  .basket {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    row-gap: 20rem;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
    .infoHeading {
      @include infoHeading;
      grid-column: 1/3;
    }
    .cardsWrapper {
      width: 100%;
      grid-column: 1/3;
      max-height: 80vh;
      overflow-y: scroll;
      @media (max-width: 768px) {
        max-height: unset;
        overflow-y: unset;
      }

      &::-webkit-scrollbar {
        width: 10rem;
      }

      &::-webkit-scrollbar-track {
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: $active-font-color;
      }

      .card {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        align-items: center;
        padding-bottom: 20rem;

        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr 1fr;
        }
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
        .icon {
          cursor: pointer;
          @media (max-width: 768px) {
            grid-column: 1/4;
          }
        }
      }
    }
    .basketSidebar {
      background-color: $bg-secondary-color;
      display: flex;
      flex-direction: column;
      row-gap: 20rem;
      padding: 20rem 10rem;
      border-radius: 5px;
      height: fit-content;

      @media (max-width: 768px) {
        width: 100%;
      }

      .paragraph {
        @include paragraph;
      }
      .login {
        .loginBtn {
          @include loginBtn;
        }
      }
      .or {
        display: flex;
        align-items: center;
        justify-content: center;
        .line {
          @include line;
        }
        .paragraph {
          @include paragraph;
          padding: 0 10rem;
        }
      }
      .continue {
        .continueBtn {
          @include loginBtn;
          background-color: $active-font-color;
          color: #fff;
          border-color: transparent;
        }
        .continueBtn.disabled {
          background-color: $secondary-font-clr;
          cursor: default;
        }
      }
      .summary {
        .total {
          font-size: 16px;
          font-weight: 300;
        }
        .summaryText {
          @include paragraph;
          font-weight: 300;
        }
      }
    }
  }
}
</style>
