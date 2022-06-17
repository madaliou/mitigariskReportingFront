<!-- =========================================================================================
    File Name: TodoItem.vue
    Description: Single todo item component
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <div  @click.passive="viewMessage(taskLocal.id,taskLocal.read)" class="mail__mail-item sm:px-4 px-2 py-6">
    <!-- MAIL ROW 1 : META -->
    <div  class="flex w-full">
      <vs-avatar class="sender__avatar flex-shrink-0 mr-3 border-2 border-solid border-white"  size="40px"></vs-avatar>
      <div class="flex w-full justify-between items-start">
        <div class="mail__details">
          <h5 v-if="showByAdmin=== true" class="mb-1">{{ taskLocal.ticket.author.last_name +" "}}{{ taskLocal.ticket.author.first_name}}</h5>
          <h5 v-if="showByAdmin=== false" class="mb-1">MOOZISUPPORT</h5>
          <span v-if="showByAdmin=== true" style="color: blue " class="mb-4" > {{ taskLocal.ticket.author.company != null ? taskLocal.ticket.author.company.name  : 'MOOZISTUDIO'}}</span>
          <span v-if="showByAdmin=== false" style="color: blue " class="mb-1" >{{ taskLocal.ticket != null ? taskLocal.ticket.reference : 'MOOZISTUDIO'}}</span>
          <span v-if="showByAdmin===true" class="text-sm"> <b>-></b></span>
          <span  v-if="showByAdmin===true" style="color: black" class="mb-4"><b>{{taskLocal.ticket.solution.name}}</b></span>
          <br v-if="showByAdmin=== false">
          <span v-if="showByAdmin=== false" style="color: black" class="mb-4"><b>{{taskLocal.ticket.solution.name}}</b></span>
          <br>
          <span v-if="taskLocal.ticket.category.name">{{ taskLocal.ticket.category.name }}</span>
          <span v-else>{{ taskLocal.ticket.category.name }}</span>
        </div>

        <div class="mail-item__meta sm:ml-2 sm:my-0 my-2 flex">
          <vs-chip class="mr-4">
            <div class="h-2 w-2 rounded-full mr-2 bg-primary"></div>
            <span>{{ taskLocal.created_at | date_time }}</span>
          </vs-chip>

          <vx-tooltip v-if="showByAdmin ===false" text="voir" color="success">
          <feather-icon
              icon="EyeIcon"
              class="cursor-pointer"
              :svgClasses="['text-success stroke-current', 'w-5', 'h-5 mr-4']"
              @click.passive="viewMessage(taskLocal.id,taskLocal.read)" />
          </vx-tooltip>

          <vx-tooltip v-if="showByAdmin ===true" text="voir" color="success">
          <feather-icon
              icon="EyeIcon"
              class="cursor-pointer"
              :svgClasses="['text-success stroke-current', 'w-5', 'h-5 mr-4']"
              @click.passive="viewMessage()" />
          </vx-tooltip>
<!--          <vx-tooltip  text="Actualiser" color="primary">-->
<!--          <feather-icon-->
<!--              icon="RefreshCwIcon"-->
<!--              class="cursor-pointer"-->
<!--              :svgClasses="['text-primary stroke-current', 'w-5', 'h-5 mr-4']"-->
<!--              @click="actualisation()" />-->
<!--          </vx-tooltip>-->

<!--          <vx-tooltip text="Message" color="primary">-->
<!--          <feather-icon-->
<!--              icon="MailIcon"-->
<!--              class="cursor-pointer"-->
<!--              :svgClasses="['text-primary stroke-current', 'w-5', 'h-5 mr-4']"-->
<!--              @click.stop="toggleIsStarred" />-->
<!--          </vx-tooltip>-->

<!--          <vx-tooltip text="Editer" color="warning">-->
<!--          <feather-icon-->
<!--              icon="EditIcon"-->
<!--              class="cursor-pointer"-->
<!--              :svgClasses="['text-warning stroke-current', 'w-5', 'h-5 mr-4']"-->
<!--              @click.stop="EditMessage(taskLocal)" />-->
<!--          </vx-tooltip>-->

<!--          <vx-tooltip text="Supprimer" color="danger">-->
<!--          <feather-icon-->
<!--              icon="TrashIcon"-->
<!--              class="cursor-pointer"-->
<!--              svgClasses="text-danger stroke-current w-5 h-5"-->
<!--              @click.stop="removeMessage(taskLocal.id)" />-->
<!--          </vx-tooltip>-->

          <vx-tooltip text="Actualiser" color="primary">
          <feather-icon
              icon="RefreshCwIcon"
              class="cursor-pointer"
              svgClasses="text-primary stroke-current w-5 h-5"
              @click="actualisation()" />
          </vx-tooltip>

        </div>

      </div>
    </div>
    <div class="flex w-full">
      <div class="flex items-center ml-0" v-if="taskLocal.read === false">
        <vx-tooltip text="Non lu" color="danger">
        <feather-icon icon="PlusCircleIcon" class="cursor-pointer" :svgClasses="'text-danger fill-current stroke-current'"></feather-icon>
        </vx-tooltip>
      </div>
      <div class="flex items-center ml-0" v-if="taskLocal.read === true">
        <vx-tooltip text="Lu" color="success">
        <feather-icon icon="PlusCircleIcon" class="cursor-pointer" :svgClasses="'text-success fill-current stroke-current'" ></feather-icon>
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
                <h5 v-if="showByAdmin=== true" class="mb-1">{{ taskLocal.ticket.author.last_name +" "}}{{ taskLocal.ticket.author.first_name}}</h5>
                <h5 v-if="showByAdmin=== false" class="mb-1">MOOZISUPPORT</h5>
                <div class="open-mail-label flex items-center mr-4">
                  <span v-if="showByAdmin=== true" style="color: blue " class="mb-1" >{{ taskLocal.ticket.author.company != null ? taskLocal.ticket.author.company.name  : 'MOOZISTUDIO'}}</span>
                  <span v-if="showByAdmin===true" class="mb-2"> <b>-></b></span>
                  <span  v-if="showByAdmin===true" style="color: black" class="mb-1"><b>{{taskLocal.ticket.solution.name}}</b></span>
                </div>
                <span v-if="showByAdmin=== false" style="color: blue " class="mb-1" >{{ taskLocal.ticket != null ? taskLocal.ticket.reference : 'MOOZISTUDIO'}}</span>
                <span v-if="showByAdmin=== true" style="color: red " class="mb-1" >{{ taskLocal.ticket != null ? taskLocal.ticket.reference : 'MOOZISTUDIO'}}</span>
                <span  v-if="showByAdmin===false" style="color: black"><b>{{taskLocal.ticket.solution.name}}</b></span>
                <span v-if="taskLocal.ticket.category.name">{{ taskLocal.ticket.category.name }}</span>
                <span v-else>(no subject)</span>
              </div>
            </div>
            <!-- /Sender Details -->

            <!-- Mail Time & Date -->
            <div class="flex flex-col justify-end">
              <span class="text-right">{{ taskLocal.created_at | time2 }}</span>
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
<!--    <h1>pour editer le message reçu</h1>-->
    <vs-prompt
        class="email-compose"
        title="Modifier le message"
        accept-text= "Modifier"
        cancel-text= "Annuler"
        @cancel="clearMessage"
        @accept="EditFunction"
        @close="clearMessage"
        :is-valid="validateForm && validateForm1"
        :active.sync="activePrompt1">
      <component :is="scrollbarTag" class="scroll-area p-4" :settings="settings" :key="$vs.rtl">
        <form @submit.prevent>
          <vs-input disabled="true"
                    v-validate="'required'"
                    name="mailTo"
                    label-placeholder="Destinataire"
                    v-model="mailTo"
                    class="w-full mb-6"
                    :danger="!validateForm && mailTo !== ''"
                    val-icon-danger="clear"
                    :success="validateForm"
                    val-icon-success="done"
                    :color="validateForm ? 'success' : 'danger'" />
          <quill-editor
              v-model="message"
              name="message"
              v-validate="'required'"
              :options="editorOption"
              :danger="!message"
              val-icon-danger="clear"
              :success="!message"
              val-icon-success="done"
              :color="!message ? 'success' : 'danger'"
          />
        </form>
      </component>
    </vs-prompt>
  </div>

</template>

<script>
import moduleTodo  from '@/store/message/moduleTodo.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

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
      activePrompt: false,
      activePrompt1: false,
      showByAdmin: false,
      settings             : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      },
      mailTo: 'MOOZISTUDIO',
      ticket: '',
      message: '',
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'font': [] }]
          ]
        },
        placeholder: 'Message'
      }
    }
  },
  components:{
    quillEditor,
    VuePerfectScrollbar
  },
  computed: {
    validateForm () {
      return !this.errors.any() && this.mailTo !== ''
    },
    validateForm1 () {
      return !this.errors.any() &&  this.message !== ''
    },
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
    viewMessage (id, read) {
      this.activePrompt = true
      if (read === false && this.showByAdmin === false) {
        this.$store.dispatch('message/ReadMessage', id)
      }
    },
    // read_Mail (id, read) {
    //   if (read === false && this.showByAdmin === false) {
    //     this.$store.dispatch('message/ReadMessage', id)
    //   }
    // },
    EditMessage (message) {
      this.ticket = message.ticket.id
      this.message = message.message
      this.activePrompt1 = true
    },

    clearMessage () {
      this.$nextTick(() => {
        this.ticket = ''
        this.message = ''
      })
    },
    actualisation () {
      window.getAllMessage.openLoading()
      window.getAllMessage.callMessage()
    },
    async EditFunction () {
      this.$vs.loading()
      const input = {
        message:this.message,
        ticket:this.ticket
      }
      let url = 'replies/'
      let methods = 'post'
      const message = {
        error: 'Votre message à échouer.',
        success: 'Le message est envoyé avec succès.'
      }
      if (input.ticket) {
        url += `${input.ticket}/`
        methods = 'put'
        message.success = 'Le message est modifié avec succès.'
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.getPrendTaCom.success(message.success, response)
          this.$store.dispatch('message/fetchMessage')
          this.clearMessage()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'ticket') {
              libelle = 'Ticket'
            }
            if (item === 'message') {
              libelle = 'Message'
            }
            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }
          window.getPrendTaCom.error(message.error)
        })
    }
  },
  created () {
    this.$store.registerModule('message', moduleTodo)
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.showByAdmin = true
    }
  }
}
</script>
