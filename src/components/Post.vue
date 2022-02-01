<template>
  <div class="post">
    <Loader v-if="loading"/>
    <template v-else>
      <div class="postUserName">
        {{ user.username }}:
      </div>
      <div class="postContent">
        {{ post.body }}
      </div>
      <form>
        <input
            v-model="comment"
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
            v-for="comment in comments"
            :key="comment.id"
            class="list-group-item"
        >
          <strong>Имя пользователя: </strong>
          {{ comment.name }}
          <br/>
          <strong>Комментарий: </strong>
          {{ comment.body }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import {fetchPosts} from "../api/fetchPosts";
import {fetchUsers} from "../api/fetchUsers";
import {fetchComments} from "../api/fetchComments";
import Loader from "./Loader";
import {addComment} from "../api/addComment";


export default {
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
    postId() {
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
}
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