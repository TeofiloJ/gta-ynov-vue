<template>

    <div>
        <NavBarOnline :session='session'/>
        <b-row class="m-2">
            <b-col md="4" >
                <div class="content">
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Mon compte" active>
                                <b-btn v-on:click="toggleComponent('DisplayBilan')">Voir mon bilan</b-btn>
                            </b-tab>
                            <b-tab title="Utilisateurs">
                            <b-nav-form>
                                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
                                    <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                                </b-nav-form>
                                
                                <b-btn size="sm" v-on:click="toggleComponent('addUser')">Ajouter un utilisateur</b-btn>
                            </b-tab>
                            <b-tab title="Equipes" >
                                <br>I'm the second tab content
                            </b-tab>
                        </b-tabs>
                    </b-card>

                </div>
            </b-col>
            <b-col  md="8">
                <div class="content">
                    <div>
                        <div v-for="componentToDisplay in tabComponent">
                            <div v-if="componentToDisplay.display == true">
                                <b-col v-if="componentToDisplay.name == 'addUser'">
                                    <addUser/>
                                </b-col>
                                <b-col v-else-if="componentToDisplay.name == 'DisplayBilan'">
                                    <DisplayBilan/>
                                </b-col>
                            </div>
                        </div>
                    </div>

                </div>                
            </b-col>
            
        </b-row>
        <b-btn v-on:click="initTabComponent"></b-btn>
    </div>


</template>

<script>
import NavBarOnline from "../components/NavBarOnline.vue";
import AddUser from "../components/AddUser.vue";
import DisplayBilan from "../components/DisplayBilan.vue";

export default {
  components: {
    NavBarOnline, AddUser, DisplayBilan
  },
  name: "planning",
  data() {
    return {
      tabComponent: [
        {
          name: "DisplayBilan",
          display: false
        },
        {
          name: "addUser",
          display: false
        }
      ],
      session: {
        isActive: false
      }
    };
  },
  created() {

    if (localStorage.getItem("session")) {
      try {
        this.session = JSON.parse(localStorage.getItem("session"));
      } catch (e) {
        localStorage.removeItem("session");
      }
    }
  },
  mounted() {
    if (localStorage.getItem("session")) {
      try {
        this.session = JSON.parse(localStorage.getItem("session"));
      } catch (e) {
        localStorage.removeItem("session");
      }
    }
  },
  methods: {
    initTabComponent: function() {
        this.tabComponent.forEach(function(element) {
            element.display = false
        }, this);
    },
    toggleComponent: function(componentName) {
        this.initTabComponent()
        this.tabComponent.forEach(function(element) {
            if (element.name == componentName) {
                element.display = true
            }
        }, this);

    },
    fetchBilan: function() {

    }
  }
};
</script>

<style>
.content {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}

.sidebar {
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
}
</style>