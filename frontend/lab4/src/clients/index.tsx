"use client"

import React, {useEffect} from "react";
import {Client} from "./types.tsx";
import GridComponent, {gridVal} from "../components/gridComponent.tsx";
import {apiUrl} from "../consts.tsx";
import {data} from "autoprefixer";
import {When} from "react-if";
import {get, patch, post, remove} from "../utils.tsx";
import Layout from "../layout.tsx";
import NewClientForm from "./newClientForm.tsx";
import EditClientForm from "./editClientForm.tsx";

export default function ClientsComponent() {
  const [cars, setCars] = React.useState<Client[]>([]);
  const [editClient, setEditClient] = React.useState<Client>();
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

  const add = (c: Client) => {
    post(apiUrl + 'clients', c);
  }

  const edit = (c: Client) => {
    patch(apiUrl + 'clients/' + c.id, c);
  }

  const selectEditClient = (id: string) => {
    const client = cars.find((c) => c.id === id);
    console.log(client);
    setEditClient(client);
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
        "Delete"]} onDelete={deleteItem} values={cars.map(car => clientToValues(car))}
      onEdit={selectEditClient}/>
    </When></>} titleLeft="Clients" childrenRight={
    <>
      <NewClientForm onSubmit={add} />
      <EditClientForm onSubmit={edit} client={editClient} />
    </>
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