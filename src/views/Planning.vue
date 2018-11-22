<template>
  <div>
    
    <!-- Navbar -->
        <NavBarOnline :session='session'/>
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
import SideBar from '../components/SideBar.vue'
import PlanningWeek from '../components/PlanningWeek.vue'
import PlanningMonth from '../components/PlanningMonth.vue'

export default {
  components: {
    NavBarOnline, NavBarOffline, SideBar, PlanningWeek, PlanningMonth
  },
  name: 'planning',
  data () {
    return {
      planning: [],
      selectedDateBegin: "20",
      selectedDateEnd: "",
      selectedMonth: "",
      toggleMonthView : false,
      users: [],
      session : {
        isActive: false
      },
    }
  },
  created(){
    if (localStorage.getItem('session')) {
      try {
        this.session = JSON.parse(localStorage.getItem('session'));
      } catch(e) {
        localStorage.removeItem('session');
      }
    }
    if (localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
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
    if (localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
  },
  methods: {
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
        this.toggleMonthView = !this.toggleMonthView
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