"use client"

import React, {useEffect} from "react";
import {Manager} from "./types.tsx";
import GridComponent, {gridVal} from "../components/gridComponent.tsx";
import {get, post, remove} from "../utils.tsx";
import {apiUrl} from "../consts.tsx";
import {When} from "react-if";
import Layout from "../layout.tsx";

export default function ManagersComponent() {
  const [cars, setCars] = React.useState<Manager[]>([]);
  const [newManager, setNewManager] = React.useState<Manager>({
    _id: "",
    full_name: "",
    sex: "",
    age: 0
  });

  useEffect(() => {
    get(apiUrl + 'managers').then(res => setCars(res.managers));
  }, []);

  const deleteItem = async (id: string) => {
    await remove(apiUrl + 'managers/' + id)
    location.reload()
  }
  const add = async () => {
    console.log(newManager);
    await post(apiUrl + 'managers', {
      full_name: newManager.full_name,
      sex: newManager.sex,
      age: newManager.age
    });

  }

  const createNewClient = (c: Manager) : Manager => {
    return {...c};
  }


  return <Layout titleRight={"Add manager"} titleLeft={"Managers"}
    childrenLeft={<><When condition={cars?.length !== 0}>
      <GridComponent columns={["id", "full_name", "age", "sex", "Delete"]} onDelete={deleteItem}
                     values={cars.map(car => clientToValues(car))}/>
    </When></>}
    childrenRight={<form>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <input type="text" placeholder="full_name" onChange={(e) => setNewManager(c => {
          const car = createNewClient(c)
          car.full_name = e.target.value;
          return car;
        })}/>
        <input type="text" placeholder="age" onChange={(e) => setNewManager(c => {
          const car = createNewClient(c)

          car.age = +e.target.value;
          return car;
        })}/>
        <input type="text" placeholder="sex" onChange={(e) => setNewManager(c => {
          const car = createNewClient(c)

          car.sex = e.target.value;
          return car;
        })}/>
        <button onClick={add}>Add</button>
      </div>
    </form>}
  />

}

function clientToValues(item: Manager): gridVal {
  return {
    id: item._id,
    value: [
      item._id,
      item.full_name,
      item.age.toString(),
      item.sex
    ]
  };
}