<template>
  <ul class="list list-group-flush">
    <li
      v-for="post in this.posts"
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
import {Prop} from "vue-property-decorator";
import {IPost} from "@/types/IPost";
import Component from "vue-class-component";
import Vue from "vue";


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
