<template functional>
  <vx-card class="px-4" :class="data.staticClass">
    <!-- MAIL HEAD -->
    <div class="vx-row">
      <div class="vx-col w-full border-b border-l-0 border-r-0 border-t-0 d-theme-border-grey-light border-solid flex justify-between flex items-center">
        <!-- Sender Details -->
        <div class="flex items-center">
          <div>
            <vs-avatar class="sender__avatar--single flex-shrink-0 mr-3 border-2 border-solid border-white" size="65px" />
          </div>
          <div class="flex flex-col">
            <h5 class="mb-1">{{ props.mailContent.author.last_name +" "}}{{ props.mailContent.author.first_name}}</h5>
            <div class="flex items-center">
              <span class="text-sm">{{ props.mailContent.author.email }}</span>
            </div>
          </div>
        </div>
        <!-- /Sender Details -->

        <!-- Mail Time & Date -->
        <div class="flex flex-col justify-end">
          <span class="text-right">{{ props.mailContent.created_at | time }}</span>
          <div class="flex justify-end mt-2">
            <span class="text-right">{{ props.mailContent.created_at| date }}</span>
          </div>
        </div>
      </div>
      <!-- /Mail Time & Date -->
    </div>

    <!-- MAIL CONTENT -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mail__content break-words mt-8 mb-4" v-html="props.mailContent.description"></div>
      </div>
    </div>

  </vx-card>
</template>

<script>
export default {
  props: {
    mailContent: {
      type: Object,
      required: true
    }
  }
}
</script>
