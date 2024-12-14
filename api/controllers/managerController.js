const catchAsync = require('../utils/catchAsync');
const Manager = require('../models/managerModel');

exports.createManager = catchAsync(async (req, res, next) => {
  const newManager = await Manager.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      manager: newManager,
    },
  });
});

exports.getAllManagers = catchAsync(async (req, res, next) => {
  const managers = await Manager.find({});
  res.status(200).json({
    status: 'success',
    results: managers.length,
    data: {
      managers: managers,
    },
  });
});

exports.getManager = catchAsync(async (req, res, next) => {
  const manager = await Manager.findById(req.params.id);

  if (!manager) {
    return res.status(404).json({ 
      status: 'error',
      message: 'Manager with this id could not be found'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      manager: manager,
    },
  });
});

exports.updateManager = catchAsync(async (req, res, next) => {
  const updatedManager = await Manager.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedManager) {
    return res.status(404).json({ 
      status: 'error',
      message: 'Manager with this id could not be found'
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      manager: updatedManager,
    },
  });
});

exports.deleteManager = catchAsync(async (req, res, next) => {
  const manager = await Manager.findByIdAndDelete(req.params.id);

  if (!manager) {
    return res.status(404).json({ 
      status: 'error',
      message: 'Manager with this id could not be found'
    })
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});