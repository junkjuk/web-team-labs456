const path = require('path');
const fs = require('node:fs/promises');
const fsSync = require('fs');
const PostgresCrud = require('../utils/postgresCrud');
const catchAsync = require('../utils/catchAsync');
const Car = require('../models/carModel');

const carCrud = new PostgresCrud(Car, 'Car');

exports.createCar = carCrud.create();
exports.getCar = carCrud.get();
exports.getAllCars = carCrud.getAll();
exports.updateCar = carCrud.update();
exports.deleteCar = carCrud.delete();


// Blob image middleware
exports.addBlobImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);
  if (!car) {
    return res.status(404).json({ status: 'error', message: 'Car not found' });
  }

  if (!req.file) {
    return res.status(400).json({ status: 'error', message: 'No image file provided' });
  }

  car.image_blob = req.file.buffer;
  car.image_blob_mime_type = req.file.mimetype
  await car.save();

  res.status(200).json({ status: 'success', message: 'Image uploaded as blob', data: { car } });
});

exports.getBlobImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ status: 'error', message: 'Car not found' });
  }

  if (!car.image_blob) {
    return res.status(404).json({ status: 'error', message: 'Image not found' });
  }

  const mimeType = car.image_blob_mime_type;
  res.set('Content-Type', mimeType);
  res.status(200).send(car.image_blob);
});

exports.deleteBlobImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ status: 'error', message: 'Car not found' });
  }

  car.image_blob = null
  car.image_blob_mime_type = null
  await car.save()

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Path image middleware
exports.addPathImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);
  if (!car) {
    return res.status(404).json({ error: 'Car not found' });
  }

  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }

  const destDir = path.join('/data/images');
  const destPath = path.join(destDir, `car_image_${car.id}.${req.file.mimetype.split('/')[1]}`);
  await fs.writeFile(destPath, req.file.buffer, (err) => {
    if (err) {
      throw err;
    } else {
      console.log('Image saved successfully');
    }
  });

  if (!fsSync.existsSync(destDir)) {
    fsSync.mkdirSync(destDir, { recursive: true });
  }

  car.image_path = destPath;
  await car.save();

  res.status(200).json({ status: 'Success', data:  { car } });
});

exports.getPathImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ status: 'error', message: 'Car not found' });
  }

  if (!car.image_path) {
    return res.status(404).json({ status: 'error', message: 'Image not found' });
  }

  try {
    const data = await fs.readFile(car.image_path)
    let mimeType = 'image/' + car.image_path.split('.')[1]
    res.set('Content-Type', mimeType);
    res.status(200).send(data);
  } catch (err) {
    if (err.code == 'ENOENT') {
      return res.status(404).json({ status: 'error', message: 'Image not found' });
    } else {
      console.log(err);
      return res.status(500).json({ status: 'err', message: 'Internal server error' });
    }
  }
});

exports.deletePathImage = catchAsync(async (req, res) => {
  const car = await Car.findByPk(req.params.id);

  if (!car) {
    return res.status(404).json({ status: 'error', message: 'Car not found' });
  }

  if (!car.image_path) {
    return res.status(404).json({ status: 'error', message: 'Image not found' });
  }

  await fs.unlink(car.image_path, (err) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ status: 'error', message: 'Image deletion failed' });
    } else {
      car.image_path = null
      console.log("File deleted successfully");
    }
  })

  await car.save()

  res.status(204).json({
    status: 'success',
    data: null,
  });
});