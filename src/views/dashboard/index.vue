<template>
  <div class="dashboard-container">
    <component :is="currentRole"/>
    <hoodle/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import hoodle from './pop/hoodle'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, hoodle },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
