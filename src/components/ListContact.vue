<template>
  <div class="list-contact-wrapper">
    <b-table
      v-if="searchByParam.length"
      hover
      :items="searchByParam"
      :class="{ 'highlite' : highlite }"
      ref="selectableTable"
      :stickyColumn="true"
      responsive="md">
      <template v-slot:cell(prevent)="data">
        <div class="prevent" :style="{ background: data.value.color }">
          <span style="text-transform: uppercase;">{{ data.value.item }}</span>
        </div>
      </template>
      <template v-slot:cell(editar)="row">
        <div class="buttons">
          <img src="../assets/images/ic-edit.svg" alt="" @click="info(row.item, row.index, $event.target, 'modal-edit-contact')">
          <img src="../assets/images/ic-delete.svg" alt="" @click="info(row.item, row.index, $event.target, 'modal-delete-contact')">
        </div>
      </template>      
    </b-table>

    <b-alert v-else show variant="warning">
      Não encontramos nenhum resultado. :(
    </b-alert>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'list-contact',

  data() {
    return {
      selected: []
    }
  },

  computed: {
    ...mapGetters({
      listData: 'listData',
      highlite: 'highlite',
      search: 'search',
    }),

    searchByParam() {
      if(this.listData && this.search) {
        
        let items = []
        this.listData.filter(item => {
          const _self = this
          let contains = item.nome.toLowerCase().includes(_self.search.toLowerCase())
          if(contains) items.push(item)
        })  
        return items
      } else {
        
        return this.listData
      }
    },
  },

  methods: {
    ...mapActions({
      updateSelectedITem: 'selectedItem',
      updateAllList: 'updateAllList'
    }),

    info(item,index, target, idModal) {
      this.selected = []
      this.selected = item
      
      this.updateSelectedITem(this.selected)
      this.$bvModal.show(idModal)
    },
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

.list-contact-wrapper {
  margin: 30px 0;

  .b-table {
    border: 1px solid #e1e1e1;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #ffffff;

    thead {
      th {
        border: 0;

        div {
          color: #9198af;
          @include formatText(13px, normal);
        }

        &:first-child {
          width: 50px;
        }

        &:nth-child(6), &:first-child {
          div {
            display: none;
          }
        }

        &:last-child {
          display: none;
        }
      }
    }

    tr {
      border: 1px solid #e1e1e1;

      &:hover {
        background-color: #fff3f2;
      }
    }

    td {
      border: 0;
      color: #2a2d3b;
      @include formatText(14px, normal);

      &:last-child {
        display: none;
      }
    }

    .buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      img {
        margin: 0 10px;
        cursor: pointer;
      }
    }

    .prevent {
      width: 24px;
      height: 24px;
      background-color: #fa8d68;
      border-radius: 50%;
      padding: 2px 7px;

      span {
        color: #ffffff;
        @include formatText(16px, normal);
      }
    }
  }

  .highlite {
   tbody {
    tr {

      &:last-child {
        background-color: #fff3f2
      }
    }
   }
  }
}
</style>