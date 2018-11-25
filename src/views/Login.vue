<template>
    
    <b-container>
        <b-row align-v="center" align-h="center">
            <div class="col-md-5 login m-3">
                <p>Login</p>
                <form class="mb-2" action="">
                    <b-form-input type="email" name="email" id="email" placeholder="email" v-model="formEmail"></b-form-input>
                    <b-form-input type="password" name="password" id="password" placeholder="password" v-model="formPassword"></b-form-input>
                    <b-btn v-on:click="login">Login</b-btn>
                </form>
                {{errorMessage}}
            </div>
        </b-row>
    </b-container>
    
</template>

<script>

export default {
  components: {
  },
  name: 'login',
  data () {
    return {
        formEmail : "teofilo.jeandot@ynov.com",
        formPassword : "bloup",
        errorMessage : "",
        users: []
    }
  },
  created(){
      if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
  },
  mounted(){
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
  },
  methods: {
    // Auth
    login:function(){
        this.errorMessage = ""
      var found = false
      var i = 0
      while(i < this.users.length && !found){
          if(this.users[i].mail == this.formEmail && this.users[i].password == this.formPassword){      
            found = true
          }else{

            i++
          }        
      }
      if (found){
        this.$session.start()
        this.$session.set('user',this.users[i])
        this.$router.push('/account')      
      }else{
          this.errorMessage = "False email or password"
      }
          
    }
  }
}
</script>

<style>

p{
    font-size: 25px;
}

.login{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

</style>
