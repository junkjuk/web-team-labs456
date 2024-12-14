"use client"
import {When} from "react-if";

export interface gridVal {
  value: string[];
  id: string;
}

export interface gridComponentProps {
  columns: string[],
  values: gridVal[];
  onDelete: (id: string) => void;
}

export default function GridComponent(props: gridComponentProps) {

  const gridClass5 = "grid grid-cols-[200px_repeat(5,_1fr)] w-full";
  const gridClass4 = "grid grid-cols-[200px_repeat(4,_1fr)] w-full";
  const gridClass3 = "grid grid-cols-[200px_repeat(3,_1fr)] w-full";
  const gridClass6 = "grid grid-cols-[200px_repeat(6,_1fr)] w-full";
  console.log(props.columns.length, props.columns);
  const getClass = (numb: number) => {
    switch (numb) {
      case 5:
        return gridClass5;
      case 4:
        return gridClass4;
      case 3:
        return gridClass3;
      case 6:
        return gridClass6;
    }
  }
  return (
    <div className={getClass(props.columns.length - 1)}>
      <When condition={!!props.columns && props.columns.length !== 0}>
        {() => <>{props.columns?.map(i => <div className="w-fit" key={i}>{i}</div>)}</>}
      </When>
      {
        props.values.map((item) => (
            <>
              {
                item.value.map(i => <div className="w-fit" key={item.id + i}>{i}</div>)
              }
              <button className="w-fit" onClick={() => props.onDelete(item.id)}>
                Delete
              </button></>
        ))
      }
    </div>
  )
}
