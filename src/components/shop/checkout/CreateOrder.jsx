import React, {useState,  useEffect} from "react";
import CheckOutHead from "./CheckOutHead";
import CheckOutBody from './CheckOutBody';
import Axios from 'axios';

function CreateOrder(){
    const [cabinetDoor, setCabinetDoor] = useState([]);
    const [cabinet, setCabinet] = useState()
    const [Acc, setAcc] = useState([]);
    const storedInsertedId = localStorage.getItem('insertedId');
    useEffect(() => {
        Axios.get("https://us-east-1.aws.data.mongodb-api.com/app/application-0-hxfdv/endpoint/get_order")
          .then((res) => {
            const searchedCabinet = res.data.find(item => item._id === storedInsertedId)?.order_detail;
            let newrow1 = []
            let newrow2 = []
            let newrow3 = []
            for (let i in searchedCabinet) {
                if (searchedCabinet[i].cabinetSize) {
                    let newCabinet = {
                        cabinetSize:searchedCabinet[i].cabinetSize,
                        price: searchedCabinet[i].price
                    }
                    newrow1.push(newCabinet)
                }else if(searchedCabinet[i].doorSize){
                    let newCabinetDoor = {
                        doorSize:searchedCabinet[i].doorSize,
                        price:searchedCabinet[i].price
                    }
                    newrow2.push(newCabinetDoor)
              }
              else if(searchedCabinet[i].accessoryID){
                    let acc = {
                        accessoryID:searchedCabinet[i].accessoryID,
                        price:searchedCabinet[i].price
                    }
                    newrow3.push(acc)
              }
            }
            setCabinet(newrow1)
            setCabinetDoor(newrow2)
            setAcc(newrow3)
          })
          .catch((error) => {
            console.error(error);
          });
      }, []); 
    return(
        <div>
            <CheckOutBody cabinet = {cabinet} 
            cabinetDoor = {cabinetDoor} 
            accessory = {Acc} />
        </div>
    );
}

export default CreateOrder;