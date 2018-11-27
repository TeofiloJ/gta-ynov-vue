<template>

    <div>
        <b-row class="">
            <b-col>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Tickets">
                          <b-row>
                            <b-col>

                            </b-col>
                            <b-col>

                            </b-col>
                            <b-col>
                              
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