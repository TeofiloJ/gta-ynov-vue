<template>


    <div class="container" id="sidebar">       
  
          <b-list-group class="mt-2 mb-2">
            <b-list-group-item v-on:click="$emit('togglePlanningView')"><img  id="togglePlanning" src="../assets/calendar.png" >Toggle view</b-list-group-item>
          </b-list-group>


        <div class="mb-2" v-if="this.$session.get('user').status == 'administrateur'">

            <b-badge variant="warning">Administrateur</b-badge>
              <label for="userlabel">Utilisateur :</label>
              <b-select class="mb-2" v-model="selectedUser" name="userlabel" >
                  <option :key="user.id" :value="user.id" v-for="user in users">{{user.firstname}} {{user.name}}</option>
              </b-select>
            <b-btn v-if="selectedUser == ''" size="sm" disabled >Ajouter un Event</b-btn>
            <b-btn v-else size="sm"  @click="showModal" >Ajouter un Event</b-btn>
        </div>
        <div class="mb-2" v-else-if="this.$session.get('user').status == 'responsable' ">

                <b-badge variant="success">Responsable</b-badge>
              <label for="equipelabel">Equipe :</label>
              <b-form-select class="mb-2" v-model="selectedTeam" name="equipelabel" >
                  <option  @click="emptyUser" v-if="team.members[0].id == $session.get('user').id" :key="team.id" :value="team.id" v-for="team in teams">{{team.name}}</option>
              </b-form-select>

              <label for="userlabel">Utilisateur :</label>
              <b-select v-for="team in teams" v-if="team.id == selectedTeam" class="mb-2" v-model="selectedUser" name="userlabel" >
                  <option :key="user.id" :value="user.id" v-for="user in team.members">{{user.firstname}} {{user.name}}</option>
              </b-select>
            <b-btn v-if="selectedUser == ''" size="sm" disabled >Ajouter un Event</b-btn>
            <b-btn v-else size="sm"  @click="showModal" >Ajouter un Event</b-btn>
        </div>
        <div class="mb-2" v-else>
                <b-badge variant="info">Collaborateur</b-badge>
        </div>

        <div class="row mb-2">
            <div v-if="!toggleMonthView" class="col"  id="week-input">
              <label for="userlabel">Choisir une semaine :</label>
              <b-form-input type='date' id='weekDatePicker' v-model="selectedWeek" />
              <b-btn v-if="this.$session.get('user').status == 'collaborateur'" id="filterWeek" size="sm" class="mt-2" v-on:click="setSelectedWeek" variant="">Filtrer</b-btn>
              <b-btn v-else-if="selectedUser == ''" size="sm" class="mt-2" disabled variant="">Filtrer</b-btn>
              <b-btn v-else id="filterWeek" size="sm" class="mt-2" v-on:click="setSelectedWeek" variant="">Filtrer</b-btn>
          </div>
            <div v-else class="col " id="month-input">
              <label for="userlabel">Choisir un mois :</label>
              <vue-monthly-picker id='monthDatePicker' v-model="selectedMonth"></vue-monthly-picker>
              <b-btn v-if="this.$session.get('user').status == 'collaborateur'"  id="filterMonth"  size="sm" class="mt-2" v-on:click="setSelectedMonth" variant="">Filtrer</b-btn>
              <b-btn  v-else-if="selectedUser == ''"  id="filterMonth"  size="sm" class="mt-2" disabled v-on:click="setSelectedMonth" variant="">Filtrer</b-btn>
              <b-btn v-else  id="filterMonth"  size="sm" class="mt-2" v-on:click="setSelectedMonth" variant="">Filtrer</b-btn>
          </div>
        </div>







          <!-- Modal Component -->
        <b-modal hide-footer centered  size="sm"  ref="addUser" id="addUser" title="Ajouter un Event">
          <label for="motifEvent">Motif: </label>
          <b-select class="mb-2" v-model="motifEvent" name="motifEvent" >
            <option :key="event" :value="event" v-for="event in events">{{event}}</option>
          </b-select>
          <b-tabs>
            <b-tab title="Journée" active>
              <label for="date">Date</label>

              <b-form-input name="date" v-model="dayDate" class="mb-2 mt-2" type="date"></b-form-input>
              <label for="dayDuration">Durée</label>
              <b-select class="mb-2" v-model="dayDuration" name="dayDuration" >
                <option value="day">Journée</option>
                <option value="morning">Matin</option>
                <option value="afternoon">Après-midi</option>
              </b-select>
              <b-btn @click="addEventDay" variant="success">Valider</b-btn> <b-btn @click="hideModal" variant="danger">Annuler</b-btn>
            </b-tab>
            <b-tab title="Période" >
              <label for="periodeStart">Début période</label>
              <b-form-input name="periodeStart" v-model="periodeStart" class="mb-2 mt-2" type="date"></b-form-input>
              <label for="periodeEnd">Fin période</label>
              <b-form-input name="periodeEnd" v-model="periodeEnd" class="mb-2 " type="date"></b-form-input>
              <b-btn @click="addEventPeriode" variant="success">Valider</b-btn> <b-btn @click="hideModal" variant="danger">Annuler</b-btn>
            </b-tab>
          </b-tabs>
          <p>{{errorMessage}}</p>          
        </b-modal>





    </div>

    


</template>

<script>

import { EventBus } from '../main.js'
import VueMonthlyPicker from 'vue-monthly-picker'

export default {
  components: {
    VueMonthlyPicker
  },
  data() {
    return {
      selectedWeek: "2018-11-05",
      selectedMonth: "2018-11-01T00:00",
      selectedUser: "",
      motifEvent: "",
      events: [],
      dayDuration : "",
      dayDate : "",
      periodeStart:"",
      periodeEnd:"",
      teams: [],
      selectedTeam :{},
      users: [],
      planning: [],
      errorMessage: "",
    }
  },
  created(){
      if (localStorage.getItem('events')) {
      try {
        this.events = JSON.parse(localStorage.getItem('events'));
      } catch(e) {
        localStorage.removeItem('events');
      }
    }
    if (localStorage.getItem('teams')) {
      try {
        this.teams = JSON.parse(localStorage.getItem('teams'));
      } catch(e) {
        localStorage.removeItem('teams');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    if(localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
  },
  mounted(){
    if (localStorage.getItem('events')) {
      try {
        this.events = JSON.parse(localStorage.getItem('events'));
      } catch(e) {
        localStorage.removeItem('events');
      }
    }
    if (localStorage.getItem('teams')) {
      try {
        this.teams = JSON.parse(localStorage.getItem('teams'));
      } catch(e) {
        localStorage.removeItem('teams');
      }
    }
        if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
        if(localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
  },
  methods: {
    emptyUser:function(){
      this.selectedUser = ""
    },
    showModal:function() {
      this.errorMessage = ""
      this.$refs.addUser.show()
    },
    hideModal:function () {
      this.errorMessage = ""
      this.$refs.addUser.hide()
    },
    setSelectedWeek:function(){
      
      var calculatedDateBegin = this.$moment(this.selectedWeek).weekday(1).format('YYYY-MM-DDTHH:mm');
      var calculatedDateEnd = this.$moment(this.selectedWeek).weekday(6).format('YYYY-MM-DDTHH:mm'); 
      

      if(this.$session.get('user').role == "collaborateur"){
        this.selectedUser = this.$session.get('user').id
      }

      EventBus.$emit('setSelectedWeek', calculatedDateBegin, calculatedDateEnd, this.selectedUser); 
    },
    setSelectedMonth:function(){
      if(this.$session.get('user').role == "collaborateur"){
        this.selectedUser = this.$session.get('user').id
      }
      EventBus.$emit('setSelectedMonth', this.selectedMonth, this.selectedUser); 
    },
    addEventDay:function(){

      var eventToAdd = {    
        id: 0,
        name: "",
        userId: 1,
        dateEventBegin: "",
        dateEventEnd: "",
        type: ""
      }

      eventToAdd.id = (this.planning[this.planning.length - 1 ].id + 1)
      eventToAdd.name = "lorem ipsum"     
      eventToAdd.userId = this.selectedUser
      eventToAdd.type = this.motifEvent

      //calcul dateEventBegin

      var userTemp = {}
      for (let j = 0; j < this.users.length; j++) {
        if(this.users[j].id == this.selectedUser)
          userTemp = this.users[j]
      }

      console.log("day " + this.$moment(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm')).format('YYYY-MM-DDTHH:mm'))

      var i = 0
      var found = false
      var weekend = false

      var dateEventBegin = ""
      var dateEventEnd = ""
      
      while(i < userTemp.contrats.length && !found){
        //on verifie que la date est dans un contrat
        console.log(this.$moment(userTemp.contrats[i].dateBegin).format('YYYY-MM-DDTHH:mm') + "   " + this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') + "    " +this.$moment(userTemp.contrats[i].dateEnd).format('YYYY-MM-DDTHH:mm') )
        
        if (this.$moment(userTemp.contrats[i].dateBegin).format('YYYY-MM-DDTHH:mm') <= this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') && this.$moment(userTemp.contrats[i].dateEnd).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm')) {
          found = true
          weekend = false

           //on cherche le jour de la semaine
          if (this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).weekday(1).format('YYYY-MM-DDTHH:mm') && this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') < this.$moment(this.dayDate).weekday(2).format('YYYY-MM-DDTHH:mm')) {
              console.log("lundi")
              if (this.dayDuration == "day") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].lundi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].lundi.aprem2
              } else if(this.dayDuration == "morning") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].lundi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].lundi.matin2
              }else{ // afternoon
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].lundi.aprem1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].lundi.aprem2
              }
              
          }else if(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).weekday(2).format('YYYY-MM-DDTHH:mm') && this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') < this.$moment(this.dayDate).weekday(3).format('YYYY-MM-DDTHH:mm')) {
            console.log("mardi")
              if (this.dayDuration == "day") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mardi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mardi.aprem2
              } else if(this.dayDuration == "morning") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mardi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mardi.matin2
              }else{ // afternoon
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mardi.aprem1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mardi.aprem2
              }
          }else if(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).weekday(3).format('YYYY-MM-DDTHH:mm') && this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') < this.$moment(this.dayDate).weekday(4).format('YYYY-MM-DDTHH:mm')) {
            console.log("mer")
              if (this.dayDuration == "day") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mercredi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mercredi.aprem2
              } else if(this.dayDuration == "morning") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mercredi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mercredi.matin2
              }else{ // afternoon
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].mercredi.aprem1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].mercredi.aprem2
              }
          }else if(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).weekday(4).format('YYYY-MM-DDTHH:mm') && this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') < this.$moment(this.dayDate).weekday(5).format('YYYY-MM-DDTHH:mm')) {
            console.log("je")
              if (this.dayDuration == "day") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].jeudi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].jeudi.aprem2
              } else if(this.dayDuration == "morning") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].jeudi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].jeudi.matin2
              }else{ // afternoon
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].jeudi.aprem1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].jeudi.aprem2
              }
          }else if(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.dayDate).weekday(5).format('YYYY-MM-DDTHH:mm') && this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') < this.$moment(this.dayDate).weekday(6).format('YYYY-MM-DDTHH:mm')) {
            console.log("ven")
              if (this.dayDuration == "day") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].vendredi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].vendredi.aprem2
              } else if(this.dayDuration == "morning") {
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].vendredi.matin1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].vendredi.matin2
              }else{ // afternoon
                dateEventBegin = this.dayDate + "T" + userTemp.contrats[i].vendredi.aprem1
                dateEventEnd = this.dayDate + "T" + userTemp.contrats[i].vendredi.aprem2
              }
          }else{
            weekend = true
            this.errorMessage = "Erreur dans la date (hors contrat, weekend)"
          }

        }else{
            i++
        }        
      }

      if(found && ! weekend){
        eventToAdd.dateEventBegin = dateEventBegin
        eventToAdd.dateEventEnd = dateEventEnd
        console.log("event"  + eventToAdd.name + " "+ eventToAdd.id + " "+ eventToAdd.userId + " "+ eventToAdd.type + " "+ eventToAdd.dateEventBegin + " "+ eventToAdd.dateEventEnd + " ")
        console.log("begin"  + dateEventBegin)
        console.log("end"  + dateEventEnd)

        this.planning.push(eventToAdd)
        console.log("pish")

        if (localStorage.getItem('planning')) {
          try {
            const parsed = JSON.stringify(this.planning);
            localStorage.setItem('planning', parsed);
          } catch(e) {
            localStorage.removeItem('planning');
          }
        }
        
        this.setSelectedMonth()

        
          this.errorMessage = ""
          this.hideModal()
      }else{
          this.errorMessage = "Erreur dans la date (hors contrat, weekend)"
      }

      
    },

    addEventPeriode:function(){



      this.hideModal()
    }
  },
  props: {
    toggleMonthView: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style>

#togglePlanning {
  width: 25px;
  height: 25px;
  
}

</style>

