<template>
<v-col notes="nuxt/$content Dev">
  <v-card
    :hover=false
  >

    <v-card-title notes="nuxt/$content Dev"

    >
      <v-icon
        left
      >
        mdi-bell-ring
      </v-icon>
      <span class="title font-weight-light">
        nuxt/$content Dev
      </span>
    </v-card-title>
    <v-card-text>
      <a
        href="https://d2.maxroll.gg/d2-drop-calculator"
        target="_blank"
      >https://d2.maxroll.gg/d2-drop-calculator</a>
      <br/>
      <hr/>
      <nuxt-content :document="page"/>
      <pre>{{page}}</pre>


    </v-card-text>
  </v-card>
</v-col>
</template>

<script>
export default {
  name: "devContentDataPage",
  async asyncData({ $content, params, error }) {
    // const slug = params.slug || "index";//from demo
    // const slug = params.slug || "hello";//hello.md is the file name
    const slug = params.slug || "d2_data_raw";
    const page = await $content(slug)
      .only('weapons')//keys

      /* fetch comes last */
      .fetch()
      .catch(err => {
        error({statusCode: 404, message: "Page not found"});
      });

    return {
      page
    };
  },
  data() {
    return {
      page: null,
    }
  },
}
</script>

<style scoped>

</style>
