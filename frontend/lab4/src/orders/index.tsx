"use client"

import React, {useEffect} from "react";
import {Order} from "./types.tsx";
import GridComponent, {gridVal} from "../components/gridComponent.tsx";
import {get, post, remove} from "../utils.tsx";
import {apiUrl} from "../consts.tsx";
import {When} from "react-if";
import Layout from "../layout.tsx";
import {v4 as uuidv4} from "uuid";

export default function OrderComponent() {
  const [cars, setCars] = React.useState<Order[]>([]);
  const [newOrder, setNewOrder] = React.useState<Order>({
    id: "",
    car_id: "",
    client_id: "",
    discount: 0,
  });
  useEffect(() => {
    get(apiUrl + 'orders').then(res => setCars(res.carorders));
  }, []);

  const deleteItem = async (id: string) => {
    await remove(apiUrl + 'orders/' + id)
    location.reload()
  }

  const createNewClient = (c: Order) : Order => {
    const car = {...c};
    car.id = uuidv4();
    return car;
  }

  const add = async () => {
    console.log(newOrder);
    await post(apiUrl + 'orders', newOrder);

  }

  return <Layout titleRight={"Add manager"} titleLeft={"Managers"}
    childrenLeft={<>
      <When condition={cars?.length !== 0}>
        <GridComponent columns={["id", "car_id", "client_id", "discount", "Delete"]} onDelete={deleteItem}
                       values={cars.map(car => orderToValues(car))}/>
      </When>
    </>}
    childrenRight={<>
      <form>
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <input type="text" placeholder="car_id" onChange={(e) => setNewOrder(c => {
            const car = createNewClient(c)
            car.car_id = e.target.value;
            return car;
          })}/>
          <input type="text" placeholder="client_id" onChange={(e) => setNewOrder(c => {
            const car = createNewClient(c)
            car.client_id = e.target.value;
            return car;
          })}/>
          <input type="number" placeholder="discount" onChange={(e) => setNewOrder(c => {
            const car = createNewClient(c)
            car.discount = +e.target.value;
            return car;
          })}/>
          <button onClick={add}>Add</button>
        </div>
      </form>
    </>}

  />;
}

function orderToValues(item: Order): gridVal {
  return {
    id: item.id,
    value: [item.id, item.car_id, item.client_id, item.discount.toString()]
  };
}