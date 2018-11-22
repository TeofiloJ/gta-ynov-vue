<template>

<b-navbar toggleable="md" type="light" variant="light">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Gta-Ynov-vue</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item :to="'/planning'"></router-link>Planning</b-nav-item>
      <b-nav-item :to="'/dashboard'">Dashboard</b-nav-item>
      <b-nav-item :to="'/administration'" v-if="session.user.role == 'drh'">Administration</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{session.user.firstname}}</em>
        </template>
        <b-dropdown-item :to="'/profile'">Profile</b-dropdown-item>
        <b-dropdown-item v-on:click="logout" >Signout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

</template>

<script>



export default {
  components: {},
  data() {
    return {};
  },
  methods:{
    logout:function(){
        localStorage.removeItem('session');
        this.$router.push('/')        
    },
  },
  props: {
    session: {
      type: Object,
      required: true
    }
  }

};
</script>

