<template>

    <div>
        <NavBarOnline :session='session'/>
        <b-row class="m-2">
            <b-col>
                    <b-card no-body>
                        <b-tabs card>
                            <b-tab title="Mon compte" active>
                                <b-card no-body>
                                    <b-tabs pills card vertical>
                                        <b-tab title="Voir mon bilan">
                                            <DisplayBilan/>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                            </b-tab>
                            <b-tab title="Utilisateurs">
                                 <b-card no-body>
                                    <b-tabs pills card vertical>
                                        <b-tab title="Rechercher">
                                            <Search/>
                                        </b-tab>
                                        <b-tab title="Ajouter">
                                            <AddUser/>
                                        </b-tab>
                                    </b-tabs>
                                </b-card>
                            </b-tab>
                            <b-tab title="Equipes" >
                                <br>I'm the second tab content
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
import Search from "../components/Search.vue"

export default {
  components: {
    NavBarOnline,
    AddUser,
    DisplayBilan,
    Search,
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
        },
                {
          name: "search",
          display: false
        }
      ],
      session: {
        isActive: false
      }
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
      this.tabComponent.forEach(function(element) {
        if (element.name == componentName) {
          element.display = true;
        }
      }, this);
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