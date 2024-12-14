
export interface LayoutProps {
  childrenLeft: string | JSX.Element | JSX.Element[]
  titleLeft: string,
  childrenRight: string | JSX.Element | JSX.Element[]
  titleRight: string,
}

export default function Layout(props: LayoutProps) {

  return (<>
    <div className="flex h-full flex-col gap-2 items-center sm:items-start">
      <h1>{props.titleLeft}</h1>

      <div className="flex flex-row w-full items-center sm:items-start">
        <div className="w-1/2 mr-32">
          {props.childrenLeft}
        </div>
        <div className="w-1/2 text-start">

          <h2>{props.titleRight}</h2>
          {props.childrenRight}
        </div>
      </div>

    </div>
  </>);
}