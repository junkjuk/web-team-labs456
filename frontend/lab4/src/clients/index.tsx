"use client"

import React, {useEffect} from "react";
import {Client} from "./types.tsx";
import GridComponent, {gridVal} from "../components/gridComponent.tsx";
import {apiUrl} from "../consts.tsx";
import {data} from "autoprefixer";
import {When} from "react-if";
import {get, post, remove} from "../utils.tsx";
import Layout from "../layout.tsx";
import {v4 as uuidv4} from "uuid";

export default function ClientsComponent() {
  const [cars, setCars] = React.useState<Client[]>([]);
  const [newClient, setNewClient] = React.useState<Client>({
    id: "",
    full_name: "",
    email: "",
    age: "",
    sex: "",
  });

  useEffect(() => {
    get(apiUrl + 'clients').then(res => setCars(res.clients));
  }, []);

  const filterClients = async (val: string) => {
    if (val.length == 0) {
      const res = await get(apiUrl + 'clients');
      console.log(res)
      setCars(res.clients)
      return;
    }
    const res = await get(apiUrl + 'clients/name/' + val);
    const cl = res.client;
    setCars(cl ?? [])
    console.log(data)
  }
  const deleteItem = async (id: string) => {
    await remove(apiUrl + 'clients/' + id)
    location.reload()
  }

  const add = async () => {
    console.log(newClient);
    await post(apiUrl + 'clients', newClient);

  }

  const createNewClient = (c: Client) : Client => {
    const car = {...c};
    car.id = uuidv4();
    return car;
  }

  return <Layout childrenLeft={<>
    <input type="text" className="my-8" onChange={(e) => filterClients(e.target.value)}
     placeholder={"Filter by name"}/>
    <When condition={cars?.length !== 0}>
      <GridComponent columns={["id",
        "full_name",
        "email",
        "age",
        "sex",
        "Delete"]} onDelete={deleteItem} values={cars.map(car => clientToValues(car))}/>
    </When></>} titleLeft="Clients" childrenRight={
    <form>
      <div className="flex flex-col gap-2 items-center sm:items-start">
        <input type="text" placeholder="full_name" onChange={(e) => setNewClient(c => {
          const car = createNewClient(c)
          car.full_name = e.target.value;
          return car;
        })}/>
        <input type="text" placeholder="email" onChange={(e) => setNewClient(c => {
          const car = createNewClient(c)

          car.email = e.target.value;
          return car;
        })}/>
        <input type="text" placeholder="age" onChange={(e) => setNewClient(c => {
          const car = createNewClient(c)

          car.age = e.target.value;
          return car;
        })}/>
        <input type="text" placeholder="sex" onChange={(e) => setNewClient(c => {
          const car = createNewClient(c)

          car.sex = e.target.value;
          return car;
        })}/>
        <button onClick={add}>Add</button>
      </div>
    </form>
  } titleRight={
    "Add Client"}/>;
}


function clientToValues(item: Client): gridVal {
  return {
    id: item.id,
    value: [
      item.id,
      item.full_name,
      item.email,
      item.age,
      item.sex
    ]
  };
}