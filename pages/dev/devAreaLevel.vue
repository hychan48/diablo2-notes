<template>
<v-col notes="Area Level">
  <v-card
    :hover=false
  >

    <v-card-title notes="Area Level"

    >
      <v-icon
        left
      >
        mdi-bell-ring
      </v-icon>
      <span class="title font-weight-light">
        Area Level
      </span>
    </v-card-title>
    <v-card-text>

      1. read from static/rawFiles/area_level.xlsx
      <br/>
      2. write to area_level_content.csv (first attempt)
    </v-card-text>
  </v-card>
</v-col>
</template>

<script>
/**
 * This page should display area levels
 * convertToContent.test.js
 * use
 */
export default {
  name: "devAreaLevel",
  async fetch(){

  },
  data() {
    return {
      pageData: "",//shouldn't be watched.. but w/e let's leave it as it for now
    }
  },
}
</script>

<style scoped>

</style>
