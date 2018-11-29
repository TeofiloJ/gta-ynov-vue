<template>

     <div class="">
        <div class="row">
            <div v-for="data in planningSorted" class="col">
                <span>{{data.jour}}</span>                  
                <div :key="event.id" v-for="event in data.events">
                    <div v-if="event.dateEventBegin < calculatedDateEnd">
                          <div class="list-event mt-3">
                            <div class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1">
                              <div class="box d-table">
                                <div class="d-table-cell align-middle pl-2 pr-2 mr-4 border-right"><i @click="deleteEvent(event.id, event.events)" class="fas fa-minus-circle"></i></div>
                                <div :class="['col-xs-2','ml-2' , 'mr-2', 'pr-2', 'border-right']"><b>{{$moment(event.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(event.dateEventEnd).format('HH:mm') }} </div>
                                <div class="d-table-cell align-middle col-xs-2 mr-2 pr-2 border-right"><b>{{event.type}}</b></div>
                                <div class="d-table-cell align-middle pl-2">{{event.name}}</div>
                              </div>                
                            </div>
                          </div>                        
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




