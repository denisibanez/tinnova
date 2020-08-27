<template>
  <button class="button" @click="showModal">
    Cadastrar
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
  height: 80px;
  border-radius: 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16);
  border: solid 1px rgba(255, 255, 255, 0.16);
  background-color: #00c8b3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  @include formatText(14px, 500);

  &:focus, &:active, &:hover {
    opacity: 0.7;
    outline: none !important;
    border: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16) !important;
  }

  &:disabled {
    color: #dddcdc;
    background: #f6f6f6;
  }
}
</style>