<!-- =========================================================================================
    File Name: MailItem.vue
    Description: Mail Item - Displays mail item
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div class="mail__mail-item sm:px-4 px-2 py-6">
        <div class="flex w-full">
            <vs-avatar class="sender__avatar flex-shrink-0 mr-3 border-2 border-solid border-white"  size="40px"></vs-avatar>

            <div class="flex w-full justify-between items-start">
                <div class="mail__details">
                    <h5 v-if="showByAdmin===true" class="mb-1">{{ mail.author.last_name +" "}}{{ mail.author.first_name}}</h5>
                  <span  v-if="mail.category.name">{{ mail.category.name }}</span>
                  <br>
                  <span style="color:  black" class="mb-1" ><b>{{mail.solution.name}}</b></span>
                  <br>
                  <span style="color: blue " class="mb-1" >{{ mail != null ? mail.reference : 'MOOZISTUDIO'}}</span>
                </div>

                <div class="mail-item__meta flex items-center">

                  <vs-chip v-if="mail.fixed === 0" >
                      <div class="h-3 w-3  rounded-full bg-danger mr-2" ></div>
                      <span class="text-right" >{{ $t("Non_Traité") }}</span>
                  </vs-chip>

                  <vs-chip v-if="mail.fixed === 1">
                      <div class="h-3 w-3  rounded-full bg-warning mr-2"  ></div>
                      <span class="text-right" >{{ $t("En_cours_de_traitement") }}</span>
                  </vs-chip>
                  <vs-chip v-if="mail.fixed === 2">
                      <div class="h-3 w-3  rounded-full bg-primary mr-2" ></div>
                      <span class="text-right" >{{ $t("Traiter") }}</span>
                  </vs-chip>

                  <vs-chip >
                    <span>{{ mail.created_at | date_time }}</span>
                  </vs-chip>

                </div>
            </div>
        </div>

        <div class="flex w-full">
            <div class="flex items-center ml-0" v-if="mail.fixed === 0">
              <vx-tooltip :text="$t('Non_Traité')" color="danger">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-danger fill-current stroke-current'" ></feather-icon>
              </vx-tooltip>
            </div>

          <div class="flex items-center ml-0" v-if="mail.fixed === 1">
            <vx-tooltip :text="$t('En_cours_de_traitement')" color="warning">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-warning fill-current stroke-current'" ></feather-icon>
            </vx-tooltip>
          </div>

          <div class="flex items-center ml-0" v-if="mail.fixed === 2">
            <vx-tooltip :text="$t('Traiter')" color="primary">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-primary fill-current stroke-current'" ></feather-icon>
            </vx-tooltip>
          </div>


            <div class="mail__message truncate ml-3">
                <span>{{ mail.description | filter_tags }}</span>
            </div>
        </div>

    </div>
</template>

<script>
export default {
  props: {
    mail: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      showByAdmin: false,
      isSelectedMail: this.isSelected
    }
  },
  watch: {
    isSelected (value) {
      this.isSelectedMail = value
    },
    isSelectedMail (val) {
      val ? this.$emit('addToSelected', this.mail.id) : this.$emit('removeSelected', this.mail.id)
    }
  },
  computed: {
    labelColor () {
      return (label) => {
        const tags = this.$store.state.email.mailTags
        return tags.find((tag) => {
          return tag.value === label
        }).color
      }
    }
  },
  methods: {
    toggleIsStarred () {
      const payload = { mailId: this.mail.id, value: !this.mail.isStarred }
      this.$store.dispatch('email/toggleIsMailStarred', payload)
    }
  },
  created () {
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.showByAdmin = true
    }
  }
}

</script>

