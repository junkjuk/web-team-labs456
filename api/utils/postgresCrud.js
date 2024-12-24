const catchAsync = require('./catchAsync');
const {Op} = require("sequelize");
const logMessage = require("../logger/logger");

class PostgresCrud {
  constructor(model, name) {
    this.model = model;
    this.name = name;
  }

  create() {
    return catchAsync(async (req, res, next) => {
      console.log(req.body);
      const obj = await this.model.create(req.body)
      logMessage(this.name + " Create", req.body);
      res.status(200).json({
        status: 'success',
        [this.name.toLowerCase()]: obj
      })
    });
  }

  getByFullName() {
    return catchAsync(async (req, res, next) => {
      const obj = await this.model.findAll({
        where: {
          full_name: {
            [Op.substring]: req.params.fullName
          },
        },
      });

      if (!obj) {
        return res.status(404).json({
          status: 'error',
          message: `${this.name} with this id could not be found`
        })
      }

      res.status(200).json({
        status: 'success',
        data: {
          [this.name.toLowerCase()]: obj
        },
      });
    });
  }

  get() {
    return catchAsync(async (req, res, next) => {
      const obj = await this.model.findByPk(req.params.id);
      logMessage(this.name + " Get", req.params.id);

      if (!obj) {
        return res.status(404).json({ 
          status: 'error',
          message: `${this.name} with this id could not be found`
        })
      }
    
      res.status(200).json({
        status: 'success',
        data: {
          [this.name.toLowerCase()]: obj
        },
      });
    });
  }

  getAll() {
    return catchAsync(async (req, res, next) => {
      const objs = await this.model.findAll()
      logMessage(this.name + " Get", "all");

      res.status(200).json({
        status: 'success',
        results: objs.length,
        data: {
          [`${this.name.toLowerCase()}s`]: objs
        },
      });
    });
  }

  updateCar() {
    return catchAsync(async (req, res, next) => {
      console.log(req.body);
      console.log(req.params);
      const car = {
        car_type: req.body.car_type,
        price: req.body.price,
        mileage: req.body.mileage,
        condition: req.body.condition,
      }
      console.log(car);

      const obj = await this.model.update(car, {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
      logMessage(this.name + " Update", req.body);

      if (!obj) {
        return res.status(404).json({ 
          status: 'error',
          message: `${this.name} with this id could not be found`
        })
      }
      
      res.status(200).json({
        status: 'success',
        data: {
          [this.name.toLowerCase()]: obj[1]['dataValues']
        },
      });
    });
  }

  update() {
    return catchAsync(async (req, res, next) => {
      const obj = await this.model.update(req.body, {
        where: {
          id: req.params.id
        },
        returning: true,
        plain: true
      })
      logMessage(this.name + " Update", req.body);

      if (!obj) {
        return res.status(404).json({
          status: 'error',
          message: `${this.name} with this id could not be found`
        })
      }

      res.status(200).json({
        status: 'success',
        data: {
          [this.name.toLowerCase()]: obj[1]['dataValues']
        },
      });
    });
  }

  delete() {
    return catchAsync(async (req, res, next) => {
      await this.model.destroy({
        where: {
          id: req.params.id
        }
      })
      logMessage(this.name + " Delete", req.body);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    });
  }
}

module.exports = PostgresCrud;
