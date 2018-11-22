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

const users = [
  {
    id : 1,
    name : "jeandot",
    firstname : "teofilo",
    password : "bloup",
    mail : "teofilo.jeandot@ynov.com",
    address : "Nantes",
    birthDate : "1996/02/23",
    phone : "06 06 06 06 06",
    contract : {
      beginning : "2018/09/01",
      end : "2018/12/31",
      vacancyLeft : "23"
    },
    status : "salarié"
  },
   {
    id : 2,
    name : "bar",
    firstname : "foo",
    password : "bloup",
    mail : "foo.bar@ynov.com",
    address : "Nantes",
    birthDate : "1996/02/23",
    phone : "06 06 06 06 06",
    contract : {
      beginning : "2018/09/01",
      end : "2018/12/31",
      vacancyLeft : "23"
    },
    status : "responsable"
  },
   {
    id : 3,
    name : "michalon",
    firstname : "jack",
    password : "bloup",
    mail : "jack.michalon@ynov.com",
    address : "Nantes",
    birthDate : "1996/02/23",
    phone : "06 06 06 06 06",
    contract : {
      beginning : "2018/09/01",
      end : "2018/12/31",
      vacancyLeft : "23"
    },
    status : "drh"
  }        
]
const roles = [
  "salarié","drh","responsable"
]
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
  methods: {
    // Auth
    login:function(){
        this.errorMessage = ""
      var found = false
      var i = 0
      while(i < users.length && !found){
          if(users[i].mail == this.formEmail && users[i].password == this.formPassword){            
            found = true
          }else{
            i++
          }        
      }
      if (found){
        var session = {
            isActive: true,                
            user :  users[i]
        }
        const parsed = JSON.stringify(session);
        localStorage.setItem('session', parsed);
        this.$router.push('dashboard')
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
