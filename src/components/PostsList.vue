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


import {Component, Prop, Vue} from "vue-property-decorator";
import {IPost} from "@/types/IPost";

@Component
export default class PostList extends Vue {
  @Prop() readonly posts: IPost[] = [];
}


</script>

<style>
.list{
  padding: 0;
}
a {
  text-decoration: none;
}
</style>
