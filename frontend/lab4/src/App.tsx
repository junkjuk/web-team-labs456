import './App.css'
import {BrowserRouter, Route, Routes} from "react-router";
import CarComponent from "./car";
import ClientsComponent from "./clients";
import ManagersComponent from "./managers";
import OrderComponent from "./orders";
import CarPage from "./car/car.tsx";

function App() {

  return (
    <div className="w-full">
      <nav className="row-start-3 w-1/2 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/"
        >
          Home
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/car"
        >
          Cars
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/clients"
        >
          Clients
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/managers"
        >
          Managers
        </a>

        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/orders"
        >
          Orders
        </a>

      </nav>
      <div className="h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/car" element={<CarComponent/>}/>
            <Route path="/car/:id" element={<CarPage/>}/>
            <Route path="/clients" element={<ClientsComponent/>}/>
            <Route path="/managers" element={<ManagersComponent/>}/>
            <Route path="/orders" element={<OrderComponent/>}/>
          </Routes>
        </BrowserRouter>
      </div>

    </div>
  )
}

export default App
