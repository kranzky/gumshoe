const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const packageVersion = JSON.parse(packageJson).version || '?'
module.exports = function(ctx) {
  return {
    boot: ["addressbar-color", "axios", "lodash"],

    css: ["app.styl"],

    extras: ["roboto-font", "material-icons", "material-icons-outlined"],

    framework: {
      components: [
        "QLayout",
        "QHeader",
        "QDrawer",
        "QPageContainer",
        "QPage",
        "QToolbar",
        "QToolbarTitle",
        "QBtn",
        "QIcon",
        "QList",
        "QItem",
        "QItemSection",
        "QItemLabel",
        "QAvatar",
        "QMenu",
        "QCard",
        "QInput"
      ],

      directives: ["ClosePopup", "Ripple"],

      plugins: [
        "AddressbarColor",
        "Dialog",
        "LoadingBar",
        "Notify",
        "LocalStorage",
        "SessionStorage",
        "Loading"
      ],

      config: {
        loadingBar: {
          size: "3px",
          color: "info"
        },
        loading: {
          delay: 0,
          message: "Just a moment..."
        }
      }
    },

    build: {
      devtool: 'source-map',
      distDir: "www",
      publicPath: "/",
      scopeHoisting: true,
      vueRouterMode: "history",
      extendWebpack(cfg) {
        cfg.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /node_modules/,
          options: {
            formatter: require("eslint").CLIEngine.getFormatter("stylish")
          }
        });
      },
      env: {
        PACKAGE_VERSION: packageVersion
      }
    },

    devServer: {
      open: true,
      proxy: {
        "/": {
          target: "http://gumshoe.test",
          changeOrigin: true
        }
      }
    },

    animations: ["fadeIn", "fadeOut", "fadeInDown", "fadeOutUp", "zoomIn", "zoomOut"],

    ssr: {
      pwa: false
    },

    pwa: {
      workboxOptions: {
        skipWaiting: true,
        clientsClaim: true
      },
      manifest: {
        name: "Gumshoe",
        short_name: "Gumshoe",
        description: "Procedural noir detective world",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        display: "fullscreen",
        orientation: "portrait-primary",
        background_color: "#212121",
        theme_color: "#00796b",
        categories: ["entertainment", "games"]
      }
    },

    cordova: {},

    electron: {
      extendWebpack(cfg) {},
      packager: {},
      builder: {}
    }
  };
};
