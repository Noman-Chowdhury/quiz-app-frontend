<template>
  <div class="home">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <welcome/>
  </div>
</template>

<script>
// @ is an alias to /src
import welcome from "@/views/Welcome";

export default {
  name: 'Home',
  components: {
    welcome
  }
}
</script>
