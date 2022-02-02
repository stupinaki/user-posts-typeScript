<template>
  <ul class="list list-group-flush">
    <li
      v-for="post in posts"
      :key="post.id"
      class="list-group-item"
    >
        <router-link :to="`/post:${post.id}`">
          {{post.title}}
        </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";


export default Vue.extend({
  name: 'PostsList',
  props: {
    posts: {type: Array, default: ()=>{[]} }
  }
})


</script>

<style>
.list{
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
