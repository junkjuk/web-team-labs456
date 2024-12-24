"use client"

import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import {get, getImage, loadFile, patch} from "../utils.tsx";
import {apiUrl} from "../consts.tsx";
import {v4 as uuidv4} from "uuid";
import {Car} from "./types.tsx";
import {When} from "react-if";


export default function CarPage() {
  const params = useParams();
  const [file, setFile] = useState();
  const [fileBlob, setFileBlob] = useState();
  const [fileImage, setFileImage] = useState();
  const [fileBlobImage, setFileBlobImage] = useState();
  function handleChange(e) {
    console.log(e.target.files);
    setFile(e.target.files[0]);
    setFileImage(URL.createObjectURL(e.target.files[0]))
  }

  function handleChangeBlob(e) {
    console.log(e.target.files);
    setFileBlob(e.target.files[0]);
    setFileBlobImage(URL.createObjectURL(e.target.files[0]));
  }

  const [newCar, setNewCar] = React.useState<Car>({
    id: "",
    car_type: "",
    price: 0,
    mileage: 0,
    condition: "",
  });

  useEffect(() => {
    get(apiUrl + 'cars/' + params.id).then(res => {
      console.log(res);
      setNewCar(res.car)
    });

    getImage(apiUrl + 'cars/' + params.id + '/image_blob').then(res => {
      console.log(res);
      const imageObjectURL = URL.createObjectURL(res);
      setFileBlobImage(imageObjectURL);
    });

    getImage(apiUrl + 'cars/' + params.id + '/image_path').then(res => {
      console.log(res);
      const imageObjectURL = URL.createObjectURL(res);
      setFileImage(imageObjectURL);
    });
  }, [params.id]);

  const createNewCar = (c: Car) : Car => {
    const car = {...c};
    car.id = uuidv4();
    return car;
  }

  const add = async () => {
    console.log(newCar);
    await patch(apiUrl + 'cars/' + params.id, newCar);
  }

  const saveImageBlob = async () => {
    console.log(fileBlob);

    const fileInput = document.querySelector('#blob') ;
    const formData = new FormData();

    // @ts-ignore
    formData.append('image', fileInput.files[0]);
    await loadFile(apiUrl + 'cars/' + params.id + '/image_blob', formData);
  }

  const saveImagePath = async () => {
    console.log(file);
    const fileInput = document.querySelector('#path') ;
    const formData = new FormData();

    // @ts-ignore
    formData.append('image', fileInput.files[0]);
    // await loadFile(apiUrl + 'cars/' + params.id + '/image_blob', formData);
    await loadFile(apiUrl + 'cars/' + params.id + '/image_path', formData);
  }

  return <div className="flex h-full flex-col gap-2 items-center sm:items-start">
    <h1>Cars</h1>
    <When condition={newCar?.id !== ""}>
      <form>
        <div className="flex flex-col gap-2 items-center sm:items-start">
          <input type="text" placeholder="Car Type" value={newCar.car_type} onChange={(e) => setNewCar(c => {
            const car = createNewCar(c)
            car.car_type = e.target.value;
            return car;
          })}/>
          <input type="number" placeholder="Price" value={newCar.price} onChange={(e) => setNewCar(c => {
            const car = createNewCar(c)

            car.price = +e.target.value;
            return car;
          })}/>
          <input type="number" placeholder="Mileage" value={newCar.mileage} onChange={(e) => setNewCar(c => {
            const car = createNewCar(c)

            car.mileage = +e.target.value;
            return car;
          })}/>
          <input type="text" placeholder="Condition" value={newCar.condition} onChange={(e) => setNewCar(c => {
            const car = createNewCar(c)

            car.condition = e.target.value;
            return car;
          })}/>
          <div onClick={add}>Edit</div>
        </div>
      </form>
      <div className="w-full flex">
        <div className="pr-12">
          <div className="w-full pb-2">Save to file</div>
          <input type="file" accept=".jpg,.png,.gif" onChange={handleChange} id="path"  name="image"/>
          <img src={fileImage} className="py-5"/>
          <div className="w-full pb-2 flex justify-between">
            <div onClick={saveImagePath}>Save</div>
            <div>Delete</div>
          </div>
        </div>
        <div>
          <div className="w-full pb-2">Save to blob</div>
          <input type="file" accept=".jpg,.png,.gif" onChange={handleChangeBlob} id="blob" name="image"/>
          <img
            src={fileBlobImage}
            className="pt-5"/>
          <div className="w-full pb-2 flex justify-between">
            <div onClick={saveImageBlob}>Save</div>
            <div>Delete</div>
          </div>
        </div>
      </div>
    </When>
  </div>
}
