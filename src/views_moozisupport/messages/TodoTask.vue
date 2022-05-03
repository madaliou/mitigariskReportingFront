<!-- =========================================================================================
    File Name: TodoItem.vue
    Description: Single todo item component
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
          <h5 class="mb-1">{{ taskLocal.ticket.author.last_name +" "}}{{ taskLocal.ticket.author.first_name}}</h5>
          <span style="color: blue " class="mb-1" > {{ taskLocal.ticket.author.company != null ? taskLocal.ticket.author.company.name  : 'MOOZISTUDIO'}}</span>
          <br>
          <span v-if="taskLocal.ticket.category.name">{{ taskLocal.ticket.category.name }}</span>
          <span v-else>(no subject)</span>
        </div>

        <div class="mail-item__meta sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip class="mr-4">
            <div class="h-2 w-2 rounded-full mr-2 bg-primary"></div>
            <span>{{ taskLocal.created_at | moment }}</span>
          </vs-chip>

          <vx-tooltip text="voir" color="success">
          <feather-icon
              icon="EyeIcon"
              class="cursor-pointer"
              :svgClasses="['text-success stroke-current', 'w-5', 'h-5 mr-4']"
              @click.stop="viewMessage()" />
          </vx-tooltip>

          <vx-tooltip text="Message" color="primary">
          <feather-icon
              icon="MailIcon"
              class="cursor-pointer"
              :svgClasses="['text-primary stroke-current', 'w-5', 'h-5 mr-4']"
              @click.stop="toggleIsStarred" />
          </vx-tooltip>

          <vx-tooltip text="Editer" color="warning">
          <feather-icon
              icon="EditIcon"
              class="cursor-pointer"
              :svgClasses="['text-warning stroke-current', 'w-5', 'h-5 mr-4']"
              @click.stop="toggleIsStarred" />
          </vx-tooltip>

          <vx-tooltip text="Supprimer" color="danger">
          <feather-icon
              icon="TrashIcon"
              class="cursor-pointer"
              svgClasses="text-danger stroke-current w-5 h-5"
              @click.stop="removeMessage(taskLocal.id)" />
          </vx-tooltip>

        </div>

      </div>
    </div>
    <div class="flex w-full">
      <div class="flex items-center ml-0" v-if="taskLocal.read === false">
        <vx-tooltip text="Non lu" color="danger">
        <feather-icon icon="UserXIcon" class="cursor-pointer" :svgClasses="'text-danger fill-current stroke-current'"></feather-icon>
        </vx-tooltip>
      </div>
      <div class="flex items-center ml-0" v-if="taskLocal.read === true">
        <vx-tooltip text="Non lu" color="success">
        <feather-icon icon="UserCheckIcon" class="cursor-pointer" :svgClasses="'text-success fill-current stroke-current'" ></feather-icon>
        </vx-tooltip>
      </div>
      <div class="mail__message truncate ml-3">
        <span>{{ taskLocal.message | filter_tags }}</span>
      </div>
    </div>
<!--    <h1>pour lire le message reçu</h1>-->
    <vs-popup
       title="Message"
        :active.sync="activePrompt">
      <vx-card class="px-4" >
        <!-- MAIL HEAD -->
        <div class="vx-row">
          <div class="vx-col w-full border-b border-l-0 border-r-0 border-t-0 d-theme-border-grey-light border-solid flex justify-between flex items-center">
            <!-- Sender Details -->
            <div class="flex items-center">
              <div>
                <vs-avatar class="sender__avatar--single flex-shrink-0 mr-3 border-2 border-solid border-white" size="65px" />
              </div>
              <div class="flex flex-col">
                <h5 class="mb-1">{{ taskLocal.ticket.author.last_name +" "}}{{ taskLocal.ticket.author.first_name}}</h5>
                <span style="color: blue " class="mb-1" > {{ taskLocal.ticket.author.company != null ? taskLocal.ticket.author.company.name  : 'MOOZISTUDIO'}}</span>
                <span v-if="taskLocal.ticket.category.name">{{ taskLocal.ticket.category.name }}</span>
                <span v-else>(no subject)</span>
              </div>
            </div>
            <!-- /Sender Details -->

            <!-- Mail Time & Date -->
            <div class="flex flex-col justify-end">
              <span class="text-right">{{ taskLocal.created_at | time }}</span>
              <div class="flex justify-end mt-2" v-if="taskLocal.read === false">
                <div class="open-mail-label flex items-center ">
                  <div class="h-3 w-3  rounded-full bg-danger mr-2" ></div>
                  <span class="text-right" >Non lu</span>
                </div>
              </div>
              <div class="flex justify-end mt-2" v-if="taskLocal.read === true">
                <div class="open-mail-label flex items-center ">

                  <div class="h-3 w-3  rounded-full bg-success mr-2" ></div>
                  <span class="text-right" >Lu</span>
                </div>
              </div>

              <div class="flex justify-end mt-2">
                <span class="text-right">{{  taskLocal.created_at| moment }}</span>
              </div>
            </div>
          </div>
          <!-- /Mail Time & Date -->
        </div>

        <!-- MAIL CONTENT -->
        <div class="vx-row">
          <div class="vx-col w-full">
            <div class="mail__content break-words mt-8 mb-4" v-html="taskLocal.message"></div>
          </div>

        </div>
      </vx-card>

    </vs-popup>
  </div>
</template>

<script>
import moduleTodo  from '@/store/message/moduleTodo.js'

export default{
  props: {
    taskId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      taskLocal: this.$store.getters['message/getTask'](this.taskId),
      activePrompt: false
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    openLoading () {
      this.$vs.loading()
      setTimeout(() => {
        this.$vs.loading.close()
      }, 1000)
    },
    removeMessage (id) {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmation',
        text: 'Confirmer la suppression?',
        acceptText: 'Confirmer',
        cancelText: 'Annuler',
        accept: async () => {
          this.$vs.loading()
          this.$http.delete(`replies/${id}/`)
            .then(response => {
              this.openLoading()
              window.getPrendTaCom.success('Message supprimer avec succès.', response)
              this.$store.dispatch('message/fetchMessage')
            })
            .catch(() => {
              window.getPrendTaCom.error({ message: 'La suppression du message a échoué.' })
            })
        }
      })
    },
    viewMessage () {
      this.activePrompt = true
    }
  },
  created () {
    this.$store.registerModule('message', moduleTodo)
  }
}
</script>
