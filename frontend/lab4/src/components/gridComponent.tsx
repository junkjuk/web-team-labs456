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

  const gridClass = "grid grid-cols-[200px_repeat(colNumbs,_1fr)] w-full";
  console.log(props.columns.length, props.columns);
  return (
    <div className={gridClass.replace("colNumbs", (props.columns.length - 1).toString())}>
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
