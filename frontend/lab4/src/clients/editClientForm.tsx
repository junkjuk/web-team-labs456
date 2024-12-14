import React from "react";
import {Client} from "./types.tsx";
import {When} from "react-if";

export interface EditClientFormProps {
  onSubmit: (c: Client) => void,
  client: Client,
}

export default function EditClientForm(props: EditClientFormProps) {
  const [newClient, setNewClient] = React.useState<Client>({...props.client});
  React.useEffect(() => {
    setNewClient(props.client);
  }, [props.client])
  console.log(props.client);
  console.log(newClient);
  return <>
    <When condition={!!newClient && newClient.id}>
      {() => <form>
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <input type="text" value={newClient.full_name} placeholder="full_name" onChange={(e) => setNewClient(c => {
            const car = {...c}
            car.full_name = e.target.value;
            return car;
          })}/>
          <input type="text" value={newClient.email} placeholder="email" onChange={(e) => setNewClient(c => {
            const car = {...c}
            car.email = e.target.value;
            return car;
          })}/>
          <input type="text" value={newClient.age} placeholder="age" onChange={(e) => setNewClient(c => {
            const car = {...c}
            car.age = e.target.value;
            return car;
          })}/>
          <input type="text" value={newClient.sex} placeholder="sex" onChange={(e) => setNewClient(c => {
            const car = {...c}
            car.sex = e.target.value;
            return car;
          })}/>
          <button onClick={() => props.onSubmit(newClient)}>Add</button>
        </div>
      </form>}
    </When>
  </>
}