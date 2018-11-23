<template>

    <b-container fluid>
        <b-row>
          <b-col md="12">
            <b-form>
              <b-form-input v-on:input="searchUsers" v-model="searchInput" type="text" placeholder="Search"/>
            </b-form>
          </b-col>
        </b-row>
        <b-row class="mt-2">
          <b-col>
            <table class="table">
              <thead>
                <th>id</th>
                <th>Status</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Actions</th>
              </thead>
              <tbody>
                {{searchInput.lenght}}

                <tr  v-for="user in searchInput.length > 0 ? usersSelected : users ">
                  <td>{{user.id}}</td>
                  <td>{{user.status}}</td>
                  <td>{{user.firstname}}</td>
                  <td>{{user.mail}}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>

          </b-col>            
        </b-row>      
    </b-container>

</template>

<script>
export default {
  components: {
  },
  name: 'search',
  data () {
    return {
      users: [],
      usersSelected:[],
      searchInput: ""
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
  },
  mounted(){
    if (localStorage.getItem('users')) {
      try {
        this.users = JSON.parse(localStorage.getItem('users'));
      } catch(e) {
        localStorage.removeItem('users');
      }
    }
  },
  methods: {
    searchUsers:function(){
      this.usersSelected = []
      console.log("hello")
      console.log(this.searchInput)
      for (var user of this.users) {
        console.log(user)
        if (user.name.includes(this.searchInput) || user.firstname.includes(this.searchInput) || user.mail.includes(this.searchInput)) {
          this.usersSelected.push(user)          
        }
      }
    }
  }
}
</script>

<style>

.content{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

.sidebar{
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  
}

</style>