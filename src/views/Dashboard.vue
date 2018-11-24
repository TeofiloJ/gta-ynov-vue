<template>

    <div>
        <b-row class="m-2">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Mon compte" active>
                            <b-card no-body>
                                <b-tabs pills card vertical>
                                    <b-tab @click="toggleComponent('DisplayBilan')" title="Voir mon bilan">
                                        <DisplayBilan v-if="isComponentToggle('DisplayBilan')"/>
                                    </b-tab>
                                    
                                </b-tabs>
                            </b-card>
                        </b-tab>
                        <b-tab title="Utilisateurs">
                                <b-card no-body>
                                <b-tabs pills card vertical>
                                    <b-tab @click="toggleComponent('SearchUser')" title="Rechercher">
                                        <SearchUser v-if="isComponentToggle('SearchUser')"/>
                                    </b-tab>
                                    <b-tab @click="toggleComponent('AddUser')" title="Ajouter">
                                        <AddUser v-if="isComponentToggle('AddUser')" />
                                    </b-tab>
                                </b-tabs>
                            </b-card>
                        </b-tab>
                        <b-tab title="Equipes" >
                            <b-card no-body>
                                <b-tabs pills card vertical>
                                    <b-tab @click="toggleComponent('SearchTeam')" title="Rechercher">
                                        <SearchTeam v-if="isComponentToggle('SearchTeam')"/>
                                    </b-tab>
                                    <b-tab @click="toggleComponent('DisplayTeam')" title="Mes équipes">
                                        <DisplayTeam v-if="isComponentToggle('DisplayTeam')" />
                                    </b-tab>
                                    <b-tab @click="toggleComponent('AddTeam')" title="Ajouter">
                                        <AddTeam v-if="isComponentToggle('AddTeam')" />
                                    </b-tab>
                                </b-tabs>
                            </b-card>
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
import SearchUser from "../components/SearchUser.vue";
import AddTeam from "../components/AddTeam.vue";
import DisplayTeam from "../components/DisplayTeam.vue";
import SearchTeam from "../components/SearchTeam.vue";

export default {
  components: {
    NavBarOnline,
    AddUser,
    DisplayBilan,
    SearchUser,
    AddTeam,
    DisplayTeam,
    SearchTeam
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
      ]
    };
  },
  created() {},
  mounted() {},
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
    fetchBilan: function() {}
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