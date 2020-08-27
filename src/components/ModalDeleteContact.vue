<template>
  <div>
    <div class="form">
      <p>Deseja realmente excluir o contato?</p>
    </div>

    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-secondary"
        @click="$bvModal.hide('modal-delete-contact')"> {{ cancel }}</button>
      <button 
        type="button"
        class="btn btn-primary"
        @click="submit">{{ ok }}</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'modal-delete-contact',

  props: {
    ok: {
      type: String,
      default: 'Excluir'
    },
    cancel: {
      type: String,
      default: 'Cancelar'
    },
  },

   computed: {
    ...mapGetters({
      listData: 'listData',
      selectedItem: 'selectedItem'
    })
  },

  methods: {
    ...mapActions({
      updateAllList: 'updateAllList'
    }),

    submit() {
      const listsNew = this.listData.filter(x => {
        return x.id != this.selectedItem.id;
      })

      this.updateAllList(listsNew)
      this.$bvModal.hide('modal-delete-contact')
      this.$emit('deleteSuccess')
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

p {
  @include formatText(16px, normal);
  color: #2a2d3b;
}

.form {
  padding: 30px;
}
</style>
