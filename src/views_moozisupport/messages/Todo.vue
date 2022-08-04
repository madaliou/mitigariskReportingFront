<!-- =========================================================================================
  File Name: Todo.vue
  Description: Todo Application to keep you ahead of time
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <fragment>
  <h1>{{ $t("messages") }}</h1>
  <br>
  <div id="email-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <component :is="scrollbarTag" class="email-content-scroll-area" :settings="settings" ref="mailListPS" :key="$vs.rtl">
      <transition-group name="list-enter-up" class="email__mails" tag="ul" appear>
        <li class="cursor-pointer email__mail-item"
            v-for="(task, index) in taskList"
            :key="task.id"
            :style="[{transitionDelay: (index * 0.1) + 's'}]">
          <todo-task :taskId="task.id" :key="task.id" />
        </li>
      </transition-group>
    </component>
  </div>
  </fragment>
</template>

<script>
import moduleTodo          from '@/store/message/moduleTodo.js'
import TodoTask            from './TodoTask.vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  data () {
    return {
      currFilter           : '',
      clickNotClose        : true,
      displayPrompt        : false,
      taskIdToEdit         : 0,
      isSidebarActive      : true,
      settings : {
        maxScrollbarLength : 60,
        wheelSpeed         : 0.30
      }
    }
  },
  watch: {
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  computed: {
    taskList ()     { return this.$store.state.message.tasks },
    scrollbarTag () { return this.$store.getters.scrollbarTag              },
    windowWidth ()  { return this.$store.state.windowWidth                 }
  },
  methods: {
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isSidebarActive = this.clickNotClose = false
      } else {
        this.isSidebarActive = this.clickNotClose = true
      }
    },
    openLoading () {
      this.$vs.loading()
      setTimeout(() => {
        this.$vs.loading.close()
      }, 1000)
    },
    toggleTodoSidebar (value = false) {
      if (!value && this.clickNotClose) return
      this.isSidebarActive = value
    },
    callMessage () {
      this.$store.dispatch('message/fetchMessage')
    }
  },
  components: {
    TodoTask,
    VuePerfectScrollbar
  },
  created () {
    window.getAllMessage = this
    this.$store.registerModule('message', moduleTodo)
    this.openLoading()
    this.setSidebarWidth()
    this.callMessage()

  }

}

</script>

<style lang="scss">
@import "@/assets/scss/vuexy/apps/todo.scss";
</style>
