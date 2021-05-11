module.exports = {
    pwa: {
      manifestOptions: {
        name: 'Funny Jokes',
        start_url: './',
        display: 'standalone',
        background_color: '#3d3d3d',
        themeColor: 'steelblue',
      },
      workboxOptions: {
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            options: {
              networkTimeoutSeconds: 5
            },
            urlPattern: 'https://v2.jokeapi.dev/joke/Any?type=twopart'
          }
        ]
      }
    }
  }