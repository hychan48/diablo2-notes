<template>
<v-col notes="Sorc Notes">
  <v-card
    :hover=false
  >

    <v-card-title notes="Sorc Notes"

    >
      <v-icon
        left
      >
        mdi-bell-ring
      </v-icon>
      <span class="title font-weight-light">
        Sorc Notes
      </span>
    </v-card-title>
    <v-card-text>

      <v-combobox
        v-for="srcFrame in srcFrames"
        v-bind="srcFrame"
        :key="srcFrame.label"

      />
    </v-card-text>
  </v-card>
</v-col>
</template>

<script>
export default {
  name: "devSorcNotes",
  computed: {
    /**
     * Todo make it show a gradient
     * @return {[{label: string, items: number[]}]}
     */
    srcFrames() {
      return [
        {
          //needs to be done specially...
          label:'FCR Sorc - Light',
          items:[
            0,   7,  15,  23,  35,   52,   78,  117,  194
          ],
          hint:'todo: show gradient'
        },
        {
          //needs to be done specially...
          label:'FCR Sorc',
          items:
            "0    9   20   37   63* 105  200"
              .split(/\s+/g)
          ,
        },
        {
          //needs to be done specially...
          label:'FHR sorc',
          items:
           "0   5   9  14  20  30  42  60   86  142  280"
              .split(/\s+/g)
          ,
        },
        {
          //needs to be done specially...
          label:'FBR sorc',
          items:
            "0   7   15   27   48   86  200"
              .split(/\s+/g)
          ,
        },



      ]
    }
  },
}
</script>

<style scoped>

</style>
