<template>

     <div class="">
        <div class="row">
            <div v-for="data in planningSorted" class="col">
                <span>{{data.jour}}</span>                  
                <div :key="event.id" v-for="event in data.events">
                    <div v-if="event.dateEventBegin < calculatedDateEnd">
                          <pre v-b-modal.modal-center="'myModal' + event.id" class="border mb-2 mt-2" style="background-color:white; height:20%">{{event.name}}</pre>
                            <b-modal v-bind:title="event.name" v-bind:id="'myModal' + event.id">
                              <div>
                                <p>Date début : {{event.dateEventBegin}}</p>                                
                              </div>
                              <div>
                                <p>Date fin : {{event.dateEventEnd}}</p>
                              </div>
                              <b-btn on:click="PlanningServices.updateEvent(event)">boutton</b-btn>
                            </b-modal>                          
                    </div>
                </div> 
            </div>
        </div>
        
           

    </div>
</template>

<script>

import { EventBus } from '../main.js';


export default {
  components: {},
  data() {
    return {
      planning: [],
      users: [],
      planningSorted : {
        lundi:{
          jour : "L",
          events : []
        },
        mardi:{
          jour : "M",
          events : []
        },
        mercredi:{
          jour : "M",
          events : []
        },
        jeudi:{
          jour : "J",
          events : []
        },
        vendredi:{
          jour : "V",
          events : []
        }

      },
      calculatedDateBegin: "",
      calculatedDateEnd: "",
      selectedUser: ""
    };
  },
  created() {
    // Using the service bus
    EventBus.$on('setSelectedWeek', (calculatedDateBegin, calculatedDateEnd, selectedUserId) => {
      //console.log("event bien recu week")
      this.calculatedDateBegin = calculatedDateBegin
      this.calculatedDateEnd = calculatedDateEnd
      this.selectedUserId = selectedUserId
      //console.log(this.calculatedDateBegin)
      //console.log(this.calculatedDateEnd)

      this.renderPlanning()

    });
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
  mounted(){
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
    renderPlanning:function(){

      this.resetPlanningView()

      this.planning.forEach(event => {
        if(event.userId == this.selectedUserId){
          if (event.dateEventBegin > this.calculatedDateBegin && event.dateEventEnd < this.$moment(this.calculatedDateBegin).weekday(2).format('YYYY-MM-DDTHH:mm')) {
            this.planningSorted.lundi.events.push(event)
            //console.log("lundi: " + event.name + " - " + event.dateEventBegin + " - " + event.dateEventEnd)
          }else if(event.dateEventBegin > this.$moment(this.calculatedDateBegin).weekday(2).format('YYYY-MM-DDTHH:mm') && event.dateEventEnd < this.$moment(this.calculatedDateBegin).weekday(4).format('YYYY-MM-DDTHH:mm')) {
            this.planningSorted.mardi.events.push(event)
            //console.log("mardi: " + event.dateEventBegin + " - " + event.dateEventEnd)
          }else if(event.dateEventBegin > this.$moment(this.calculatedDateBegin).weekday(3).format('YYYY-MM-DDTHH:mm') && event.dateEventEnd < this.$moment(this.calculatedDateBegin).weekday(5).format('YYYY-MM-DDTHH:mm')) {
            this.planningSorted.mercredi.events.push(event)
            //console.log("mercredi: " + event.dateEventBegin + " - " + event.dateEventEnd)
          }else if(event.dateEventBegin > this.$moment(this.calculatedDateBegin).weekday(4).format('YYYY-MM-DDTHH:mm') && event.dateEventEnd < this.$moment(this.calculatedDateBegin).weekday(6).format('YYYY-MM-DDTHH:mm')) {
            this.planningSorted.jeudi.events.push(event)
            //console.log("jeudi: " + event.dateEventBegin + " - " + event.dateEventEnd)
          }else if(event.dateEventBegin > this.$moment(this.calculatedDateBegin).weekday(5).format('YYYY-MM-DDTHH:mm') && event.dateEventEnd < this.$moment(this.calculatedDateBegin).weekday(7).format('YYYY-MM-DDTHH:mm')) {
            this.planningSorted.vendredi.events.push(event)
            //console.log("vendredi: " + event.dateEventBegin + " - " + event.dateEventEnd)
          }
          
        }
        
      });
    },
    resetPlanningView:function(){
      this.planningSorted = {
        lundi:{
          jour : "L",
          events : []
        },
        mardi:{
          jour : "M",
          events : []
        },
        mercredi:{
          jour : "M",
          events : []
        },
        jeudi:{
          jour : "J",
          events : []
        },
        vendredi:{
          jour : "V",
          events : []
        }

      }
    }
    
  },
  props: {
  }
};
</script>




