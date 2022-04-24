<template>
    <div class="email__email-sidebar h-full">
        <div class="m-6 clearfix">
            <vs-button class="bg-primary-gradient w-full" icon-pack="feather" icon="icon-edit" @click="activePrompt = true">Envoyer un ticket</vs-button>
        </div>

        <!-- compose email -->
        <vs-prompt
            class="email-compose"
            title="Nouveau tickets"
            accept-text= "Envoyer"
            cancel-text= "Annuler"
            @cancel="clearFields"
            @accept="sendMail"
            @close="clearFields"
            :is-valid="validateForm && validateForm1 && validateForm2"
            :active.sync="activePrompt">
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

                      <vs-select
                        v-validate="'required'"
                        autocomplete
                        v-model="category"
                        label="Categorie"
                        class="w-full mb-6"
                        name="category"
                        :danger="!validateForm1 && category !== ''"
                        val-icon-danger="clear"
                        :success="validateForm1"
                        val-icon-success="done"
                        :color="validateForm1 ? 'success' : 'danger'"
                       >
                        <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in categories" />
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

        <component :is="scrollbarTag" class="email-filter-scroll-area" :settings="settings" :key="$vs.rtl">
            <div class="px-6 pb-2 flex flex-col">

                <!-- inbox -->
                    <div class="flex items-center mb-2 cursor-pointer">
                        <feather-icon icon="FileTextIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'inbox'}, 'h-6 w-6']"></feather-icon>
                        <span class="text-lg ml-3">Tickets reçus</span>
                    </div>


                <!-- sent -->
                <router-link tag="span" :to="`${baseUrl}/##`" class="flex items-center mt-4 mb-2 cursor-pointer" :class="{'text-primary': mailFilter === 'sent'}">
                    <feather-icon icon="FileIcon" :svgClasses="[{'text-primary stroke-current': mailFilter === 'sent'}, 'h-6 w-6']"></feather-icon>
                    <span class="text-lg ml-3">Tickets traités</span>
                </router-link>
            </div>
            <vs-divider></vs-divider>
            <div class="email__labels px-6 py-4">
                <h5 class="mb-8">Catégories</h5>
                <div class="email__lables-list">
                    <router-link tag="span" class="email__label flex items-center mb-4 cursor-pointer" v-for="(tag, index) in emailTags" :key="index" :to="`${baseUrl}/${tag.value}`">
                        <div class="ml-1 h-3 w-3 rounded-full mr-4" :class="'border-2 border-solid border-' + tag.color"></div>
                        <span class="text-lg" :class="{'text-primary': mailFilter === tag.value}">{{ tag.text }}</span>
                    </router-link>
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
// const input_tempon = {
//   name: '',
//   description:''
// }
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
      mailTo: 'MOOZISTUDIO',
      categories:[],
      category: '',
      description: '',
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
    validateForm () {
      return !this.errors.any() && this.mailTo !== ''
    },
    validateForm1 () {
      return !this.errors.any() &&  this.description !== ''
    },
    validateForm2 () {
      return !this.errors.any()  && this.category !== ''
    },
    baseUrl () {
      const path = this.$route.path
      return path.slice(0, path.lastIndexOf('/'))
    },
    emailMeta () {
      return this.$store.state.email.meta
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    clearFields () {
      this.$nextTick(() => {
        this.mailTo = ''
        this.category = ''
        this.description = ''
      })
    },
    async sendMail () {
      this.$vs.loading()
      const input = JSON.parse(JSON.stringify(this.input))
      let url = 'companies/'
      let methods = 'post'
      const message = {
        error: 'Votre enrégistrement à échouer.',
        success: 'La compagnie est enrégistrée avec succès.'
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = 'La compagnie est modifiée avec succès.'
      }
      this.$http[methods](url, input)
        .then((response) => {
          window.Compagnies.getAllCompagny()
          window.getPrendTaCom.success(message.success, response)
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
    this.$http.get('categories/')
      .then((response) => { this.categories = response.data })
      .catch(() => { })
  }
}

</script>

