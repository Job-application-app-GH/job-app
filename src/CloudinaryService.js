const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'capstone-job-app',
  api_key: '874785852331275',
  api_secret: 'ppf1Iqpvz8aIBkjUumG_1UZFkwc',
})

module.exports = {cloudinary}
