import { register } from 'register-service-worker'
import { Notify, Loading } from 'quasar'

register(process.env.SERVICE_WORKER_FILE, {
  registrationOptions: { scope: './' },

  ready (/* registration */) {
    console.debug('Service worker is active.') // eslint-disable-line no-console
  },

  registered (/* registration */) {
    console.debug('Service worker has been registered.') // eslint-disable-line no-console
  },

  cached (/* registration */) {
    console.debug('Content has been cached for offline use.') // eslint-disable-line no-console
  },

  updatefound (/* registration */) {
    console.debug('New content is downloading.') // eslint-disable-line no-console
  },

  updated (/* registration */) {
    console.debug('New content is available; please refresh.') // eslint-disable-line no-console
    Notify.create({
      message: 'A new version is available!',
      icon: 'cloud_download',
      timeout: 15000,
      actions: [{
        label: "Update Now",
        color: "secondary",
        handler: () => {
          Loading.show()
          location.reload(true)
        }
      }]
    })
  },

  offline () {
    console.warn('No internet connection found. App is running in offline mode.') // eslint-disable-line no-console
  },

  error (err) {
    console.error('Error during service worker registration:', err) // eslint-disable-line no-console
  }
})
