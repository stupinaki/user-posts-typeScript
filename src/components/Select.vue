<template>
  <form>
    <select
        v-model="optionValue"
        class="form-select"
        aria-label="Default select example"
        name="usernames"
        @change="$emit('userChange', optionValue)"
    >
      <option :value="null">
        Выберите автора
      </option>
      <option
          v-for="user in users"
          :key="user.id"
          :value="user.id"
      >
        {{user.username}}
      </option>
    </select>
  </form>
</template>

<script lang="ts">

import Vue from "vue";


export default Vue.extend({
  name: "Select",
  props: {
    users: { type: Array, default: ()=>{[]} },
  },
  data: () => ({
    optionValue: null
  }),
})


</script>

<style scoped>

</style>