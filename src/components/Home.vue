<template>
  <div class="home">
    <Loader v-if="loading"/>
    <template v-else>
      <Select
          :users="this.$data.users"
          @userChange="onUserChange"
      />
      <PostsList
          :posts="this.$data.posts"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import {IPost} from "@/types/IPost";
import {IUser} from "@/types/IUser";
import {fetchPosts} from "@/api/fetchPosts";
import {fetchUsers} from "@/api/fetchUsers";
import Loader from "@/components/Loader.vue";
import Select from "@/components/Select.vue";
import PostsList from "@/components/PostsList.vue";

@Component({
  components: {
    Select,
    Loader,
    PostsList,
  }
})
export default class Home extends Vue{
  private posts: IPost[] = [];
  private users: IUser[] = [];
  private loading: boolean = true;

  public async onUserChange(userId: number) {
      this.loading = true;
      this.$data.posts = await fetchPosts({userId});
      this.loading = false;
  }

  async mounted(): Promise<void> {
    this.$data.loading = true;
    const [users, posts] = await Promise.all([
      fetchUsers(),
      fetchPosts(),
    ])
    this.$data.users = users;
    this.$data.posts = posts;
    this.$data.loading = false;
  }
}










// import Component from "vue-class-component";
// import Vue from "vue";
// import {IPost} from "@/types/IPost";
// import {IUser} from "@/types/IUser";
// import {fetchUsers} from "@/api/fetchUsers";
// import {fetchPosts} from "@/api/fetchPosts";
// import Select from "@/components/Select.vue";
// import Loader from "@/components/Loader.vue";
// import PostsList from "@/components/PostsList.vue";

// @Component({
//   components: {
//     Select,
//     Loader,
//     PostsList,
//   }
// })
// export default class Home extends Vue {
//   private posts: IPost[] = [];
//   private users: IUser[] = [];
//   private loading: boolean = true;
//
//   get getPostId() {
//     const {id} = this.$route.params;
//     return +id.slice(1);
//   }
//   async mounted(): Promise<void> {
//     // const [users, posts] = await Promise.all([
//     //   fetchUsers(),
//     //   fetchPosts(),
//     // ]);
//     const [posts, users] = await Promise.all([
//       fetchPosts({id: this.getPostId}),
//       fetchUsers()
//     ])
//
//     this.$data.users = users;
//     this.$data.posts = posts;
//     this.$data.loading = false;
//   }
//
//   public async onUserChange(userId: number): Promise<void> {
//     this.loading = true;
//     this.$data.posts = await fetchPosts({userId});
//     this.loading = false;
//   }
// }
</script>

<style>
.home {
  margin: 12px;
}
</style>