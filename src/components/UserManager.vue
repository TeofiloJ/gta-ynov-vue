<template>

  <b-container fluid>
      <b-row>
        <b-col md="3">
            <b-button class="mt-2 mb-2" @click="createUser(createInput)" size="sm" type="submit">Créer un utilisateur</b-button>
            <b-form>
              <b-form-input v-on:input="searchUsers" v-model="searchInput" type="search" placeholder="Rechercher"/>
            </b-form>

              <b-list-group class="mt-2">
                <b-list-group-item style="text-align:center;" @click="renderUser(user.id)" button v-for="user in searchInput.length > 0 ? usersSelected : users" :key="user.id">{{user.firstname}} {{user.name}}</b-list-group-item>
              </b-list-group>      
        </b-col >    
        <b-col class="" md="9" style="" v-if="displayUser">

                <div v-for="user in users" v-if="user.id == userId" :key="user.id">
                    <span style="font-size: 35px;">{{user.firstname}} {{user.name}}</span> <i @click="deleteUser(userId)" class="fas fa-ban"></i>
                      <b-nav-form class="mb-3">
                        <b-form-select class="mr-2" size="sm" v-model="teamSelectedToAdd">Selectionner
                          
                          <option :key="team.id" v-for="team in teamsNotInUser" :value="'' + team.id">{{team.name}}</option>
                        </b-form-select>
                        <b-button @click="addUserToTeam(teamSelectedToAdd)" size="sm" class="mt-2" type="submit">Rejoindre l'équipe</b-button>
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
                          <tr v-for="team in teamsFromUser" :key="team.id">
                            <td data-label="Utilisateur">{{team.name}}</td>
                            <td data-label="Status">{{team.status}}</td>
                            <td data-label="Actions"><a v-if="(userId != team.members[0].id)" @click="removeTeam(team.id)"><i class="fas fa-user-minus"></i></a></td>
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
  name: 'UserManager',
  data () {
    return {
      createInput: "",
      users: [],
      teamSelectedToAdd: "",
      teamsNotInUser: [],
      displayUser: false,
      teamId : 0,
      teams: [],
      teamsSelected:[],
      searchInput: "",
      usersSelected:[],
      teamsFromUser: [],
      
    }
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
    searchUsers:function(){
      this.usersSelected = []
      for (var user of this.users) {
        if (user.name.includes(this.searchInput) || user.firstname.includes(this.searchInput) || user.mail.includes(this.searchInput) || user.status.includes(this.searchInput)) {
          this.usersSelected.push(user)          
        }
      }
    },
    searchTeams:function(){
      this.teamDisplayed = {}
      this.displayTeam = false
      this.teamsSelected = []
      for (var team of this.teams) {
        if (team.name.includes(this.searchInput)) {
          this.teamsSelected.push(team)          
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
    addUserToTeam:function(userId){
      if(userId != ""){
        var userToAdd = {}
        for (let j = 0; j < this.teamsNotInUser.length; j++) {
          if (this.teamsNotInUser[j].id == userId) {
            userToAdd = this.teamsNotInUser[j]
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

    }
  }
}
</script>

<style>

/* CSS for smaller view spaces */

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