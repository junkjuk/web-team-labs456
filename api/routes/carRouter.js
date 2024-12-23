const express = require('express');
const multer = require('multer');
const carController = require('../controllers/carController');

const router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Attached file has incorrect format!"));
    }
  },
});

router.route('/')
  .get(carController.getAllCars)
  .post(carController.createCar)

router.route('/:id')
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar)

router.route('/:id/image_blob')
  .patch(upload.single('image'), carController.addBlobImage)
  .get(carController.getBlobImage)
  .delete(carController.deleteBlobImage)

router.route('/:id/image_path')
  .patch(upload.single('image'), carController.addPathImage)
  .get(carController.getPathImage)
  .delete(carController.deletePathImage)

module.exports = router;