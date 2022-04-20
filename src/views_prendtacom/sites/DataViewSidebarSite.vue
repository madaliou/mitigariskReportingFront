
<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
      <h4>{{ Object.entries(this.data).length === 0 ? "AJOUTER UN" : "MODIFIER LE " }} SITE  </h4>
      <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>
      <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">

        <p class="pt-4">Région<b style="color: #ff6141" >*</b> </p>
        <vs-select
          v-model="region"
          autocomplete
          class="mt-5 w-full"
          name="region"
          v-validate="'required'">
          <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in regions" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('region')">{{ errors.first('region') }}</span>

        <p class="pt-4">Localité<b style="color: #ff6141" >*</b> </p>
        <vs-select
          v-model="input.localityNew"
          autocomplete
          class="mt-5 w-full"
          name="locality"
          v-validate="'required'">
          <vs-select-item :key="item" :value="item.id" :text="item.name" v-for="item in localityNews" />
        </vs-select>
        <span class="text-danger text-sm" v-show="errors.has('locality')">{{ errors.first('locality') }}</span>

        <p class="pt-4"> Nom du site <b style="color: #ff6141" >*</b> </p>
        <vs-input
          v-validate="'required'"
          data-vv-validate-on="blur"
          name="site"
          v-model="input.name"
          class="w-full" />
        <span class="text-danger text-sm" v-show="errors.has('site')">{{ errors.first('site') }}</span>


        <p class="pt-4"> Longitude<b style="color: #ff6141" ></b> </p>
        <vs-input
          type="number"
          class="w-full ml-0"
          v-model="input.longitude"
        />

        <p class="pt-4">Latitude<b style="color: #ff6141" ></b> </p>
        <vs-input
          type="number"
          class="w-full ml-0"
          v-model="input.latitude"
        />
        <p class="pt-4">Image(s)<b style="color: #ff6141" ></b> </p>
        <br>
        <vs-button color="success" icon-pack="feather" icon="icon-image" @click="Site_Image=true">Choisir</vs-button>
        <vs-popup title="Image(s)" :active.sync="Site_Image" class="items-no-padding">
          <input type="file" class="hidden" ref="updateImgInput1" @change="updateCurrImg1" multiple accept="image/*">
          <input type="file" class="hidden" ref="updateImgInput2" @change="updateCurrImg2" multiple accept="image/*">
          <div class="carousel-example" v-if="dataImg1.length">
            <swiper  :options="swiperOption" style="height: 300px !important;">
              <swiper-slide v-if="dataImg1"  v-for="(data, index) in dataImg1" :key="index + '458'">
                <vs-button
                  icon-pack="feather" icon="icon-trash" size="small" color="danger" @click="Delete_Image({id: data.id,key:index})">Supprimer
                </vs-button>
                <br>
                <img  style="height: 300px !important;" class="responsive" :src= " data.url != null ? $store.state.image_url+data.url : data" alt="banner">
              </swiper-slide>
              <div class="swiper-pagination" slot="pagination"></div>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
            </swiper>
          </div>
          <br>
          <div v-if="this.update_Image === true " class="flex flex-wrap justify-between mb-3">
          <vs-button  icon-pack="feather" icon="icon-image" @click="$refs.updateImgInput2.click()">Ajouter</vs-button>
          <vs-button icon-pack="feather" color="success" icon="icon-check" @click="Site_Image = false">Valider</vs-button>
          </div>
          <div v-if="this.update_Image === false" class="flex flex-wrap justify-between mb-3">
            <vs-button icon-pack="feather" icon="icon-image" @click="$refs.updateImgInput1.click()">Ajout Nouvel</vs-button>
            <vs-button icon-pack="feather" color="success" icon="icon-check" @click="Site_Image = false">Valider</vs-button>
          </div>
        </vs-popup>
      </div>
    </component>
    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="Prospect_validate">Soumettre</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Annuler</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>

import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { Validator } from 'vee-validate'

const dict = {
  custom: {
    site: {
      required: 'Le champ site est obligatoire'
    },
    locality: {
      required: 'Le champ localité est obligatoire'
    },
    region: {
      required: 'Le champ region est obligatoire'
    }

  }
}

// register custom messages
Validator.localize('en', dict)

import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const input_tempon = {
  name: '',
  localityNew:'',
  longitude:'',
  latitude:'',
  proofs:''
}

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    VuePerfectScrollbar,
    swiper,
    swiperSlide

  },
  data () {
    return {
      swiperOption: {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      localityNews:[],
      regions:[],
      region:'',
      datafiles:[],
      indexfiles:[],
      dataImg: [],
      AddNewdataImg_file: [],
      Site_Image:false,
      update_Image:true,
      dataImg1: [],
      dataImg1_delete: [],
      dataImg1_file: [],
      formDatafiles:new FormData(),
      input: JSON.parse(JSON.stringify(input_tempon)),
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    region (region) {
      this.localityNews = []
      this.$http.post('localityByRegion/', {region})
        .then((response) => {
          this.localityNews = response.data
          this.$vs.loading.close()
        })
        .catch(() => {
          this.$vs.loading.close()
        })

    },
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.update_Image = false
        this.region = ''
        this.dataImg1 = []
        this.dataImg1_delete = []
        this.AddNewdataImg_file = []
        this.$validator.reset()
      } else {
        this.update_Image = true
        this.region = ''
        this.dataImg1_delete = []
        this.AddNewdataImg_file = []
        this.dataImg1 = []
        this.input = JSON.parse(JSON.stringify(this.data))
        this.region = this.input.localityNew.regionNew.id
        this.input.localityNew = this.input.localityNew.id
        const length = this.data.siteNewProofs.length
        for (let i = 0; i < length; i++) {
          this.dataImg1.push(this.data.siteNewProofs[i])
        }
        this.initValues()
      }
    }
  },

  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  methods: {
    initValues () {
      if (this.data.id) return
      this.input = JSON.parse(JSON.stringify(input_tempon))
    },
    Prospect_validate () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.submitData()
        }
      })
    },
    async Delete_Image (data) {
      if (data.id) {
        this.dataImg1.splice(data.key, 1)
        this.dataImg1_delete.push(data.id)
      } else {
        this.dataImg1.splice(data.key, 1)
        this.dataImg1_file.splice(data.key, 1)
        this.AddNewdataImg_file.splice(data.key, 1)
      }
    },

    updateCurrImg1 (input) {
      if (input.target.files && input.target.files[0]) {
        const length = input.srcElement.files.length
        for (let i = 0; i < length; i++) {
          const reader = new FileReader()
          reader.onload = e => {
            // unshift
            this.dataImg1.unshift(e.target.result)
            this.dataImg1_file.unshift(this.$refs.updateImgInput1.files[i])

          }
          reader.readAsDataURL(input.target.files[i])
        }
      }
    },
    updateCurrImg2 (input) {
      if (input.target.files && input.target.files[0]) {
        const length = input.srcElement.files.length
        for (let i = 0; i < length; i++) {
          const reader = new FileReader()
          reader.onload = e => {
            // unshift
            this.dataImg1.unshift(e.target.result)
            this.AddNewdataImg_file.unshift(this.$refs.updateImgInput2.files[i])
          }
          reader.readAsDataURL(input.target.files[i])
        }
      }
    },

    async submitData () {
      const formdata = new FormData()
      this.$vs.loading()
      const input = JSON.parse(JSON.stringify(this.input))
      const keys = ['name', 'localityNew', 'longitude', 'latitude']
      const length = keys.length
      for (let j = 0; j < length; j++) {
        const item = keys[j]
        formdata.append(item, input[item])
      }
      //Ajout d'image
      if (this.dataImg1_file.length) {
        const length = this.dataImg1_file.length
        for (let i = 0; i < length; i++) {
          formdata.append('proofs', this.dataImg1_file[i],  this.dataImg1_file[i].name)
        }
      }
      //Ajout de nouvelle d'image
      let i = 0
      if (this.AddNewdataImg_file.length) {
        if (input.id) {
          const length = this.AddNewdataImg_file.length
          for (i = 0; i < length; i++) {
            formdata.append('pictures_add', this.AddNewdataImg_file[i], this.AddNewdataImg_file[i].name)
          }
        } else {
          formdata.append('pictures_add', '')
        }
      }
      //suppression d'image

      if (this.dataImg1_delete.length) {
        const length = this.dataImg1_delete.length
        for (i = 0; i < length; i++) {
          formdata.append('pictures_remove', this.dataImg1_delete[i])
        }
      } else {
        formdata.append('pictures_remove', '')
      }

      let url = 'sitesNew/'
      let methods = 'post'
      const message = {
        error: 'Votre enregistrement à échouer.',
        success: 'le site est enrégistré avec succès.'
      }
      if (input.id) {
        url += `${input.id}/`
        methods = 'put'
        message.success = 'Le site est modifié avec succès.'

      }

      this.$http[methods](url, formdata)
        .then((response) => {
          window.getProspect.getAllMembers()
          this.dataImg1 = []
          window.getPrendTaCom.success(message.success, response)
          this.$emit('closeSidebar')
          this.dataImg1 = []
          this.dataImg1_delete = []
          this.initValues()
        })
        .catch((error) => {
          const clefs = Object.keys(error.response.data)
          for (let i = 0; i < clefs.length; i++) {
            const item = clefs[i]
            let libelle = ''
            if (item === 'name') {
              libelle = 'Site'
            }

            for (let j = 0; j < error.response.data[item].length; j++) {
              window.getPrendTaCom.error(`${libelle} :  ${error.response.data[item][j]}`)
            }
          }
          window.getPrendTaCom.error(message.error)
        })
    }
  },

  async created () {
    // this.$http.get('localitiesNew/')
    //   .then((response) => {
    //     this.localityNews = response.data
    //   })
    this.$http.get('regionsNew/')
      .then((response) => {
        this.regions = response.data
      })
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-²-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
  // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
  height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

  &:not(.ps) {
    overflow-y: auto;
  }
}
</style>
