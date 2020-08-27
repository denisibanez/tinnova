<template>
  <button class="button" @click="showModal">
    <img src="../assets/images/ic-plus.svg" class="ic_plus">
    Criar contato
  </button>
</template>

<script>

export default {
  name: 'button-component',

  props: {
    openModal: {
      type: String,
      default: 'modal-create-contact'
    }
  },

  methods: {
    showModal() {
      this.$bvModal.show(this.openModal)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

.button {
  width: 144px;
  height: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: #dbff90;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fa7268;
  @include formatText(14px, 500);

  &:focus, &:active {
    background-color: #dbff90;
    color:  #fa7268;
    outline: none !important;
    border: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16) !important;
    border: solid 1px rgba(255, 255, 255, 0.16);
  }

  img {
    margin-right: 5px;
  }
}
</style>