<template>
    <div class="email__email-sidebar h-full">
      <div v-if="showByAdmin===false">
        <div  class="m-6 clearfix">
            <vs-button class="bg-primary-gradient w-full" icon-pack="feather" icon="icon-edit" @click="activePrompt = true">{{ $t("Créer_un_ticket") }}</vs-button>
        </div>
      </div>
        <!-- compose email -->
        <vs-prompt
            class="email-compose"
            :title="this.$t('Créer_un_ticket')"
            :accept-text= "this.$t('Envoyer')"
            :cancel-text= "this.$t('Annuler')"
            @cancel="clearFields"
            @accept="sendMail"
            @close="clearFields"
            :is-valid="validateForm && validateForm1 && validateForm2 && validateForm3"
            :active.sync="activePrompt">
                <component :is="scrollbarTag" class="scroll-area p-4" :settings="settings" :key="$vs.rtl">
                    <form @submit.prevent>
                        <vs-input disabled="true"
                                  v-validate="'required'"
                                  name="mailTo"
                                  :label-placeholder="this.$t('Destinataire')"
                                  v-model="mailTo"
                                  class="w-full mb-6"
                                  :danger="!validateForm || mailTo !== ''"
                                  val-icon-danger="clear"
                                  :success="validateForm"
                                  val-icon-success="done"
                                  :color="validateForm ? 'success' : 'danger'" />

                      <vs-select

                        v-validate="'required'"
                        autocomplete
                        v-model="category"
                        :label="this.$t('incident')"
                        class="w-full mb-6"
                        name="category"
                        :danger="!validateForm1 || category !== ''"
                        val-icon-danger="clear"
                        :success="validateForm1"
                        val-icon-success="done"
                        :color="validateForm1 ? 'success' : 'danger'"
                       >
                        <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in categories" />
                      </vs-select>
                      <vs-select

                        v-validate="'required'"
                        autocomplete
                        v-model="solution"
                        :label="this.$t('Solution')"
                        class="w-full mb-6"
                        name="solution"
                        :danger="!validateForm1 || category !== '' || solution ===''"
                        val-icon-danger="clear"
                        :success="validateForm1"
                        val-icon-success="done"
                        :color="validateForm1 ? 'success' : 'danger'"
                       >
                        <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in solutions" />
                      </vs-select>

                        <quill-editor
                          v-model="description"
                          v-validate="'required'"
                          :options="editorOption"
                          :danger="!validateForm2 && description !== ''"
                          val-icon-danger="clear"
                          :success="validateForm2"
                          val-icon-success="done"
                          :color="validateForm2 ? 'success' : 'danger'"
                        />
                    </form>
                </component>
        </vs-prompt>
      <br v-if="showByAdmin===true">
        <component :is="scrollbarTag" class="email-filter-scroll-area" :settings="settings" :key="$vs.rtl">
            <div class="px-6 pb-2 flex flex-col">

                <!-- inbox -->

              <div v-if="showByAdmin===true" class="flex items-center mb-2 cursor-pointer" @click="All_tickets()">
                  <feather-icon icon="FileTextIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'inbox'}, 'h-6 w-6']"></feather-icon>
                  <span class="text-lg ml-3">{{ $t("Reportings totaux") }}</span>
              </div>

              <div v-if="showByAdmin===false" class="flex items-center mb-2 cursor-pointer" @click="All_tickets()">
                  <feather-icon icon="FileTextIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'inbox'}, 'h-6 w-6']"></feather-icon>
                  <span class="text-lg ml-3">{{ $t("Reportings") }}</span>
              </div>

              <!-- inbox -->
              <div v-if="this.showByAdmin" class="flex items-center mb-2 mt-4 cursor-pointer" @click="tickets_traite()">
                <feather-icon icon="FileIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'sent'}, 'h-6 w-6']"></feather-icon>
                <span class="text-lg ml-3">{{ $t("Reportings traités") }}</span>
              </div>

              <div v-if="this.showByAdmin" class="flex items-center mb-2 mt-4 cursor-pointer" @click="tickets_Encours()">
                <feather-icon icon="FilePlusIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'sent'}, 'h-6 w-6']"></feather-icon>
                <span class="text-lg ml-3">{{ $t("Reportings en cours") }}</span>
              </div>


              <div v-if="this.showByAdmin" class="flex items-center mb-2 mt-4 cursor-pointer" @click="tickets_non_traite()">
                        <feather-icon icon="FileMinusIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'inbox'}, 'h-6 w-6']"></feather-icon>
                        <span class="text-lg ml-3">{{ $t("Reportings non traités") }}</span>
              </div>


              <div class="flex items-center mb-2 mt-4 cursor-pointer" @click="All_message()">
                    <feather-icon icon="MailIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'sent'}, 'h-6 w-6']"></feather-icon>
                    <span class="text-lg ml-3">{{ $t("Messages") }}</span>
              </div>

            </div>
            <vs-divider></vs-divider>
            <div class="email__labels px-6 py-4">
                <h5 class="mb-8">{{ $t("Catégories") }}</h5>
                <div class="email__lables-list">
                    <div tag="span" class="email__label flex items-center mb-4 cursor-pointer" v-for="(tag, index) in emailTags" :key="index">
                        <div class="ml-1 h-3 w-3 rounded-full mr-4 border-2 border-solid border-primary" ></div>
                        <span class="text-lg" :class="{'text-primary': mailFilter === tag.value}">{{ tag.name }}</span>
                    </div>
                </div>
            </div>
        </component>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import { quillEditor } from 'vue-quill-editor'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import moduleEmail         from '@/store/ticket/moduleEmail.js'

export default {
  props: {
    emailTags: {
      type: Array,
      required: true
    },
    mailFilter: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      activePrompt: false,
      showByAdmin: false,
      mailTo: 'MOOZISTUDIO',
      categories:[],
      solutions:[],
      solution:'',
      category: '',
      description: '',
      HeaderName: 'Tickets totaux',
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
      },
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.30
      }
    }
  },
  computed: {
    baseUrl () {
      const path = this.$route.path
      return path.slice(0, path.lastIndexOf('tickets'))
    },
    validateForm () {
      return !this.errors.any() && this.mailTo !== ''
    },
    validateForm1 () {
      return !this.errors.any() &&  this.description !== ''
    },
    validateForm2 () {
      return !this.errors.any()  && this.category !== ''
    },
    validateForm3 () {
      return !this.errors.any()  && this.solution !== ''
    },
    emailMeta () {
      return this.$store.state.email.meta
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    clearFields () {
      this.$nextTick(() => {
        this.category = ''
        this.description = ''
      })
    },
    All_tickets () {
      this.openLoading()
      this.HeaderName = 'TICKETS TOTAUX'
      window.getCloseSidebar.closeMailViewSidebar()
      this.$store.dispatch('email/fetchEmails')
    },
    tickets_non_traite () {
      this.openLoading()
      this.HeaderName = 'TICKETS NON TRAITÉS'
      window.getCloseSidebar.closeMailViewSidebar()
      this.$store.dispatch('email/tickets_non_traite')
    },
    tickets_traite () {
      this.openLoading()
      this.HeaderName = 'TICKETS TRAITÉS'
      window.getCloseSidebar.closeMailViewSidebar()
      this.$store.dispatch('email/tickets_traite')
    },
    tickets_Encours () {
      this.openLoading()
      this.HeaderName = 'TICKETS ENCOURS'
      window.getCloseSidebar.closeMailViewSidebar()
      this.$store.dispatch('email/tickets_Encours')
    },
    All_message () {
      this.openLoading()
      this.HeaderName = 'MESSAGES'
      window.getCloseSidebar.closeMailViewSidebar()
      this.$router.push('/messages').catch(() => {})
    },
    HeaderNAme () {
      return this.HeaderName
    },
    openLoading () {
      this.$vs.loading()
      setTimeout(() => {
        this.$vs.loading.close()
      }, 1000)
    },
    async sendMail () {
      this.$vs.loading()
      const input = {
        description:this.description,
        category:this.category,
        solution:this.solution
      }
      let url = 'tickets/'
      let methods = 'post'
      const message = {
        error: this.$t('ticket_error'),
        success: this.$t('ticket_succes')
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = 'La ticket est modifié avec succès.'
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.getPrendTaCom.success(message.success, response)
          this.$store.dispatch('email/fetchEmails')
          this.clearFields()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'category') {
              libelle = 'categorie'
            }
            if (item === 'description') {
              libelle = 'description'
            }
            if (item === 'solution') {
              libelle = 'solution'
            }
            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }
          window.getPrendTaCom.error(message.error)
        })

    }
  },
  components: {
    quillEditor,
    VuePerfectScrollbar
  },
  async created () {
    this.$store.registerModule('email', moduleEmail)
    window.getHeaderSidebar = this
    const user_role = JSON.parse(localStorage.getItem('userInfo')).role
    if (user_role === 'admin') {
      this.showByAdmin = true
    }
    this.$http.get('categories/')
      .then((response) => { this.categories = response.data }).catch(() => { })

    this.$http.get('types/')
      .then((response) => { this.solutions = response.data }).catch(() => {})
  }
}

</script>

