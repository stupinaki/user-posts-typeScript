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

import {Component, Prop, Vue} from "vue-property-decorator";
import {IUser} from "@/types/IUser";

@Component
export default class Select extends Vue {
  private optionValue: null | string = null;

  @Prop() readonly users: IUser[] = [];
}

</script>

<style scoped>

</style>