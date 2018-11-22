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
                    <b-row>
                        <b-col>
                            <b-btn>Ajouter</b-btn>
                        </b-col>
                    </b-row>
            </b-col>
   
            <b-col>
                <p>Créer le contrat</p>

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