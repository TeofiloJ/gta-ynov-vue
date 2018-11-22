<template>
  <div>
    
    <!-- Navbar -->
    
    <div v-if="isAuth()" >
        <NavBarOnline v-on:logout="logout" :session='session'/>
    </div>
    <div v-else>
        <NavBarOffline v-on:login="login" :session='session'/>
    </div>

    <!-- Main Page -->

    <div class="row m-2" v-if="isAuth()" >
       
        <!-- Left Sidebar -->
        <div class="col-lg-3">
           <SideBar class="sidebar" :session="session" :toggleMonthView="toggleMonthView" v-on:togglePlanningView="togglePlanningView"></SideBar>
        </div>

        <!-- Center -->
        <div class="col-lg-9">
            <div v-if="!isPlanningViewMonth()">
                <PlanningWeek class="planning"  :planning='planning' :session='session' />
            </div>
            <div v-else>
                <PlanningMonth class="planning"  :planning='planning' :session='session' />
            </div>
            
        </div>

    </div>
    <div class="row mt-3" v-else>
        <div class="col-md-12">
        </div>
    </div>
    

    
  </div>
</template>

<script>
import NavBarOnline from '../components/NavBarOnline.vue'
import NavBarOffline from '../components/NavBarOffline.vue'


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
    NavBarOnline, NavBarOffline
  },
  name: 'planning',
  data () {
    return {
      planning: planning,
      selectedDateBegin: "20",
      selectedDateEnd: "",
      selectedMonth: "",
      toggleMonthView : false,
      alert : "",
      users: users,
      session : {
        isActive: false
      },
    }
  },
  mounted() {
    if (localStorage.getItem('session')) {
      try {
        this.session = JSON.parse(localStorage.getItem('session'));
      } catch(e) {
        localStorage.removeItem('session');
      }
    }
  },
  methods: {
    // Auth
    login:function(formEmail, formPassword){
      var found = false
      var i = 0
      while(i < users.length && !found){
          //console.log("fE :" + formEmail + " fP : " + formPassword)
          //console.log("bE :" + users[i].mail + " bP : " + users[i].password)
          if(users[i].mail == formEmail && users[i].password == formPassword){            
            found = true
          }else{
            i++
          }        
      }
      if (found){
        this.session = {
            isActive: true,                
            user :  users[i]
        }
        const parsed = JSON.stringify(this.session);
        localStorage.setItem('session', parsed);
      }else{
        alert = "Bad email or password"
      }
          
    },
    logout:function(){
        this.session = {
            isActive: false
        }
        localStorage.removeItem('session');
        
    },
    isAuth:function(){
      if (this.session.isActive){
        return true
      }
      return false        
    },
    // Permission
    gotPermission:function(){
    },
    // Planning
    createEvent:function(){
    },
    updateEvent:function(){
    },
    deleteEvent:function(){
    },
    // Others
    isPlanningViewMonth:function(){
      return this.toggleMonthView
    },
    togglePlanningView:function(){
        this.toggleMonthView = this.toggleMonthView == true ? false : true
    },
  }
}
</script>

<style>

.planning{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

.sidebar{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  
}

</style>