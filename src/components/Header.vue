<template>
  <div class="create-contact-header">
    <div class="row">
      <div class="col-md-8">
        <div class="create-contact-logo">
          <router-link to="/">
            <img src="../assets/images/ic-logo.svg" alt="">
          </router-link>
          <button-component v-if="haveBtn" />
        </div>
      </div>

      <div class="col-md-4">
        <div class="create-contact-search" v-if="listData.length">
          <b-input-group-prepend>
            <b-form-input v-model="text" placeholder="Buscar ..."></b-form-input>
            <b-icon-search></b-icon-search>
          </b-input-group-prepend>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ButtonComponent from '@/components/ButtonComponent'

export default {
  name: 'header-component',

  components: {
    ButtonComponent
  },

  data () {
    return {
      text: null
    }
  },

  props: {
    haveBtn: {
      type: Number,
      default: 0
    }
  },

  computed: {
    ...mapGetters({
      listData: 'listData'
    })
  },

  methods: {
    ...mapActions({
      updateSearch: 'updateSearch'
    }),
  },

  watch: {
    text(value) {
      this.updateSearch(value)
    }
  }
}
</script>

<style lang="scss">

.create-contact-header {
  margin-top: 15px;

  .create-contact-logo {
    display: flex;
    button {
      margin-left: 50px;
      height: 30px;
    }
  }

  .create-contact-search {
    input[type="text"] {
      background-color: #e4e7f4;
      height: 30px;

      &::placeholder {
        color: #9198af;
      }
    }

    svg {
      color: #9198af;
      position: absolute;
      right: 25px;
      top: 7px;
    }
  }
}

@media(max-width: 580px) {
  .create-contact-header {
    .create-contact-logo {
      margin-bottom: 25px;
    }
  }
}
</style>