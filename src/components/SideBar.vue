<template>

    <!-- isAuth -->
    <div id="sidebar">

        <span>Bonjour {{this.$session.get('user').firstname}}</span>

        <div class="container">    

          <div class="row">
            <img  id="togglePlanning" src="../assets/calendar.png" alt="" v-on:click="$emit('togglePlanningView')">
          </div>                

          <div class="row form-group">
              <div v-if="!toggleMonthView" class="col  input-group" id="week-input">
                <input type='date' id='weekDatePicker' v-model="selectedWeek" />
                <b-btn v-on:click="setSelectedWeek" variant="success">Filtrer</b-btn>
            </div>
              <div v-else class="col input-group" id="month-input">
                <vue-monthly-picker id='monthDatePicker' v-model="selectedMonth"></vue-monthly-picker>
                <b-btn v-on:click="setSelectedMonth" variant="success">Filtrer</b-btn>
            </div>
          </div>

        </div>


        <div v-if="this.$session.get('user').status == 'salarié'">
            <h1>IF</h1>

        </div>
        <div v-else-if="this.this.$session.get('user').mail == 'LOL' ">
                <h1> ELSEIF</h1>
        </div>
        <div v-else>
                <h1> ELSE</h1>
        </div>
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
      selectedUser: ""
    }
  },
  methods: {
    getUserPlanning:function(){
      if(this.$session.get('user').role != "responsable"){
        this.selectedUser = this.$session.get('user').id
      }else{
        this.selectedUser = this.$session.get('user').id // a changer pour prendre en compte la selection d'un collaborateur
      }
    },
    setSelectedWeek:function(){
      
      var calculatedDateBegin = this.$moment(this.selectedWeek).weekday(1).format('YYYY-MM-DDTHH:mm');
      var calculatedDateEnd = this.$moment(this.selectedWeek).weekday(6).format('YYYY-MM-DDTHH:mm'); // .weekday(6) car weekday(5) = vendredi matin à 00h00
      
      /*console.log("lundi: " +  calculatedDateBegin)
      console.log("vendredi: " +  calculatedDateEnd)
      */
      //this.getUserPlanning()

      EventBus.$emit('setSelectedWeek', calculatedDateBegin, calculatedDateEnd, 1); //calculer id personne
    },
    setSelectedMonth:function(){
      EventBus.$emit('setSelectedMonth', this.selectedMonth, 1); //calculer id personne
    },
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

