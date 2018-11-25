<template>

    <div>
        <b-row class="">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
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
      createInputUser: "",
      users: [],
      teamSelectedToAdd: "",
      teamsNotInUser: [],
      displayUser: false,
      teamId : 0,
      teams: [],
      teamsSelected:[],
      searchInputUser: "",
      usersSelected:[],
      teamsFromUser: [],
      createInputTeam: "",
      users: [],
      userSelectedToAdd: "",
      usersNotInTeam: [],
      displayTeam: false,
      teamId : 0,
      teamsSelected:[],
      searchInputTeam: ""
    };
  },
  created() {
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
  methods: {
    initTabComponent: function() {
      this.tabComponent.forEach(function(element) {
        element.display = false;
      }, this);
    },
    toggleComponent: function(componentName) {
      this.initTabComponent();
      var i = 0
      var flag = false
      while (i < this.tabComponent.length && !flag) {
        if (this.tabComponent[i].name == componentName) {
          this.tabComponent[i].display = true;
          flag = true
        }else{
            i++
        }
      }
    },
    isComponentToggle:function(cName){
        console.log("cName : " + cName)
        for (var i = 0; i < this.tabComponent.length; i++) {
            console.log("composant : " + this.tabComponent[i].name)
            if(this.tabComponent[i].name == cName && this.tabComponent[i].display == true){
                console.log("composant oui : " + this.tabComponent[i].name)
                return true
            }
        }
        return false
    },
    searchUsers:function(){
      this.usersSelected = []
      for (var user of this.users) {
        if (user.name.includes(this.searchInput) || user.firstname.includes(this.searchInput) || user.mail.includes(this.searchInput) || user.status.includes(this.searchInput)) {
          this.usersSelected.push(user)          
        }
      }
    },
    calculTeamNotInUser:function(){
      this.teamsNotInUser = []
      this.teamsFromUser = []
      var found = false
        for (let k = 0; k < this.teams.length; k++) {
          found = false
          for (let l = 0; l < this.teams[k].members.length; l++) {
            if(this.teams[k].members[l].id == this.userId){
              found = true
              this.teamsFromUser.push(this.teams[k])
            }            
          }
          if (!found) {
            this.teamsNotInUser.push(this.teams[k])
          }
        }
    },
    renderUser:function(userId){
      this.displayUser = true
      this.userId = userId
      this.calculTeamNotInUser()
      this.$forceUpdate();
    },
    removeTeam:function(teamId){
      var userId = this.userId
      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id == teamId) {
              this.teams[i].members = this.teams[i].members.filter(function (member) {
                return member.id != userId;
              })           
          }        
      }
      if (localStorage.getItem('teams')) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem('teams', parsed);
        } catch(e) {
          localStorage.removeItem('teams');
        }
      }
      this.calculTeamNotInUser()
    },
    addTeamToUser:function(teamId){
      if(teamId != ""){
        var userToAdd = {}
        
        for (let j = 0; j < this.users.length; j++) {
          console.log(this.users[j].id + " | " + this.userId)
          if (this.users[j].id == this.userId) {
            console.log("found")
            userToAdd = this.users[j]
          }
          
        }
        for (let i = 0; i < this.teams.length; i++) {
          if(this.teams[i].id == teamId){
            this.teams[i].members.push(userToAdd)
          }        
        }

        if (localStorage.getItem('teams')) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem('teams', parsed);
          } catch(e) {
            localStorage.removeItem('teams');
          }
        }
        this.calculTeamNotInUser()
      }
      
    },
    deleteUser:function(teamId){
      this.teams = this.teams.filter(function (team) {
        return team.id != teamId
      })

      if (localStorage.getItem('teams')) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem('teams', parsed);
        } catch(e) {
          localStorage.removeItem('teams');
        }
      }
    },
    createUser:function(teamName){
      if(teamName != ""){
        var teamCreated = {
          id: 1,
          name: teamName,
          members:[
          ]
        }
        teamCreated.id = ((this.teams[this.teams.length - 1].id) + 1)
        teamCreated.members.push(this.$session.get('user'))

        this.teams.push(teamCreated)

        if (localStorage.getItem('teams')) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem('teams', parsed);
          } catch(e) {
            localStorage.removeItem('teams');
          }
        }

      }

    },
        searchTeams:function(){
      this.teamDisplayed = {}
      this.displayTeam = false
      this.teamsSelected = []
      for (var team of this.teams) {
        if (team.name.includes(this.searchInputTeam)) {
          this.teamsSelected.push(team)          
        }
      }
    },
    calculUserNotInProject:function(){
      this.usersNotInTeam = []
      var myTeam = []
      var found = false
        this.teams.forEach(team => {
          if(team.id == this.teamId){
            myTeam = team.members
          }
        });

        for (let j = 0; j < this.users.length; j++) {
          found = false
          for (let i = 0; i < myTeam.length; i++) {
            if(this.users[j].id == myTeam[i].id){
              found = true
            }            
          }
          if (!found) {            
            this.usersNotInTeam.push(this.users[j])
          }
        }
    },
    renderTeam:function(teamId){
      this.displayTeam = true
      this.teamId = teamId
      this.calculUserNotInProject()
      this.$forceUpdate();
    },
    removeUser:function(userId){
      for (let i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id == this.teamId) {
              this.teams[i].members = this.teams[i].members.filter(function (member) {
                return member.id != userId;
              })           
          }        
      }
      if (localStorage.getItem('teams')) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem('teams', parsed);
        } catch(e) {
          localStorage.removeItem('teams');
        }
      }
      this.calculUserNotInProject()
    },
    addUserToTeam:function(userId){
      if(userId != ""){
        var userToAdd = {}
        for (let j = 0; j < this.usersNotInTeam.length; j++) {
          if (this.usersNotInTeam[j].id == userId) {
            userToAdd = this.usersNotInTeam[j]
          }
          
        }
        for (let i = 0; i < this.teams.length; i++) {
          if(this.teams[i].id == this.teamId){
            this.teams[i].members.push(userToAdd)
          }        
        }

        if (localStorage.getItem('teams')) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem('teams', parsed);
          } catch(e) {
            localStorage.removeItem('teams');
          }
        }
        this.calculUserNotInProject()
      }
      
    },
    deleteTeam:function(teamId){
      this.teams = this.teams.filter(function (team) {
        return team.id != teamId
      })

      if (localStorage.getItem('teams')) {
        try {
          const parsed = JSON.stringify(this.teams);
          localStorage.setItem('teams', parsed);
        } catch(e) {
          localStorage.removeItem('teams');
        }
      }
    },
    createTeam:function(teamName){
      if(teamName != ""){
        var teamCreated = {
          id: 1,
          name: teamName,
          members:[
          ]
        }
        teamCreated.id = ((this.teams[this.teams.length - 1].id) + 1)
        teamCreated.members.push(this.$session.get('user'))

        this.teams.push(teamCreated)

        if (localStorage.getItem('teams')) {
          try {
            const parsed = JSON.stringify(this.teams);
            localStorage.setItem('teams', parsed);
          } catch(e) {
            localStorage.removeItem('teams');
          }
        }

      }

    }
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