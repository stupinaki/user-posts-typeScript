<template>
  <div class="post">
    <Loader v-if="loading"/>
    <template v-else>
      <div class="postUserName">
        {{ $data.user.username }}:
      </div>
      <div class="postContent">
        {{ $data.post.body }}
      </div>
      <form>
        <input
            v-model="$data.comment"
            class="comment"
            placeholder="Ваш комментарий"
            type="text"
        >
        <button
            class="publish"
            type="submit"
            @click="handleClick"
        >
          Опубликовать
        </button>
      </form>
      <ul class="postComments list-group-flush">
        <li
            v-for="oneComment in $data.comments"
            :key="oneComment.id"
            class="list-group-item"
        >
          <strong>Имя пользователя: </strong>
          {{ oneComment.name }}
          <br/>
          <strong>Комментарий: </strong>
          {{ oneComment.body }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {fetchPosts} from "@/api/fetchPosts";
import {fetchUsers} from "@/api/fetchUsers";
import {fetchComments} from "@/api/fetchComments";
import Loader from "@/components/Loader.vue";
import {addComment} from "@/api/addComment";



export default Vue.extend({
  name: "Post",
  components: {
    Loader,
  },
  data() {
    return {
      post: [],
      user: [],
      comments: [],
      comment: null,
      loading: true,
    }
  },

  computed: {
    postId(): number {
      const {id} = this.$route.params;
      return +id.slice(1);
    }
  },
  mounted: async function () {
    this.$data.loading = true;
    const [posts, comments] = await Promise.all([
      fetchPosts({id: this.postId}),
      fetchComments({postId: this.postId})
    ])
    this.$data.post = posts[0];
    this.$data.comments = comments;

    const users = await fetchUsers({id: this.$data.post.userId});
    this.$data.user = users[0];
    this.$data.loading = false;
  },
  methods: {
    async handleClick() {
      this.$data.loading = true;
      const newComment = await addComment({
        body: this.$data.comment,
        postId: this.postId,
        name: 'Unknown',
      });
      this.$data.comment = '';
      this.$data.comments.push(newComment);
      this.$data.loading = false;
    },
  }
})







// import {fetchPosts} from "@/api/fetchPosts";
// import {fetchUsers} from "@/api/fetchUsers";
// import {fetchComments} from "@/api/fetchComments";
// import Loader from "@/components/Loader.vue";
// import {addComment} from "@/api/addComment";
// import Vue from "vue";
// import {IPost} from "@/types/IPost";
// import {IUser} from "@/types/IUser";
// import {IComment} from "@/types/IComment";
// import Component from "vue-class-component";
//
// @Component({
//   components: {
//     Loader,
//   }
// })
// export default class Post extends Vue {
//
//   private post?: IPost;
//   private user?: IUser;
//   private comments: IComment[] = [];
//   private comment?: IComment;
//   private loading: boolean = true;
//
//   get postId(): number {
//     const {id} = this.$route.params;
//     return +id.slice(1);
//   }
//
//   public async handleClick() {
//     this.$data.loading = true;
//     const newComment = await addComment({
//       body: this.$data.comment,
//       postId: this.postId,
//       name: 'Unknown',
//     });
//     this.$data.comment = '';
//     this.$data.comments.push(newComment);
//     this.$data.loading = false;
//   }
//
//   async mounted(): Promise<void> {
//     this.$data.loading = true;
//     const [posts, comments] = await Promise.all([
//       fetchPosts({id: this.postId}),
//       fetchComments({postId: this.postId})
//     ])
//     this.$data.post = posts[0];
//     this.$data.comments = comments;
//     const users = await fetchUsers({id: this.$data.post.userId});
//     this.$data.user = users[0];
//     this.$data.loading = false;
//   }
// }

</script>

<style scoped>
.post {
  margin: 12px;
}

.postUserName {
  font-weight: bold;
}

.publish,
.comment {
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 1rem;
  color: #212529;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.postComments {
  text-decoration: none;
}

.postContent {
  margin-bottom: 12px;
}
</style>