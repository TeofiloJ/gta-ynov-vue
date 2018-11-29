<template>

    <div>
        <b-row class="">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Tickets">
                          <b-row>
                            <b-col>
                              <p style="font-size:25px">Créer un ticket :</p>
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
              <b-btn @click="addEventDay" variant="success">Valider</b-btn>
            </b-tab>
            <b-tab title="Période" >
              <label for="periodeStart">Début période</label>
              <b-form-input name="periodeStart" v-model="periodeStart" class="mb-2 mt-2" type="date"></b-form-input>
              <label for="periodeEnd">Fin période</label>
              <b-form-input name="periodeEnd" v-model="periodeEnd" class="mb-2 " type="date"></b-form-input>
              <b-btn @click="addEventPeriode" variant="success">Valider</b-btn>
            </b-tab>
          </b-tabs>
          <p>{{errorMessage}}</p> 

                            </b-col>
                            <b-col>
                              <p style="font-size:25px">Tickets en attente :</p>
                               <div class="list-event mt-3">
                                 
                            <div :key="ticket.id" v-for="ticket in tickets" v-if="ticket.userId == $session.get('user').id" class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1">
                              <div class="box d-table">
                                <div class="d-table-cell align-middle pl-2 pr-2 mr-4 border-right"><i @click="deleteTicket(ticket.id)" class="fas fa-minus-circle"></i></div>
                                <div :class="['col-xs-2','ml-2' , 'mr-2', 'pr-2', 'border-right']"><b>{{$moment(ticket.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(ticket.dateEventEnd).format('HH:mm') }} </div>
                                <div class="d-table-cell align-middle col-xs-2 mr-2 pr-2 border-right"><b>{{ticket.type}}</b></div>
                                <div class="d-table-cell align-middle pl-2">{{ticket.name}}</div>
                              </div>                
                            </div>
                          </div>   

                            </b-col>
                            <b-col>
                              <p style="font-size:25px">Tickets Validés :</p>
                            <div class="list-event mt-3">
                            <div :key="event.id" v-for="event in planning" v-if="event.userId == $session.get('user').id" class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1">
                              <div class="box d-table">
                                <div :class="['col-xs-2','ml-2' , 'mr-2', 'pr-2', 'border-right']"><b>{{$moment(event.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(event.dateEventEnd).format('HH:mm') }} </div>
                                <div class="d-table-cell align-middle col-xs-2 mr-2 pr-2 border-right"><b>{{event.type}}</b></div>
                                <div class="d-table-cell align-middle pl-2">{{event.name}}</div>
                              </div>                
                            </div>
                          </div>  
                              
                            </b-col>
                          </b-row>

                        </b-tab>
                        <b-tab title="Bilan" >
                        </b-tab>
                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </div>


</template>

<script>


export default {
  components: {

  },
  name: "Dashboard",
  data() {
    return {
     users: [],
     teams:[],
     events:[],
     tickets:[],
     planning:[],
     errorMessage: "",
    dayDate: "",
    dayDuration:"",
    periodeStart :"",
    periodeEnd:"",
    motifEvent : ""
    };
  },
  created() {
      if(localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
      if (localStorage.getItem('events')) {
      try {
        this.events = JSON.parse(localStorage.getItem('events'));
      } catch(e) {
        localStorage.removeItem('events');
      }
    }
    if (localStorage.getItem('tickets')) {
      try {
        this.tickets = JSON.parse(localStorage.getItem('tickets'));
      } catch(e) {
        localStorage.removeItem('tickets');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    if (localStorage.getItem('teams')) {
      try {
        this.teams = JSON.parse(localStorage.getItem('teams'));
      } catch(e) {
        localStorage.removeItem('teams');
      }
    }
  },
  mounted(){
            if(localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
          if (localStorage.getItem('events')) {
      try {
        this.events = JSON.parse(localStorage.getItem('events'));
      } catch(e) {
        localStorage.removeItem('events');
      }
    }
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
    if (localStorage.getItem('teams')) {
      try {
        this.teams = JSON.parse(localStorage.getItem('teams'));
      } catch(e) {
        localStorage.removeItem('teams');
      }
    }
        if (localStorage.getItem('tickets')) {
      try {
        this.tickets = JSON.parse(localStorage.getItem('tickets'));
      } catch(e) {
        localStorage.removeItem('tickets');
      }
    }
  },
  methods: {
    addEventDay:function(){

      var eventToAdd = {    
        id: 0,
        name: "",
        userId: 1,
        dateEventBegin: "",
        dateEventEnd: "",
        type: ""
      }
      if (this.tickets.length == 0) {
       eventToAdd.id = 0
      } else {
         eventToAdd.id = this.tickets[this.tickets.length - 1].id + 1
        
      }
      eventToAdd.name = "lorem ipsum"     
      eventToAdd.userId = this.$session.get('user').id
      eventToAdd.type = this.motifEvent

      //calcul dateEventBegin

      var userTemp = {}
      for (let j = 0; j < this.users.length; j++) {
        if(this.users[j].id == this.$session.get('user').id)
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

        this.tickets.push(eventToAdd)
        console.log("pish")

        if (localStorage.getItem('tickets')) {
          try {
            const parsed = JSON.stringify(this.tickets);
            localStorage.setItem('tickets', parsed);
          } catch(e) {
            localStorage.removeItem('tickets');
          }
        }
               
          this.errorMessage = ""
      }else{
          this.errorMessage = "Erreur dans la date (hors contrat, weekend)"
      }

      
    },

    addEventPeriode:function(){
      var eventToAdd = {    
        id: 0,
        name: "",
        userId: 1,
        dateEventBegin: "",
        dateEventEnd: "",
        type: "",
      }

      if (this.tickets.length == 0) {
       eventToAdd.id = 0
      } else {
         eventToAdd.id = this.tickets[this.tickets.length - 1].id + 1
        
      }
      
      eventToAdd.name = "lorem ipsum"     
      eventToAdd.userId = this.$session.get('user').id
      eventToAdd.type = this.motifEvent

      //calcul dateEventBegin

      var userTemp = {}
      for (let j = 0; j < this.users.length; j++) {
        if(this.users[j].id == this.$session.get('user').id)
          userTemp = this.users[j]
      }

      console.log("day " + this.$moment(this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm')).format('YYYY-MM-DDTHH:mm'))

      var i = 0
      var found = false

      var dateEventBegin = ""
      var dateEventEnd = ""
      
      while(i < userTemp.contrats.length && !found){
        //on verifie que la date est dans un contrat
        console.log(this.$moment(userTemp.contrats[i].dateBegin).format('YYYY-MM-DDTHH:mm') + "   " + this.$moment(this.dayDate).format('YYYY-MM-DDTHH:mm') + "    " +this.$moment(userTemp.contrats[i].dateEnd).format('YYYY-MM-DDTHH:mm') )
        
        if (this.$moment(userTemp.contrats[i].dateBegin).format('YYYY-MM-DDTHH:mm') <= this.$moment(this.periodeStart).format('YYYY-MM-DDTHH:mm') && this.$moment(userTemp.contrats[i].dateEnd).format('YYYY-MM-DDTHH:mm') >= this.$moment(this.periodeEnd).format('YYYY-MM-DDTHH:mm')) {
          found = true
        }else{
            i++
        }        
      }

      if(found){
        eventToAdd.dateEventBegin = this.periodeStart
        eventToAdd.dateEventEnd = this.periodeEnd
        console.log("event"  + eventToAdd.name + " "+ eventToAdd.id + " "+ eventToAdd.userId + " "+ eventToAdd.type + " "+ eventToAdd.dateEventBegin + " "+ eventToAdd.dateEventEnd + " ")
        console.log("begin"  + dateEventBegin)
        console.log("end"  + dateEventEnd)

        this.tickets.push(eventToAdd)
        console.log("pish")

        if (localStorage.getItem('tickets')) {
          try {
            const parsed = JSON.stringify(this.tickets);
            localStorage.setItem('tickets', parsed);
          } catch(e) {
            localStorage.removeItem('tickets');
          }
        }
          this.errorMessage = ""
      }else{
          this.errorMessage = "Erreur dans la date (hors contrat, weekend)"
      }
    },
    
    deleteTicket:function(ticketId){
      this.tickets = this.tickets.filter(function(event) {
        return event.id != ticketId;
      });

        if (localStorage.getItem('tickets')) {
          try {
            const parsed = JSON.stringify(this.tickets);
            localStorage.setItem('tickets', parsed);
          } catch(e) {
            localStorage.removeItem('tickets');
          }
        }

    }
  }
}

</script>

<style>

@media only screen and (max-width: 576px) { 
  td.hide { 
    display: none; 
  } 
}


@media screen and (max-width: 768px) {

    .tab-responsive table thead {
        display: none;
    }

    .tab-responsive table tr {
        display: block;
        border-top: 2px solid lightgray;
        margin-top: 20px;
    }

    .tab-responsive table td {
        display: block;
        text-align: right
    }

    .tab-responsive table td:before {
        content: attr(data-label);
        float: left;
        font-weight: 700;
    }
}

.content{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

.sidebar{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  
}

</style>