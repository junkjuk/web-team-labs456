import React from "react";
import {Client} from "./types.tsx";
import {v4 as uuidv4} from "uuid";

export interface NewClientFormProps {
  onSubmit: (c: Client) => void
}

export default function NewClientForm(props: NewClientFormProps) {

  const [newClient, setNewClient] = React.useState<Client>({
    id: "",
    full_name: "",
    email: "",
    age: "",
    sex: "",
  });

  const createNewClient = (c: Client) : Client => {
    const car = {...c};
    car.id = uuidv4();
    return car;
  }

  return <>
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
        <button onClick={() => props.onSubmit(newClient)}>Add</button>
      </div>
    </form>
  </>
}