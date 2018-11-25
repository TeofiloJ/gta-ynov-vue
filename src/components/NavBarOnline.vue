<template>

<b-navbar toggleable="md" type="dark" variant="dark">

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">Gta-Ynov-vue</b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item :to="'/planning'">Planning</b-nav-item>
      <b-nav-item v-if="this.$session.get('user').status != 'collaborateur'" :to="'/dashboard'">Dashboard</b-nav-item>
      <b-nav-item :to="'/account'">Account</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-text class="hide" v-if="this.$session.get('user').status == 'administrateur'"><b-badge variant="warning">Administrateur</b-badge></b-nav-text>
      <b-nav-text class="hide" v-else-if="this.$session.get('user').status == 'responsable'"><b-badge variant="success">Responsable</b-badge></b-nav-text>
      <b-nav-text class="hide" v-else><b-badge variant="info">Collaborateur</b-badge></b-nav-text>
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          <em>{{this.$session.get('user').firstname}}</em>
        </template>
        <b-dropdown-item :to="'/profile/'+ this.$session.get('user').id">Profile</b-dropdown-item>
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
      this.$session.destroy()
      this.$router.push('/')      
    },
  },
  props: {
  }

};
</script>

<style>

@media only screen and (max-width: 576px) { 
  .hide { 
    display: none; 
  } 
}


</style>


