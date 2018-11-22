<template>

  <div class="">
      <div class="container-fluid">
        <div class="title row pl-3">
          <p class="">{{this.$moment(this.beginOfMonth).format('MMMM YYYY')}}</p>
        </div>
        <div class="row pb-2">
          <div class="col">L</div>
          <div class="col">M</div>
          <div class="col">M</div>
          <div class="col">J</div>
          <div class="col">V</div>
          <div class="col hide">S</div>
          <div class="col hide">D</div>
        </div>
        <div class="row d-flex align-items-end mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(0, 7)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <span>&nbsp;&nbsp;</span>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b>0{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                0{{event.jour}}
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              0{{event.jour}}
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(7, 14)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p>-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b v-if="event.jour < 10">0{{event.jour}}</b>
                <b v-else>{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                <span v-if="event.jour < 10">0{{event.jour}}</span>
                <span v-else>{{event.jour}}</span>
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              <span v-if="event.jour < 10">0{{event.jour}}</span>
              <span v-else>{{event.jour}}</span>
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(14, 21)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p>-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b>{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                {{event.jour}}
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              {{event.jour}}
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(21, 28)">
            <div v-if="event.type == 'buffer'"> <!-- buffer -->
              <p>-</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b>{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                {{event.jour}}
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              {{event.jour}}
            </div>
          </div>
        </div>

        <div class="row d-flex justify-content-between mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(28, 35)">
            <div class="hide" v-if="event.type == 'buffer'"> <!-- buffer -->
              <p>&nbsp;&nbsp;</p>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b>{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                {{event.jour}}
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              {{event.jour}}
            </div>
          </div>
        </div>

        <div v-if="this.planningSorted[35].jour != 'error'" class="row d-flex justify-content-between mb-1">
          <div class="col" v-for="event in this.planningSorted.slice(35, 42)">
            <div class="hide" v-if="event.type == 'buffer'"> <!-- buffer -->
              <span>&nbsp;&nbsp;</span>
            </div>
            <div v-else-if="event.type == 'week'"> <!-- semaine -->
              <div v-if="event.nbEvents != 0" class="task" v-b-popover.hover="'nombre de tâches : ' + event.nbEvents" title="Détail journée">
                <b>{{event.jour}}</b>
              </div>
              <div v-else class="noTask">
                {{event.jour}}
              </div>
            </div>
            <div v-else class="weekend hide"> <!-- weekend hide -->
              {{event.jour}}
            </div>
          </div>
        </div>
    </div>
          
        
    <!-- Liste events du jour selectionné -->
    <div class="list-event mt-3">
      <div class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1" v-for="event in this.eventsList">
        <div class="box d-table">
          <div :class="['col-xs-2', '', 'mr-3', 'pr-3', 'border-right', 'border-'+ event.type]"><b>{{$moment(event.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(event.dateEventEnd).format('HH:mm') }} </div>
          <div class="d-table-cell align-middle">{{event.name}}</div>
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
      eventsList : [{
          id: 1,
          name: "rendez vous médecin",
          userId: 1,
          dateEventBegin: "2018-11-05T08:00",
          dateEventEnd: "2018-11-05T09:00",
          type: "warning"
        },
        {
          id: 2,
          name: "mise en prod",
          userId: 1,
          dateEventBegin: "2018-11-05T09:00",
          dateEventEnd: "2018-11-05T11:00",
          type: "info"
        }
      ]
    };
  },
  created() {
    // Using the service bus
    EventBus.$on('setSelectedMonth', (selectedMonth, selectedUserId) => {
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
  },
  methods:{
    renderPlanning:function(){

      this.initPlanningSorted()

      this.planning.forEach(event => {
        if(event.userId == this.selectedUserId){
          if(this.$moment(event.dateEventBegin).format('YYYY-MM') == this.$moment(this.beginOfMonth).format('YYYY-MM')){
            this.planningSorted[this.getDayOfMonth(event.dateEventBegin) - 1 + this.startBuffer].nbEvents ++ 
            this.planningSorted[this.getDayOfMonth(event.dateEventBegin) - 1 + this.startBuffer].events.push(event) 
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
    }
  },  
  props: {
    session: {
      type: Object,
      required: true
    },
    planning: {
      type: Array,
      required: true
    }
  }
};
</script>

<style>

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
  background-color: darkgoldenrod;
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





