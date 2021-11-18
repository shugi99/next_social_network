const cloudinary = require('cloudinary')

// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadCtrl = {
  upload: async (req, res) => {
    try {
      let result = await cloudinary.uploader.upload(req.body.image, {
        public_id: `${Date.now()}`,
        resource_type: 'auto', // jpeg, png
      })
      res.json({
        public_id: result.public_id,
        url: result.secure_url,
      })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  remove: async (req, res) => {
    let image_id = req.body.public_id

    cloudinary.uploader.destroy(image_id, (err, result) => {
      if (err) return res.json({ success: false, err })
      res.send('ok')
    })
  },
}

module.exports = uploadCtrl
