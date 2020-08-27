<template>
  <div>
    <ValidationObserver
      v-slot="{ valid }"
      ref="observer"
      tag="form"
      @submit.prevent="submit()"
    >
      <div class="form">
        <b-row class="my-1">
          <ValidationProvider
            v-slot="{ errors, valid, touched }"
            :rules="'namePerson|required'"
            name="name"
            :state="valid"
          >
            <b-col sm="12">
              <label for="name">Nome</label>
              <b-form-input
                id="name"
                type="text"
                v-model="form.name.text"
                :state="touched ? valid : null">
              </b-form-input>
            </b-col>
          <span class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </b-row>

        <b-row class="my-1">
          <ValidationProvider
            v-slot="{ errors, valid, touched }"
            :rules="'email|required'"
            name="mail"
            :state="valid"
          >
            <b-col sm="12">
              <label for="mail">E-mail</label>
              <b-form-input
                id="mail"
                type="text"
                v-model="form.mail.text"
                :state="touched ? valid : null">
              </b-form-input>
            </b-col>
          <span class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </b-row>

        <b-row class="my-1">
          <ValidationProvider
            v-slot="{ errors, valid, touched }"
            :rules="'required'"
            name="document"
            :state="valid"
          >
            <b-col sm="12">
              <label for="mail">CPF</label>
              <b-form-input
                id="document"
                type="text"
                v-model="form.document.text"
                :state="touched ? valid : null">
              </b-form-input>
            </b-col>
          <span class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </b-row>

        <b-row class="my-1">
          <ValidationProvider
            v-slot="{ errors, valid, touched }"
            :rules="'required|maskedPhone'"
            name="phone"
            :state="valid"
          >
            <b-col sm="12">
              <label for="phone">Telefone</label>
              <b-form-input
                id="phone"
                type="text"
                v-model="form.phone.text"
                :state="touched ? valid : null"
                v-mask="'(##) #####-####'" >
              </b-form-input>
            </b-col>
          <span class="error">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </b-row>
      </div>

      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          @click="$bvModal.hide(idModal)"> 
          {{ cancel }}
        </button>
        <button
          type="button"
          :disabled="!valid"
          class="btn btn-primary"
          :class="{ 'disabled' : false }"
          @click="submit">
            {{ ok }}
        </button>
      </div>
    </ValidationObserver>  
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import {mask} from 'vue-the-mask'

export default {
  name: 'modal-create-contact',

  directives: {mask},

  props: {
    typeModal: {
      type: String,
      default: 'create'
    },
    ok: {
      type: String,
      default: 'Salvar'
    },
    cancel: {
      type: String,
      default: 'Cancelar'
    },
  },

  data() {
    return {
      form: {
        name: {
          text: ''
        },
        mail: {
          text: ''
        },
        phone: {
          text: ''
        },
        document: {
          text: ''
        },
      },

      idModal: ''
    }
  },

  created() {
    if(this.typeModal == 'edit') {
      const _self = this
      const recoverItem = this.listData.filter((item) => {
        if(item.id == _self.selectedItem.id) return item
      })
      this.form = {
        name: {
          text: recoverItem[0].nome
        },
        mail: {
          text: recoverItem[0].email
        },
        phone: {
          text: recoverItem[0].telefone
        },
        document: {
          text: recoverItem[0].cpf
        }
      }

      this.idModal = 'modal-edit-contact'
    } else {
      this.idModal = 'modal-create-contact'
    }
  },

  computed: {
    ...mapGetters({
      listData: 'listData',
      selectedItem: 'selectedItem'
    }),
  },

  methods: {
    ...mapActions({
      setListData: 'setListData',
      updateItemModal: 'updateItemModal'
    }),

    async submit() {
      const isValid = await this.$refs.observer.validate()
      const _self = this
      if (isValid) {
        let prevent
        prevent =  this.form.name.text.replace(/\s\s+/g, ' ')
        prevent = prevent.split(' ')
        prevent = prevent[0].charAt(0)
        let preventObj = { item: prevent, color: _self.randomBgColor() } 

        let number = Math.random()
        number.toString(36)
        let id = number.toString(36).substr(2, 9)
        let idCheck = this.typeModal == 'edit' ? this.selectedItem.id : id

        const formatItem = {
          prevent: preventObj,
          nome: this.form.name.text,
          cpf: this.form.document.text,
          email: this.form.mail.text,
          telefone: this.form.phone.text,
          editar: '',
          id: idCheck,
        }
        if(this.typeModal == 'create') this.createItem(formatItem)
        else if (this.typeModal == 'edit') this.editItem(formatItem)
      }
    },

    createItem(formatItem) {
      this.setListData(formatItem)
      this.$bvModal.hide(this.idModal)
      this.$emit('createdSuccess')
    },

    editItem(formatItem) {
      this.updateItemModal(formatItem)
      this.$bvModal.hide(this.idModal)
      this.$emit('editSuccess')
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
@import '@/assets/scss/global.scss';

label {
  @include formatText(14px, normal);
  color: #2a2d3b;
}

input {
  border: 1px solid #c0c3d2;
  height: 32px;

  &.is-invalid {
    color: #dc3545;
  }

  &.is-valid {
    color: #28a745;
  }
}

.form {
  padding:30px;

  div {
    &:nth-child(2), &:nth-child(1) {
      span {
        width: 100%;
      }
    }

    .error {
      color: #dc3545;
      font-size: 12px;
      margin-left: 15px;
    }
  }
}
</style>
