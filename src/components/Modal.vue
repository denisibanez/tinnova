<template>
  <b-modal
    :id="idModal"
    :title="title"
    :hide-footer="true">
      <slot name="content"></slot>
  </b-modal>
</template>

<script>
export default {
  name: 'modal',

  props: {
    idModal: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Criar novo contato'
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

.modal-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

    .modal-content {
      border-radius: 16px;

      .modal-header {
        border-bottom: #c0c3d2 1px solid;
      }

      .modal-body {
        padding: 0;
      }

      .modal-footer {
        border-top: #c0c3d2 1px solid;
        height: 60px;

        .btn-secondary {
          color: #fa7268;
          background-color: transparent;
          border: 0;
          @include formatText(14px, normal);

          &:focus, &:active {
            background-color: transparent;
            outline: none;
            border: 0;
            color: #fa7268;
            box-shadow: none !important;
          }
        }

        .btn-primary {
          width: 100px;
          height: 30px;
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
      }
    }  
}

</style>