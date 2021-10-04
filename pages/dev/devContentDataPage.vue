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
<!--      this only works for md?-->
<!--      https://nuxtjs.org/docs/directory-structure/content/
    seems only useful for md... anythign else not good.. uses
    "prism" theme for code blocks.. that one might be interesting
-->
      <nuxt-content :document="page"/>
<!--      <pre>{{page}}</pre>-->
<!--      https://vuetifyjs.com/en/components/treeview/-->
<!--      <pre>{{!!page}}</pre>-->
<!--      <pre>{{treeViewItems}}</pre>-->
<!--      <v-treeview-->
<!--        v-if="!!page"-->
<!--        :items="treeViewItems"-->
<!--      >-->
<!--      </v-treeview>-->


    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-dialog
        v-model="dialog"
        width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            ssssscolor="red lighten-2"
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
          >
            Click Me
          </v-btn>
        </template>
        <v-card>
<!--          <pre>{{treeViewItems}}</pre>-->
<!--          <pre>{{this.page.weapons}}</pre>-->
          <pre>{{page}}</pre>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</v-col>
</template>

<script>
export default {
  name: "devContentDataPage",
  async asyncData({ $content, params, error }) {
    // const slug = params.slug || "index";//from demo
    const slug = params.slug || "hello";//hello.md is the file name
    // const slug = params.slug || "d2_data_raw";
    // const slug = params.slug || "d2_data_content";
    // let slug = "d2_data_content";
    // slug =+ `?time=${Date.now()}`
    const page = await $content(slug)
      // .limit(5)
      // .only('weapons')//keys

      /* fetch comes last */
      .fetch()

      /* cant chain fetch */
      // .only('msf')//keys
      // .fetch()
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

      dialog:false,
    }
  },
  computed: {
    /**
     * needs to be converted into array...
     *
     * id, name, children is the format
     * todo
     * @return {*[]}
     */
    treeViewItems() {
      // return [this.page];
      // return [this.page];
      if(this.page){
        //page has stuff injected into from $content nuxt
        return Object.entries(this.page?.weapons)
          .map( ([key,value]) =>{

          return {
            // id:key,
            id:key,
            name:value.name,
            children:[
              // Object.key
            ],

          }
        })
          .filter((value,i) => {
            return i < 5
          })
          ;
      }


    }
  },
}
</script>

<style scoped>

</style>
