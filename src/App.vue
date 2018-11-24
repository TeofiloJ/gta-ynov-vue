<template>
  <div id="app">


    <NavBarOnline v-if="this.$session.exists()" />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>


  </div>
</template>

<script>

import NavBarOnline from "./components/NavBarOnline.vue"


const planning = [
  {
    id: 1,
    name: "rendez vous médecin",
    userId: 1,
    dateEventBegin: "2018-11-05T08:00",
    dateEventEnd: "2018-11-05T09:00",
    type: ""
  },
  {
    id: 2,
    name: "mise en prod",
    userId: 1,
    dateEventBegin: "2018-11-05T09:00",
    dateEventEnd: "2018-11-05T011:00",
    type: ""
  },
  {
    id: 3,
    name: "réunion fin de projet",
    userId: 1,
    dateEventBegin: "2018-11-07T08:00",
    dateEventEnd: "2018-11-08T10:00",
    type: ""
  },
  {
    id: 4,
    name: "montage vidéo",
    userId: 2,
    dateEventBegin: "2018-11-05T08:00",
    dateEventEnd: "2018-11-05T08:00",
    type: ""
  },
  {
    id: 5,
    name: "pause café",
    userId: 2,
    dateEventBegin: "2018-11-05T08:00",
    dateEventEnd: "2018-11-05T08:00",
    type: ""
  }
]
const users = [
  {
    id : 1,
    name : "jeandot",
    firstname : "teofilo",
    password : "bloup",
    mail : "teofilo.jeandot@ynov.com",
    address : "Nantes",
    birthDate : "1996-02-23",
    phone : "06 06 06 06 06",
    status : "administrateur"
  },
   {
    id : 2,
    name : "bar",
    firstname : "foo",
    password : "bloup",
    mail : "foo.bar@ynov.com",
    address : "Nantes",
    birthDate : "1996-02-23",
    phone : "06 06 06 06 06",
    status : "responsable"
  },
   {
    id : 3,
    name : "michalon",
    firstname : "jack",
    password : "bloup",
    mail : "jack.michalon@ynov.com",
    address : "Nantes",
    birthDate : "1996-02-23",
    phone : "06 06 06 06 06",
    status : "collaborateur"
  }        
]

const contrats = [

]

export default {
  components: {
    NavBarOnline
  },
  name: 'app',
  data () {
    return {

    }
  },
  created(){
    if (!localStorage.getItem('users')) {
      try {
        const parsed = JSON.stringify(users);
        localStorage.setItem('users', parsed);
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    if (!localStorage.getItem('planning')) {
      try {
        const parsed = JSON.stringify(planning);
        localStorage.setItem('planning', parsed);
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
  },
}
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }
  h1,
  h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: grey;
  }
body{
    background-image: url('assets/background2.jpg');

  }

  .fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>