<template>
  <div>
    
    {{this.user}}
    

    
  </div>
</template>

<script>
export default {
  components: {
  },
  name: 'profile',
  data () {
    return {
      user : {},
      users : [],
    }
  },
  created() {
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    this.getUserData()
  },
  mounted(){
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    this.getUserData()
  },
  methods: {
   getUserData:function(){
      var i = 0;
      var found = false;
      while (!found && i < this.users.length ) {
        if(this.$route.params.id == this.users[i].id){
          this.user = this.users[i]
          found = true
        }
      }     
   },
  }
}
</script>

<style>

</style>