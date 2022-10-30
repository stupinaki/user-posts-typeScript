// const { defineConfig } = require('@vue/cli-service')

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? 'http://stupinaki.github.io/user-posts-typeScript'
        : '/'
}