export default ({$axios, $notify, redirect, store}) => {
  $axios.onError(error => {

    switch (error.response.status) {
      case 422: // for Validation errors
        store.dispatch('validation/setErrors', error.response.data.errors)
        break
      case 401:
        $notify.error({
          message: error.response.data.error,
          buttons: [
            ['<button =to="/auth">ورود به حساب کاربری</button>', (instance, toast) => {
              instance.hide({
                transitionOut: 'fadeOutUp',
                onClosing: (instance, toast, closedBy) => {
                  redirect('/auth')
                }
              }, toast, 'buttonName');
            }]
          ]
        })
        break
      default:
        $notify.error({
          message: error.response.data.error
        })
        break
    }

    return Promise.reject(error)
  })

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })
}
