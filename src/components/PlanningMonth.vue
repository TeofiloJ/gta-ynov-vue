<template>

  <div class="">
      <div class="container-fluid">
        <div class="title row pl-3">
          <p class="">{{this.$moment(this.beginOfMonth).format('MMMM YYYY')}}</p>
        </div>
        <b-row class="row mb-2">
          <b-col class="col item">L</b-col>
          <b-col class="col item">M</b-col>
          <b-col class="col item">M</b-col>
          <b-col class="col item">J</b-col>
          <b-col class="col item">V</b-col>
          <b-col class="col item hide">S</b-col>
          <b-col class="col item hide">D</b-col>
        </b-row>
        <div class="row d-flex align-items-end mb-1">
          <div :key="event.id"  class="col" v-for="event in this.planningSorted.slice(0, 5)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">&nbsp;&nbsp;</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item"><b>0{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p class="item">0{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div  :key="event.id"  class="col weekend hide" v-for="event in this.planningSorted.slice(5, 7)">
            <div v-if="event.jour != 'error'"> <!-- weekend hide -->
              <p class="item">0{{event.jour}}</p> 
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div :key="event.id"  class="col" v-for="event in this.planningSorted.slice(7, 12)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item" v-if="event.jour < 10"><b  >0{{event.jour}}</b></p>
                <p class="item" v-else><b  >{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p  class="item" v-if="event.jour < 10">0{{event.jour}}</p>
                <p  class="item" v-else>{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div  :key="event.id"  class="col weekend hide" v-for="event in this.planningSorted.slice(12, 14)">
            <div> <!-- weekend hide -->
              <p  class="item" v-if="event.jour < 10">0{{event.jour}}</p>
              <p  class="item" v-else>{{event.jour}}</p>
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div :key="event.id" class="col" v-for="event in this.planningSorted.slice(14, 19)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item"><b >{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p class="item">{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div  :key="event.id"  class="col weekend hide" v-for="event in this.planningSorted.slice(19, 21)">
            <div> <!-- weekend hide -->
                <p class="item">{{event.jour}}</p>
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div :key="event.id" class="col" v-for="event in this.planningSorted.slice(21, 26)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item"><b >{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p class="item">{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div :key="event.id"   class="col weekend hide" v-for="event in this.planningSorted.slice(26, 28)">
            <div> <!-- weekend hide -->
                <p class="item">{{event.jour}}</p>
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div :key="event.id"  class="col" v-for="event in this.planningSorted.slice(28, 33)">
            <div class="hide" v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">&nbsp;&nbsp;</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item"><b >{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p class="item">{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div  :key="event.id"  class="col weekend hide" v-for="event in this.planningSorted.slice(33, 35)">
            <div v-if="event.jour != 'error'"> <!-- weekend hide -->
                <p class="item">{{event.jour}}</p>
            </div>
          </div>
        </div>

        <div v-if="this.planningSorted[35].jour != 'error'" class="row d-flex justify-content-between mb-1">
          <div :key="event.id"  class="col" v-for="event in this.planningSorted.slice(35, 40)">
            <div class="hide" v-if="event.type == 'buffer'"> <!-- buffer -->
              <p class="item">&nbsp;&nbsp;</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div @click="getDetailsOfDay(event.events)" v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <p class="item"><b>{{event.jour}}</b></p>
              </div>
              <div v-else class="noTask">
                <p class="item">{{event.jour}}</p>
              </div>
            </div>
          </div>
          <div :key="event.id"   class="col weekend hide" v-for="event in this.planningSorted.slice(40, 42)">
            <div v-if="event.jour != 'error'"> <!-- weekend hide -->
                <p class="item">{{event.jour}}</p>
            </div>
          </div>
        </div>
    </div>
          
        
    <!-- Liste events du jour selectionné -->
    <div class="list-event mt-3">
      <div  :key="event.id" class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1" v-for="event in this.eventsList">
        <div class="box d-table">
          <div class="d-table-cell align-middle pl-2 pr-2 mr-4 border-right"><i @click="deleteEvent(event.id, event.events)" class="fas fa-minus-circle"></i></div>
          <div :class="['col-xs-2','ml-2' , 'mr-2', 'pr-2', 'border-right']"><b>{{$moment(event.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(event.dateEventEnd).format('HH:mm') }} </div>
          <div class="d-table-cell align-middle col-xs-2 mr-2 pr-2 border-right"><b>{{event.type}}</b></div>
          <div class="d-table-cell align-middle pl-2">{{event.name}}</div>
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
      planningSorted : [],
      selectedUserId: "",
      beginOfMonth: "",
      endOfMonth :"",
      startBuffer: 0,
      endBuffer: 0,
      eventsList : [],
      log: [],
    };
  },
  created() {
    // Using the service bus
    EventBus.$on('setSelectedMonth', (selectedMonth, selectedUserId) => {
      this.eventsList = []
      this.startBuffer = 0
      this.endOfMonth = 0
      this.selectedUserId = selectedUserId
      this.beginOfMonth = this.$moment(selectedMonth).format('YYYY-MM-DDTHH:mm');
      this.endOfMonth = this.$moment(this.beginOfMonth).add('months', 1).subtract('days', 1).format('YYYY-MM-DDTHH:mm')

      console.log(this.$moment(this.beginOfMonth).weekday())
      if(this.$moment(this.beginOfMonth).weekday() != "0"){
        this.startBuffer = parseInt(this.$moment(this.beginOfMonth).weekday() - 1)
      }else{
        this.startBuffer = 6
      }
      if(this.$moment(this.endOfMonth).weekday() != "0"){
        this.endBuffer = 7 - parseInt(this.$moment(this.endOfMonth).weekday())
      }else{
        this.endBuffer = 0
      }

      this.renderPlanning()
    });
    if(localStorage.getItem('planning')) {
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
        if(localStorage.getItem('log')) {
      try {
        this.log = JSON.parse(localStorage.getItem('log'));
      } catch(e) {
        localStorage.removeItem('log');
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
        if(localStorage.getItem('log')) {
      try {
        this.log = JSON.parse(localStorage.getItem('log'));
      } catch(e) {
        localStorage.removeItem('log');
      }
    }
  },
  methods:{
    renderPlanning:function(){
      if (localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }

      this.initPlanningSorted()

      this.planning.forEach(event => {
        if(event.userId == this.selectedUserId){
          if(this.$moment(event.dateEventBegin).format('YYYY-MM') == this.$moment(this.beginOfMonth).format('YYYY-MM')){
            var numeroJourDebut = this.$moment(event.dateEventBegin).dayOfYear()
            var numeroJourMois =  this.$moment(this.beginOfMonth).dayOfYear()
            var vari = numeroJourDebut - numeroJourMois
            var nbJours = this.$moment(event.dateEventEnd).dayOfYear() - this.$moment(event.dateEventBegin).dayOfYear()
            if (nbJours >=1) {
              for (var k = vari; k < (vari + nbJours + 2); k++) {
                console.log("k=" + k)
                var value =  k + this.startBuffer
                console.log("value=" + value)
                this.planningSorted[value].nbEvents ++ 
                this.planningSorted[value].events.push(event) 
                
              }

            } else {
              this.planningSorted[this.getDayOfMonth(event.dateEventBegin) - 1 + this.startBuffer].nbEvents ++ 
              this.planningSorted[this.getDayOfMonth(event.dateEventBegin) - 1 + this.startBuffer].events.push(event) 
            }
            
            //console.log("render " +event.dateEventBegin + " - " + this.planningSorted[this.getDayOfMonth(event.dateEventBegin)])
          }else{            
            //console.log("event name : " + event.name + " | debut event " + this.$moment(event.dateEventBegin).format('YYYY-MM') + " | debut mois " + this.$moment(this.beginOfMonth).format('YYYY-MM'))
          }            
        }
      });
      for (let index = 1; index <= parseInt(this.$moment(this.endOfMonth).format('D')); index ++) {
        this.planningSorted[this.startBuffer + index - 1].jour = index        
      }

      const temp = [5, 6, 12, 13, 19, 20, 26, 27, 33, 34, 40, 41]

      for (let index = 0 + this.startBuffer; index < 42 - this.endBuffer; index++) {
        if(this.planningSorted[index].jour != "error")
        if(temp.includes(index)){
           this.planningSorted[index].type = 'weekend hide'
        }else{
          this.planningSorted[index].type = 'week'
        }
        
      }
      console.log("start buffer :" + this.startBuffer)
      console.log("end buffer :" + this.endBuffer)
    },
    getDayOfMonth:function(date){
      return parseInt(this.$moment(date).format('DD'))
    },
    initPlanningSorted:function(){
      this.planningSorted = []
      for(var i = 0; i < 42; i++){
        this.planningSorted.push(
          {
            jour: "error",
            nbEvents: 0,
            type : "buffer",
            events : []
          }
        )
      }
    },
    getDetailsOfDay:function(events){
      this.eventsList = []
      this.eventsList = events      
    },
    deleteEvent:function(eventId, eventList){
      this.planning = this.planning.filter(function(event) {
        return event.id != eventId;
      });

        if (localStorage.getItem('planning')) {
          try {
            const parsed = JSON.stringify(this.planning);
            localStorage.setItem('planning', parsed);
          } catch(e) {
            localStorage.removeItem('planning');
          }
        }

          var logData = {
            user: this.$session.get('user').mail,
            date: this.$moment(),
            status:"DELETE",
            content: this.eventsList.filter(function(event) {
            return event.id == eventId;
            })
          }
          this.log.push(logData)
          if (localStorage.getItem('log')) {
          try {
            const parsed = JSON.stringify(this.log);
            localStorage.setItem('log', parsed);
          } catch(e) {
            localStorage.removeItem('log');
          }
        }
      this.renderPlanning()
      this.eventsList = this.eventsList.filter(function(event) {
            return event.id != eventId;
          });


    }
  },  
  props: {
  }
};
</script>

<style>

.item{
  text-align: center;
}

.list-event{
  padding-bottom: 10px;
}

@media only screen and (max-width: 576px) { 
  .hide { 
    display: none; 
  } 
}

.buffer{
  background-color: lightslategray;
  border-radius: 5px;
  
}

.task{
  background-color: orange;
  border-radius: 5px;
}

.noTask{
  background-color: mediumseagreen;
  border-radius: 5px;
}

.weekend hide{
  background-color: lightslategray;
  border-radius: 5px;
}

.title{
  font-size: 28px;
}

</style>





