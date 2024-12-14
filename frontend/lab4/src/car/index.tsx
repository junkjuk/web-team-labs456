"use client"

import React, {useEffect} from "react";
import {Car} from "./types.tsx";
import GridComponent, {gridVal} from "../components/gridComponent.tsx";
import {apiUrl} from "../consts.tsx";
import {get, post, remove} from "../utils.tsx";
import { v4 as uuidv4 } from 'uuid';
import {When} from "react-if";

export default function CarComponent() {
  const [cars, setCars] = React.useState<Car[]>([]);

  const [newCar, setNewCar] = React.useState<Car>({
    id: "",
    car_type: "",
    price: 0,
    mileage: 0,
    condition: "",
  });

  const createNewCar = (c: Car) : Car => {
    const car = {...c};
    car.id = uuidv4();
    return car;
  }

  useEffect(() => {
    get(apiUrl + 'cars').then(res => setCars(res.cars));
  }, []);

  const add = async () => {
    console.log(newCar);
    await post(apiUrl + 'cars', newCar);

  }

  const deleteItem = async (id: string) => {
    await remove(apiUrl + 'cars/' + id)
    location.reload()
  }

  return <div className="flex h-full flex-col gap-2 items-center sm:items-start">
    <h1>Cars</h1>

    <div className="flex flex-row w-full items-center sm:items-start">
      <div className="w-1/2 mr-32">
        <When condition={cars?.length !== 0}>
          <GridComponent columns={["Id", "Type", "Price", "Mileage", "condition", "Delete"]} onDelete={deleteItem} values={cars.map(car => carToValues(car))}/>
        </When>
      </div>
      <div className="w-1/2 text-start">
        <h2>Add car</h2>
        <form>
          <div className="flex flex-col gap-2 items-center sm:items-start">
            <input type="text" placeholder="Car Type" onChange={(e) => setNewCar(c => {
              const car = createNewCar(c)
              car.car_type = e.target.value;
              return car;
            })}/>
            <input type="number" placeholder="Price" onChange={(e) => setNewCar(c => {
              const car = createNewCar(c)

              car.price = +e.target.value;
              return car;
            })}/>
            <input type="number" placeholder="Mileage" onChange={(e) => setNewCar(c => {
              const car = createNewCar(c)

              car.mileage = +e.target.value;
              return car;
            })}/>
            <input type="text" placeholder="Condition" onChange={(e) => setNewCar(c => {
              const car = createNewCar(c)

              car.condition = e.target.value;
              return car;
            })}/>
            <button onClick={add}>Add</button>
          </div>
        </form>
      </div>
    </div>

  </div>
}

function carToValues(car: Car): gridVal {
  return {
    id: car.id,
    value: [car.id, car.car_type, car.price.toString(), car.mileage.toString(), car.condition
    ]
  };
}