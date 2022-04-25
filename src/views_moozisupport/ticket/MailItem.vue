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
        <!-- MAIL ROW 1 : META -->
        <div class="flex w-full">
            <vs-avatar class="sender__avatar flex-shrink-0 mr-3 border-2 border-solid border-white"  size="40px"></vs-avatar>

            <div class="flex w-full justify-between items-start">
                <div class="mail__details">
                    <h5 class="mb-1">{{ mail.author.last_name +" "}}{{ mail.author.first_name}}</h5>
                    <span v-if="mail.category.name">{{ mail.category.name }}</span>
                    <span v-else>(no subject)</span>
                </div>

                <div class="mail-item__meta flex items-center">
<!--                    <div class="email__labels hidden sm:flex items-center">-->
<!--                        <div class="h-2 w-2 rounded-full mr-2" :class="'bg-' + labelColor(label)" v-for="(label, index) in mail.labels" :key="index"></div>-->
<!--                    </div>-->
                    <span>{{ mail.created_at | date }}</span>
                </div>
            </div>
        </div>
        <!-- /MAIL ROW 1 -->

        <!-- MAIL ROW 2 : MSG & ACTIONS -->
        <div class="flex w-full">
            <div class="flex items-center ml-0" v-if="mail.fixed === false">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-warning fill-current stroke-current'" @click.stop="toggleIsStarred"></feather-icon>
            </div>
          <div class="flex items-center ml-0" v-if="mail.fixed === true">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-primary fill-current stroke-current'" @click.stop="toggleIsStarred"></feather-icon>
            </div>
            <div class="mail__message truncate ml-3">
                <span>{{ mail.description | filter_tags }}</span>
            </div>
        </div>
        <!-- /MAIL ROW 2 -->
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
  }
}

</script>

