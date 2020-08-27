<template>
  <div class="container-fluid create-contact-wrapper">
    <div class="row"> 
      <div class="col-md-12">
        <header-component :haveBtn="listData.length"/>

        <div class="create-contact-body">
          <div class="row">
            <div class="col-md-12">
              <empty-list v-if="!listData.length"/>
              <list-contact v-else/>

              <b-alert show variant="success" v-if="controlAlert == 'created'">Contato criado com sucesso.</b-alert>
              <b-alert show variant="success" v-if="controlAlert == 'edit'">Contato editado com sucesso.</b-alert>
              <b-alert show variant="success" v-if="controlAlert == 'delete'">Contato removido com sucesso.</b-alert>
            </div>
          </div>
        </div>
      </div>
    </div>

    <modal
      :idModal="'modal-create-contact'">
      <template v-slot:content> 
        <modal-create-contact @createdSuccess="[controlAlert = 'created', resetControlAlert()]"/>
      </template>
    </modal>

    <modal
      :idModal="'modal-delete-contact'"
      :title="'Excluir contato'">
      <template v-slot:content>
        <modal-delete-contact @deleteSuccess="[controlAlert = 'delete', resetControlAlert()]" />
      </template>
    </modal>

    <modal
      :idModal="'modal-edit-contact'"
      :title="'Editar contato'">
      <template v-slot:content> 
        <modal-create-contact :typeModal="'edit'" @editSuccess="[controlAlert = 'edit', resetControlAlert()]" />
      </template>
    </modal>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ListService from '@/services/list-service'
import HeaderComponent from '@/components/Header'
import EmptyList from '@/components/EmptyList'
import ListContact from '@/components/ListContact'
import Modal from '@/components/Modal'
import ModalCreateContact from '@/components/ModalCreateContact'
import ModalDeleteContact from '@/components/ModalDeleteContact'

export default {
  name: 'create-contact',

  components: {
    Modal,
    EmptyList,
    HeaderComponent,
    ModalCreateContact,
    ModalDeleteContact,
    ListContact
  },

  data() {
    return {
      controlAlert: ''
    }
  },

  computed: {
    ...mapGetters({
      listData: 'listData'
    })
  },

  created() {
    this.listService = new ListService()
    
    const session = sessionStorage.getItem('data') ? JSON.parse(sessionStorage.getItem('data')) : null
    if(session) {
      this.getSession()
    } else {
      const _self = this
      let prevent
      let preventObj
      let number
      let id
      

      this.listService.getList().then((response) => {
        const resp = response.data
        
        const newObj = resp.map((item) => {
          
          prevent =  item.name.replace(/\s\s+/g, ' ')
          prevent = prevent.split(' ')
          prevent = prevent[0].charAt(0)
          preventObj = { item: prevent, color: _self.randomBgColor() }

          number = Math.random()
          number.toString(36)
          id = number.toString(36).substr(2, 9)

          const itemFormat = {
            prevent: preventObj, 
            nome: item.name,
            cpf: item.cpf,
            email: item.email,
            telefone: item.phone,
            editar: '',
            id: id
          }
          return itemFormat
        })
        
        console.log(newObj)     

        this.updateAllList(newObj)
      }).catch((error) => {
        console.log(error)
      }).finally(() => {

      })
    }
  },

  methods: {
    ...mapActions({
      getSession: 'getSession',
      updateAllList: 'updateAllList'
    }),

    resetControlAlert() {
      setTimeout(() => {
        this.controlAlert = ''
      },3000)
    },

    randomBgColor() {
      const x = Math.floor(Math.random() * 256);
      const y = Math.floor(Math.random() * 256);
      const z = Math.floor(Math.random() * 256);
      const bgColor = "rgb(" + x + "," + y + "," + z + ")";
      console.log(bgColor);
      return bgColor      
    },
  }
}
</script>

<style lang="scss">

</style>
