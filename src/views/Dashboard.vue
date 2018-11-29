<template>

    <div>
        <b-row class="">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Tickets">
                          
                          <b-row>
                            <b-col md="3">
                              <b-list-group class="mt-2 mb-2">
                              <b-list-group-item v-on:click="allTickets"><i class="far fa-list-alt"></i> Tous les tickets</b-list-group-item>
                            </b-list-group>
                          <div class="mb-2" v-if="this.$session.get('user').status == 'administrateur'">

                            <label for="userlabel">Utilisateur :</label>
                            <b-select class="mb-2" v-model="selectedUser" name="userlabel" >
                                <option :key="user.id" :value="user.id" v-for="user in users">{{user.firstname}} {{user.name}}</option>
                            </b-select>
                          <b-btn v-if="selectedUser == ''" size="sm" disabled >Afficher</b-btn>
                          <b-btn v-else size="sm"  @click="filterTickets" >Afficher</b-btn>
                      </div>
                      <div class="mb-2" v-else-if="this.$session.get('user').status == 'responsable' ">

                            <label for="equipelabel">Equipe :</label>
                            <b-form-select class="mb-2" v-model="selectedTeam" name="equipelabel" >
                                <option  @click="emptyUser" v-if="team.members[0].id == $session.get('user').id" :key="team.id" :value="team.id" v-for="team in teams">{{team.name}}</option>
                            </b-form-select>

                            <label for="userlabel">Utilisateur :</label>
                            <b-select v-for="team in teams" v-if="team.id == selectedTeam" class="mb-2" v-model="selectedUser" name="userlabel" >
                                <option :key="user.id" :value="user.id" v-for="user in team.members">{{user.firstname}} {{user.name}}</option>
                            </b-select>
                          <b-btn v-if="selectedUser == ''" size="sm" disabled >Afficher</b-btn>
                          <b-btn v-else size="sm"  @click="filterTickets" >Afficher</b-btn>
                      </div>
                            </b-col>
                            <b-col>
                              <p style="font-size:25px">Tickets en attente :</p>
                               <div class="list-event mt-3">
                                 
                            <div v-for="ticket in ticketsSelected" class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1">
                              <div class="box d-table">
                                <div class="d-table-cell align-middle pl-2 pr-1 mr-1  "><i @click="deleteTicket(ticket.id)" class="fas fa-minus-circle"></i></div>
                                <div class="d-table-cell align-middle pl-2 pr-2 mr-4 border-right"><i @click="validateTicket(ticket.id)" class="fas fa-check-circle"></i></div>
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
                            <div v-for="event in planningSelected" class="row border-bottom border-dark ml-3 mr-3 mb-3 pb-1">
                              <div class="box d-table">
                                
                                <div class="d-table-cell align-middle pl-2 pr-2 mr-4 border-right"><i @click="deleteEvent(event.id)" class="fas fa-minus-square"></i></div>
                                <div :class="['col-xs-2','ml-2' , 'mr-2', 'pr-2', 'border-right']"><b>{{$moment(event.dateEventBegin).format('HH:mm') }}</b><br>{{$moment(event.dateEventEnd).format('HH:mm') }} </div>
                                <div class="d-table-cell align-middle col-xs-2 mr-2 pr-2 border-right"><b>{{event.type}}</b></div>
                                <div class="d-table-cell align-middle pl-2">{{event.name}}</div>
                              </div>                
                            </div>
                            </div>

                            </b-col>
                          </b-row>

                        </b-tab>
                        <b-tab title="Utilisateurs">
                            <b-row>
                              <b-col md="3">
                                  <b-button class="mt-2 mb-2" @click="createUser(createInputUser)" size="sm" type="submit">Créer un utilisateur</b-button>
                                  <b-form>
                                    <b-form-input v-on:input="searchUsers" v-model="searchInputUser" type="search" placeholder="Rechercher"/>
                                  </b-form>

                                    <b-list-group class="mt-2">
                                      <b-list-group-item style="text-align:center;" @click="renderUser(user.id)" button v-for="user in searchInputUser.length > 0 ? usersSelected : users" :key="user.id">{{user.firstname}} {{user.name}}</b-list-group-item>
                                    </b-list-group>      
                              </b-col >    
                              <b-col class="" md="9" style="" v-if="displayUser">

                                      <div v-for="user in users" v-if="user.id == userId" :key="user.id">
                                          <span style="font-size: 35px;">{{user.firstname}} {{user.name}}</span> <i @click="deleteUser(userId)" class="fas fa-ban"></i>
                                            <b-nav-form class="mb-3">
                                              <b-form-select class="mr-2" size="sm" v-model="teamSelectedToAdd">Selectionner
                                                
                                                <option :key="team.id" v-for="team in teamsNotInUser" :value="'' + team.id">{{team.name}}</option>
                                              </b-form-select>
                                              <b-button @click="addTeamToUser(teamSelectedToAdd)" size="sm" class="mt-2" type="submit">Ajouter à l'équipe</b-button>
                                            </b-nav-form>
                                            <b-row>
                                              <b-col md="4">
                                                  <div id="tab" class="tab-responsive">
                                                  <p style="font-size:20px">Equipes</p>
                                                  <table class="table">
                                                    <thead>
                                                      <tr>
                                                        <th>Nom</th>
                                                        <th>Actions</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr v-for="team in teamsFromUser" :key="team.id">
                                                        <td data-label="Nom">{{team.name}}</td>
                                                        <td data-label="Actions"><a v-if="(userId != team.members[0].id)" @click="removeTeam(team.id)"><i class="fas fa-user-minus"></i></a></td>
                                                      </tr>                          
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </b-col>
                                              <b-col md="8">
                                                  <div id="tab" class="tab-responsive">
                                                  <p style="font-size:20px">Contrats</p>
                                                  <table class="table">
                                                    <thead>
                                                      <tr>
                                                        <th>Type</th>
                                                        <th>Période</th>
                                                        <th>Actions</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      <tr v-for="contrat in user.contrats" :key="contrat.id">
                                                        <td data-label="Type">{{contrat.type}}</td>
                                                        <td data-label="Période">{{contrat.dateBegin}} au {{contrat.dateEnd}}</td>
                                                        <td data-label="Actions"><a @click="removeTeam(contrat.id)"><i class="fas fa-user-minus"></i></a></td>
                                                        
                                                      </tr>                          
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </b-col>
                                            </b-row>
                                      </div>
                              </b-col> 
                            </b-row>    
                        </b-tab>
                        <b-tab title="Equipes" >
                                <b-row>
        <b-col md="3">

            <b-input v-model="createInputTeam" type="text" placeholder="Nom d'équipe"/>
            <b-button class="mt-2 mb-2" @click="createTeam(createInputTeam)" size="sm" type="submit">Créer l'équipe</b-button>


            <b-form>
              <b-form-input v-on:input="searchTeams" v-model="searchInputTeam" type="search" placeholder="Rechercher"/>
            </b-form>

              <b-list-group class="mt-2">
                <b-list-group-item style="text-align:center;" @click="renderTeam(team.id)" button v-for="team in searchInputTeam.length > 0 ? teamsSelected : teams" :key="team.id">{{team.name}} <b-badge variant="dark" pill>{{team.members.length}}</b-badge></b-list-group-item>
              </b-list-group>      
        </b-col >    
        <b-col class="" md="9" style="" v-if="displayTeam">

                <div v-for="team in teams" v-if="team.id == teamId" :key="team.id">
                    <span style="font-size: 35px;">{{team.name}}</span> <i @click="deleteTeam(teamId)" class="fas fa-ban"></i>
                      <b-nav-form class="mb-3">
                        <b-form-select class="mr-2" size="sm" v-model="userSelectedToAdd">                          
                          <option :key="user.id" v-for="user in usersNotInTeam" :value="'' + user.id">{{user.firstname}} {{user.name}}</option>
                        </b-form-select>
                        <b-button @click="addUserToTeam(userSelectedToAdd)" size="sm" class="mt-2" type="submit">Ajouter à l'équipe</b-button>
                      </b-nav-form>
                      
                    <div id="tab" class="tab-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="member in team.members" :key="member.id">
                            <td data-label="Utilisateur">{{member.firstname}} {{member.name}}</td>
                            <td v-if="member.status == 'administrateur'" data-label="Status"><b-badge variant="warning">{{member.status}}</b-badge></td>
                            <td v-else-if="member.status == 'responsable'" data-label="Status"><b-badge variant="success">{{member.status}}</b-badge></td>
                            <td v-else data-label="Status"><b-badge variant="info">{{member.status}}</b-badge></td>
                            <td data-label="Actions"><router-link :to="'/profile/' + member.id"><i class="fas fa-user"></i></router-link> | <a v-if="(member.id != team.members[0].id)" @click="removeUser(member.id)"><i class="fas fa-user-minus"></i></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
        </b-col> 
      </b-row>

                        </b-tab>
                                                <b-tab v-if="this.$session.get('user').status == 'administrateur'" title="Motifs" >
                              <b-row>
                                <b-col>
                                                                    <b-form>
                                    <b-form-input v-model="createInputMotif" type="search" placeholder="Ajouter"/>
                                  </b-form>
                                  </b-col>  </b-row>

                                  <b-row>
                                     <b-col>
                                    <b-list-group class="mt-2">
                                      <b-list-group-item style="text-align:center;" @click="createMotif(createInputMotif)" button>Créer un motif</b-list-group-item>
                                    </b-list-group>      
                                   
                                    </b-col>    
                                    </b-row>        
                                                        

                                  
                                  
                              <b-row>
                                <b-col>
                                    <table sty>
                                      <thead>
                                        <th>Motif</th>
                                        <th>Action</th>
                                      </thead>
                                      <tbody>
                                     <tr v-for="monEvent in events">
                                      <td><b-list-group-item style="text-align:center;">{{monEvent}}</b-list-group-item></td>
                                      <td style="text-align:center"><i @click="deleteMotif(monEvent)" class="fas fa-trash-alt"></i></td>                              
                                    </tr>
                                      </tbody>                                   

                                </table>
                                </b-col>
                              </b-row>
                        </b-tab>
                        <b-tab v-if="this.$session.get('user').status == 'administrateur'" title="Logs" >

                      <div id="tab2" class="tab-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Utilisateur</th>
                            <th>Date</th>
                            <th>Action</th>
                            <th>Contenu</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="monLog in log">
                              <td data-label="Utilisateur">{{monLog.user}}</td> 
                              <td data-label="Date">{{monLog.date}}</td> 
                                <td data-label="Action">{{monLog.status}}</td>  
                                 <td data-label="Contenu">{{monLog.content}}</td>
                             </tr>
                        </tbody>
                      </table>
                    </div>

                        </b-tab>
                         </b-tab>

                    </b-tabs>
                </b-card>
            </b-col>
        </b-row>
    </div>


</template>

<script>
import NavBarOnline from "../components/NavBarOnline.vue";
import AddUser from "../components/AddUser.vue";
import DisplayBilan from "../components/DisplayBilan.vue";
import UserManager from "../components/UserManager.vue";
import AddTeam from "../components/AddTeam.vue";
import DisplayTeam from "../components/DisplayTeam.vue";
import TeamManager from "../components/TeamManager.vue";

export default {
  components: {
    NavBarOnline,
    AddUser,
    DisplayBilan,
    UserManager,
    AddTeam,
    DisplayTeam,
    TeamManager
  },
  name: "Dashboard",
  data() {
    return {
      tabComponent: [
        {
          name: "DisplayBilan",
          display: true
        },
        {
          name: "AddUser",
          display: false
        },
        {
          name: "SearchUser",
          display: false
        },
        {
          name: "DisplayTeam",
          display: false
        },
        {
          name: "AddTeam",
          display: false
        },
        {
          name: "SearchTeam",
          display: false
        }
      ],
      createInputMotif: "",
      createInputUser: "",
      users: [],
      teamSelectedToAdd: "",
      teamsNotInUser: [],
      displayUser: false,
      teamId: 0,
      teams: [],
      teamsSelected: [],
      searchInputUser: "",
      usersSelected: [],
      teamsFromUser: [],
      createInputTeam: "",
      users: [],
      userSelectedToAdd: "",
      usersNotInTeam: [],
      displayTeam: false,
      teamId: 0,
      teamsSelected: [],
      searchInputTeam: "",
      log: [],
      events: [],
      selectedUser:"",
      tickets : [],
      ticketsSelected : [],
      planning : [],
      planningSelected: [],
      lastChoice: "",
      selectedTeam:"",
    };
  },
  created() {
    if (localStorage.getItem("events")) {
      try {
        this.events = JSON.parse(localStorage.getItem("events"));
      } catch (e) {
        localStorage.removeItem("events");
      }
    }
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
    if (localStorage.getItem("teams")) {
      try {
        this.teams = JSON.parse(localStorage.getItem("teams"));
      } catch (e) {
        localStorage.removeItem("teams");
      }
    }
    if (localStorage.getItem("log")) {
      try {
        this.log = JSON.parse(localStorage.getItem("log"));
      } catch (e) {
        localStorage.removeItem("log");
      }
    }
        if (localStorage.getItem("tickets")) {
      try {
        this.tickets = JSON.parse(localStorage.getItem("tickets"));
      } catch (e) {
        localStorage.removeItem("tickets");
      }
    }
        if (localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
  },
  mounted() {
            if (localStorage.getItem("tickets")) {
      try {
        this.tickets = JSON.parse(localStorage.getItem("tickets"));
      } catch (e) {
        localStorage.removeItem("tickets");
      }
    }
    if (localStorage.getItem("events")) {
      try {
        this.events = JSON.parse(localStorage.getItem("events"));
      } catch (e) {
        localStorage.removeItem("events");
      }
    }
    if (localStorage.getItem("users")) {
      try {
        this.users = JSON.parse(localStorage.getItem("users"));
      } catch (e) {
        localStorage.removeItem("users");
      }
    }
    if (localStorage.getItem("teams")) {
      try {
        this.teams = JSON.parse(localStorage.getItem("teams"));
      } catch (e) {
        localStorage.removeItem("teams");
      }
    }
    if (localStorage.getItem("log")) {
      try {
        this.log = JSON.parse(localStorage.getItem("log"));
      } catch (e) {
        localStorage.removeItem("log");
      }
    }
        if (localStorage.getItem('planning')) {
      try {
        this.planning = JSON.parse(localStorage.getItem('planning'));
      } catch(e) {
        localStorage.removeItem('planning');
      }
    }
  },
  methods: {
    initTabComponent: function() {
      this.tabComponent.forEach(function(element) {
        element.display = false;
      }, this);
    },
    toggleComponent: function(componentName) {
      this.initTabComponent();
      var i = 0;
      var flag = false;
      while (i < this.tabComponent.length && !flag) {
        if (this.tabComponent[i].name == componentName) {
          this.tabComponent[i].display = true;
          flag = true;
        } else {
          i++;
        }
      }
    },
    isComponentToggle: function(cName) {
      for (var i = 0; i < this.tabComponent.length; i++) {
        if (
          this.tabComponent[i].name == cName &&
          this.tabComponent[i].display == true
        ) {
          return true;
        }
      }
      return false;
    },
    searchUsers: function() {
      this.usersSelected = [];
      for (var user of this.users) {
        if (
          user.name.includes(this.searchInputUser) ||
          user.firstname.includes(this.searchInputUser) ||
          user.mail.includes(this.searchInputUser) ||
          user.status.includes(this.searchInputUser)
        ) {
          this.usersSelected.push(user);
        }
      }
    },
    calculTeamNotInUser: function() {
      this.teamsNotInUser = [];
      this.teamsFromUser = [];
      var found = false;
      for (let k = 0; k < this.teams.length; k++) {
        found = false;
        for (let l = 0; l < this.teams[k].members.length; l++) {
          if (this.teams[k].members[l].id == this.userId) {
            found = true;
            this.teamsFromUser.push(this.teams[k]);
          }
        }
        if (!found) {
          this.teamsNotInUser.push(this.teams[k]);
        }
      }
    },
    renderUser: function(userId) {
      this.displayUser = true;
      this.userId = userId;
      this.calculTeamNotInUser();
      this.$forceUpdate();
    },
    removeTeam: function(teamId) {
      var userId = this.userId;
      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id == teamId) {
          this.teams[i].members = this.teams[i].members.filter(function(
            member
          ) {
            return member.id != userId;
          });
        }
      }
      if (localStorage.getItem("teams")) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem("teams", parsed);
        } catch (e) {
          localStorage.removeItem("teams");
        }
      }
      this.calculTeamNotInUser();
    },
    addTeamToUser: function(teamId) {
      if (teamId != "") {
        var userToAdd = {};

        for (let j = 0; j < this.users.length; j++) {
          if (this.users[j].id == this.userId) {
            userToAdd = this.users[j];
          }
        }
        for (let i = 0; i < this.teams.length; i++) {
          if (this.teams[i].id == teamId) {
            this.teams[i].members.push(userToAdd);
          }
        }

        if (localStorage.getItem("teams")) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem("teams", parsed);
          } catch (e) {
            localStorage.removeItem("teams");
          }
        }
        this.calculTeamNotInUser();
      }
    },
    deleteUser: function(teamId) {
      this.teams = this.teams.filter(function(team) {
        return team.id != teamId;
      });

      if (localStorage.getItem("teams")) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem("teams", parsed);
        } catch (e) {
          localStorage.removeItem("teams");
        }
      }
    },
    createUser: function(teamName) {
      if (teamName != "") {
        var teamCreated = {
          id: 1,
          name: teamName,
          members: []
        };
        teamCreated.id = this.teams[this.teams.length - 1].id + 1;
        teamCreated.members.push(this.$session.get("user"));

        this.teams.push(teamCreated);

        if (localStorage.getItem("teams")) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem("teams", parsed);
          } catch (e) {
            localStorage.removeItem("teams");
          }
        }
      }
    },
    searchTeams: function() {
      this.teamDisplayed = {};
      this.displayTeam = false;
      this.teamsSelected = [];
      for (var team of this.teams) {
        if (team.name.includes(this.searchInputTeam)) {
          this.teamsSelected.push(team);
        }
      }
    },
    calculUserNotInProject: function() {
      this.usersNotInTeam = [];
      var myTeam = [];
      var found = false;
      this.teams.forEach(team => {
        if (team.id == this.teamId) {
          myTeam = team.members;
        }
      });

      for (let j = 0; j < this.users.length; j++) {
        found = false;
        for (let i = 0; i < myTeam.length; i++) {
          if (this.users[j].id == myTeam[i].id) {
            found = true;
          }
        }
        if (!found) {
          this.usersNotInTeam.push(this.users[j]);
        }
      }
    },
    renderTeam: function(teamId) {
      this.displayTeam = true;
      this.teamId = teamId;
      this.calculUserNotInProject();
      this.$forceUpdate();
    },
    removeUser: function(userId) {
      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id == this.teamId) {
          this.teams[i].members = this.teams[i].members.filter(function(
            member
          ) {
            return member.id != userId;
          });
        }
      }
      if (localStorage.getItem("teams")) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem("teams", parsed);
        } catch (e) {
          localStorage.removeItem("teams");
        }
      }
      this.calculUserNotInProject();
    },
    addUserToTeam: function(userId) {
      if (userId != "") {
        var userToAdd = {};
        for (let j = 0; j < this.usersNotInTeam.length; j++) {
          if (this.usersNotInTeam[j].id == userId) {
            userToAdd = this.usersNotInTeam[j];
          }
        }
        for (let i = 0; i < this.teams.length; i++) {
          if (this.teams[i].id == this.teamId) {
            this.teams[i].members.push(userToAdd);
          }
        }

        if (localStorage.getItem("teams")) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem("teams", parsed);
          } catch (e) {
            localStorage.removeItem("teams");
          }
        }
        this.calculUserNotInProject();
      }
    },
    deleteTeam: function(teamId) {
      this.teams = this.teams.filter(function(team) {
        return team.id != teamId;
      });

      if (localStorage.getItem("teams")) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem("teams", parsed);
        } catch (e) {
          localStorage.removeItem("teams");
        }
      }
    },
    createTeam: function(teamName) {
      if (teamName != "") {
        var teamCreated = {
          id: 1,
          name: teamName,
          members: []
        };
        teamCreated.id = this.teams[this.teams.length - 1].id + 1;
        teamCreated.members.push(this.$session.get("user"));

        this.teams.push(teamCreated);

        if (localStorage.getItem("teams")) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem("teams", parsed);
          } catch (e) {
            localStorage.removeItem("teams");
          }
        }
      }
    },
    createMotif:function(motif){
      this.events.push(motif)
       if (localStorage.getItem("events")) {
          try {
            const parsed = JSON.stringify(this.events);
            localStorage.setItem("events", parsed);
          } catch (e) {
            localStorage.removeItem("events");
          }
        }
        this.createInputMotif = ""
    },
    deleteMotif:function(motif){
        var temp = []
        for (var i = 0; i < this.events.length; i++) {
          if (this.events[i] != motif) {
            temp.push(this.events[i])
          }
          
        }
        this.events = temp

        if (localStorage.getItem("events")) {
          try {
            const parsed = JSON.stringify(this.events);
            localStorage.setItem("events", parsed);
          } catch (e) {
            localStorage.removeItem("events");
          }
        }
    },
    allTickets:function(){
      this.lastChoice = "all"
      this.selectedUser =""
      this.ticketsSelected = []
      this.planningSelected = []
      if (this.$session.get('user').status == 'administrateur') {
        this.ticketsSelected = this.tickets
        this.planningSelected = this.planning
      } else { //responsable
        var found = false
        for (var i = 0; i < this.tickets.length; i++) {
          found = false

          var j = 0
          while (j < this.teams.length && !found) {

            if (this.$session.get('user').id == this.selectedUser) {
              var k = 0
            } else {
              var k = 1
            }
            while (k < this.teams[j].members.length && !found) {
              if (this.teams[j].members[k].id == this.tickets[i].userId) {
                this.ticketsSelected.push(this.tickets[i])
                found = true
              }
              k++
            }
            j++
          }         
        }

        for (var i = 0; i < this.planning.length; i++) {
          found = false
          var j = 0
          while (j < this.teams.length && !found) {
            if (this.$session.get('user').id == this.selectedUser) {
              var k = 0
            } else {
              var k = 1
            }
            while (k < this.teams[j].members.length && !found) {
              if (this.teams[j].members[k].id == this.planning[i].userId) {
                this.planningSelected.push(this.planning[i])
                found = true
              }
              k++
            }
            j++
          }         
        }
      }

    },
    filterTickets:function(){
      this.lastChoice = "filter"
      this.ticketsSelected = []
      this.planningSelected = []
        var found = false
        for (var i = 0; i < this.tickets.length; i++) {
          if (this.tickets[i].userId == this.selectedUser) {
            this.ticketsSelected.push(this.tickets[i])
          }         
        }

        for (var i = 0; i < this.planning.length; i++) {
          if (this.planning[i].userId == this.selectedUser) {
            this.planningSelected.push(this.planning[i])
          }  
        }
    },
        deleteTicket:function(ticketId){
      this.tickets = this.tickets.filter(function(ticket) {
        return ticket.id != ticketId;
      });

        if (localStorage.getItem('tickets')) {
          try {
            const parsed = JSON.stringify(this.tickets);
            localStorage.setItem('tickets', parsed);
          } catch(e) {
            localStorage.removeItem('tickets');
          }
        }
        if (this.lastChoice == "all") {
          this.allTickets()
        } else {
          this.filterTickets()
        }

    },
     deleteEvent:function(eventId){
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

                if (this.lastChoice == "all") {
          this.allTickets()
        } else {
          this.filterTickets()
        }

    },
    emptyUser:function(){
      this.selectedUser = ""
    },
    validateTicket:function(ticketId){
      console.log("on cherche" + ticketId)
      var found = false
      var i = 0
      var j = 0
      while(i < this.tickets.length && !found){
        console.log("avant " + this.tickets[i].id)
        if (this.tickets[i].id == ticketId) {
          found = true
          j = i
        }else{
          i++
        }
      }
      var temp = Object.assign({},this.tickets[i])
      temp.id = this.planning[this.planning.length -1].id + 1
      this.planning.push(temp)

      temp = []
      for (var i = 0; i < this.tickets.length; i++) {
         if (this.tickets[i].id != ticketId) {
          temp.push(this.tickets[i])
        }
        
      }
      this.tickets = temp

        if (localStorage.getItem('tickets')) {
          try {
            const parsed = JSON.stringify(this.tickets);
            localStorage.setItem('tickets', parsed);
          } catch(e) {
            localStorage.removeItem('tickets');
          }
        }

        if (localStorage.getItem('planning')) {
          try {
            const parsed = JSON.stringify(this.planning);
            localStorage.setItem('planning', parsed);
          } catch(e) {
            localStorage.removeItem('planning');
          }
        }

        if (this.lastChoice == "all") {
          console.log("ui")
          this.allTickets()
        } else {
          this.filterTickets()
        }

    },
  }
};
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
    text-align: right;
  }

  .tab-responsive table td:before {
    content: attr(data-label);
    float: left;
    font-weight: 700;
  }
}

.content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}
</style>