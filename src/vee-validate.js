import Vue from 'vue'
import { localize, ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'

extend('required', required)

extend('namePerson', {
  validate: function ($event) {
    const regex = /^[A-z\-'ÀÁÂÃÇÈÉÊÌÍàáâãçèéêìíÒÓÔÕÙÚòóôõùú]{2,50}(?: [A-z\-'ÀÁÂÃÇÈÉÊÌÍàáâãçèéêìíÒÓÔÕÙÚòóôõùú]{1,50})+ ?$/

    return regex.test($event)
  },
  message: 'Insira o nome completo'
})

extend('email', {
  validate: function ($event) {
    const regex = /^(([^<>()[\]\\.,;:\-_\s@"'ÀÁÂÃÇÈÉÊÌÍàáâãçèéêìíÒÓÔÕÙÚòóôõùú+]+(((\.)|(-)|(_))[^<>()[\]\\.,;:\-_\s@"'ÀÁÂÃÇÈÉÊÌÍàáâãçèéêìíÒÓÔÕÙÚòóôõùú+]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test($event)
  },
  message: 'Insira um e-mail válido'
})

extend('maskedPhone', {
  validate: function ($event) {
    const regex = /^(?:\(?([1-9*]{2})\)?[ ]?)((?:9)([0-9*]{4})|[1-8*]([1-9*]{3}))[-. ]?([0-9*]{4})$/
    return regex.test($event)
  },
  message: 'Insira um telefone válido'
})

extend('cpfCheck', {
  validate: function ($event) {
    const regex = /^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/
    return regex.test($event)
  },
  message: 'Insira um cpf válido'
})

localize({
  en: {
    messages: {
      required: 'O campo é obrigatório'
    }
  }
})
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)