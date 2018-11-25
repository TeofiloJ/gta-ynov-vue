<template>

    <b-container fluid>
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
                        <b-form-select class="mr-2" size="sm" v-model="userSelectedToAdd">Selectionner
                          
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
                            <td data-label="Status">{{member.status}}</td>
                            <td data-label="Actions"><router-link :to="'/profile/' + member.id"><i class="fas fa-user"></i></router-link> | <a v-if="(member.id != team.members[0].id)" @click="removeUser(member.id)"><i class="fas fa-user-minus"></i></a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                </div>
        </b-col> 
      </b-row>
        

         
    </b-container>

</template>

<script>
export default {
  components: {
  },
  name: 'SearchTeam',
  data () {
    return {
      createInputTeam: "",
      users: [],
      userSelectedToAdd: "",
      usersNotInTeam: [],
      displayTeam: false,
      teamId : 0,
      teams: [],
      teamsSelected:[],
      searchInputTeam: ""
    }
  },
  created() {
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
  },
  mounted(){
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
  },
  methods: {
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
}
</script>

<style>



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