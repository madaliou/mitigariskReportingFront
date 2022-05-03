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
                    <h5 class="mb-1">{{ mail.author.last_name +" "}}{{ mail.author.first_name}}</h5>
                    <span v-if="mail.category.name">{{ mail.category.name }}</span>
                    <span v-else>(no subject)</span>
                </div>

                <div class="mail-item__meta flex items-center">
                    <span>{{ mail.created_at | moment }}</span>
                </div>
            </div>
        </div>

        <div class="flex w-full">
            <div class="flex items-center ml-0" v-if="mail.fixed === false">
              <vx-tooltip text="Non traité" color="warning">
                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="'text-warning fill-current stroke-current'" ></feather-icon>
              </vx-tooltip>
            </div>

          <div class="flex items-center ml-0" v-if="mail.fixed === true">
            <vx-tooltip text="Traité" color="primary">
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

