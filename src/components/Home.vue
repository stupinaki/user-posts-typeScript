<template>
  <div class="home">
    <Loader v-if="loading"/>
    <template v-else>
      <Select
          :users="users"
          @userChange="onUserChange"
      />
      <PostsList
          :posts="posts"
      />
    </template>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import {IPost} from "@/types/IPost";
import {IUser} from "@/types/IUser";
import {fetchUsers} from "@/api/fetchUsers";
import {fetchPosts} from "@/api/fetchPosts";
import Select from "@/components/Select.vue";
import Loader from "@/components/Loader.vue";
import PostsList from "@/components/PostsList.vue";

@Component({
  components: {
    Select,
    Loader,
    PostsList,
  }
})
export default class Home extends Vue {
  private posts: IPost[] = [];
  private users: IUser[] = [];
  private loading: boolean = true;

  async mounted(): Promise<void> {
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
    ]);
    this.$data.users = users;
    this.$data.posts = posts;
    this.$data.loading = false;
  }

  public async onUserChange(userId: number): Promise<void> {
    this.loading = true;
    this.$data.posts = await fetchPosts({userId});
    this.loading = false;
  }
}
</script>

<style>
.home {
  margin: 12px;
}
</style>