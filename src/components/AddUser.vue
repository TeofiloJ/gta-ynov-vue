<template>

    <b-container fluid>
        <b-row align-h="center">
            <b-col md="7">
                    <p>Ajouter un utilisateur</p>

                    <b-row class="">
                        <b-col sm="3"><label for="email">Email:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="email" v-model="userToAdd.email" type="email" size="sm" placeholder="foobar@domain.com"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="firstname">Prénom:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="firstname" v-model="userToAdd.firstname" size="sm" type="text" placeholder="foo"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="name">Nom:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="name" v-model="userToAdd.name" size="sm" type="text" placeholder="bar"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="pwd">Password:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="pwd" v-model="userToAdd.password" type="password" size="sm"placeholder="********"></b-form-input>
                        </b-col>
                    </b-row>
                        
                    <b-row class="">
                        <b-col sm="3"><label for="address">Adresse:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="address" v-model="userToAdd.address" size="sm" type="text" placeholder="Nantes"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="birthDate">Date de naissance:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="birthDate" v-model="userToAdd.birthDate" type="date" size="sm" placeholder="1996/02/23"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="phone">Téléphone:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="phone" v-model="userToAdd.phone" type="tel" size="sm" placeholder="06 06 06 06 06"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="status">Status:</label></b-col>
                        <b-col sm="9">
                            <div class="form-group">
                                <select v-model="userToAdd.status" size="sm" class="form-control" id="status">
                                <option v-for="role in roles" v-bind:value='role' :key="role">{{role}}</option>
                                </select>
                            </div>
                        </b-col>
                    </b-row>
            </b-col>
   
            <b-col>
                <p>Créer le contrat</p>

                <b-row align-h="center">
                    <table>
                        <thead>
                            <th>Jour</th>
                            <th>Matin 1</th>
                            <th>Matin 2</th>
                            <th>Aprem 1</th>
                            <th>Aprem 2</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>L</td>
                                <td><input type="time" v-model="contrat.lundi.matin1"></td>
                                <td><input type="time" v-model="contrat.lundi.matin2"></td>
                                <td><input type="time" v-model="contrat.lundi.aprem1"></td>
                                <td><input type="time" v-model="contrat.lundi.aprem2"></td>                            
                            </tr>
                            <tr>
                                <td>M</td>
                                <td><input type="time" v-model="contrat.mardi.matin1"></td>
                                <td><input type="time" v-model="contrat.mardi.matin2"></td>
                                <td><input type="time" v-model="contrat.mardi.aprem1"></td>
                                <td><input type="time" v-model="contrat.mardi.aprem2"></td>
                            </tr>
                            <tr>
                                <td>M</td>
                                <td><input type="time" v-model="contrat.mercredi.matin1"></td>
                                <td><input type="time" v-model="contrat.mercredi.matin2"></td>
                                <td><input type="time" v-model="contrat.mercredi.aprem1"></td>
                                <td><input type="time" v-model="contrat.mercredi.aprem2"></td>
                            </tr>
                            <tr>
                                <td>J</td>
                                <td><input type="time" v-model="contrat.jeudi.matin1"></td>
                                <td><input type="time" v-model="contrat.jeudi.matin2"></td>
                                <td><input type="time" v-model="contrat.jeudi.aprem1"></td>
                                <td><input type="time" v-model="contrat.jeudi.aprem2"></td>
                            </tr>
                            <tr>
                                <td>V</td>
                                <td><input type="time" v-model="contrat.vendredi.matin1"></td>
                                <td><input type="time" v-model="contrat.vendredi.matin2"></td>
                                <td><input type="time" v-model="contrat.vendredi.aprem1"></td>
                                <td><input type="time" v-model="contrat.vendredi.aprem2"></td>
                            </tr>
                        </tbody>
                    </table>
                </b-row>
            </b-col>
            

        </b-row>
            <b-row>
                <b-col>
                    <b-btn>Ajouter</b-btn>
                </b-col>
            </b-row>
    </b-container>

</template>



<script>

const roles = [
  "salarié","drh","responsable"
]

export default {
  components: {
  },
  name: 'AddUser',
  data () {
    return {
        roles:roles,
        contrat : {
            idUser: -1,
            dateBegin: "2018-11-01T09:00",
            dateEnd: "2018-11-01T17:00",
            nbConges: 35,
            lundi : {
                matin1: "09:00",
                matin2: "12:00",
                aprem1: "13:00",
                aprem2: "17:00",
            },
            mardi : {
                matin1: "09:00",
                matin2: "12:00",
                aprem1: "13:00",
                aprem2: "17:00",
            },
            mercredi : {
                matin1: "09:00",
                matin2: "12:00",
                aprem1: "13:00",
                aprem2: "17:00",
            },
            jeudi : {
                matin1: "09:00",
                matin2: "12:00",
                aprem1: "13:00",
                aprem2: "17:00",
            },
            vendredi : {
                matin1: "09:00",
                matin2: "12:00",
                aprem1: "13:00",
                aprem2: "17:00",
            },
        },
        userToAdd : {
            id : 1,
            name : "foo",
            firstname : "bar",
            password : "bloup",
            mail : "bar.foo@ynov.com",
            address : "Nantes",
            birthDate : "1996/02/23",
            phone : "06 06 06 06 06",
            contract : {},
            status : "salarié"

        }
    }
  },
  methods: {
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