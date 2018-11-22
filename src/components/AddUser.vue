<template>

    <b-container fluid>
        <b-row>
            <b-col>

                    <p>Ajouter un utilisateur</p>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Email:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" type="email" size="sm" placeholder="foobar@domain.com"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Prénom:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" size="sm" type="text" placeholder="foo"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Nom:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" size="sm" type="text" placeholder="bar"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Password:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" type="password" size="sm"placeholder="********"></b-form-input>
                        </b-col>
                    </b-row>
                        
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Adresse:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" size="sm" type="text" placeholder="Nantes"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Date de naissance:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" type="date" size="sm" placeholder="1996/02/23"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Téléphone:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" type="tel" size="sm" placeholder="06 06 06 06 06"></b-form-input>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="3"><label for="input-small">Status:</label></b-col>
                        <b-col sm="9">
                        <b-form-input id="input-small" size="sm" type="text" placeholder="Salarié"></b-form-input>
                        </b-col>
                    </b-row>
            </b-col>
   
            <b-col>
                <p>Créer le contrat</p>

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
export default {
  components: {
  },
  name: 'AddUser',
  data () {
    return {
        contrat : {
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