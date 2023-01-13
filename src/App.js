import './App.css';
import { useState } from "react";
import Axios from "axios";

function App() {
  const [itemnumber, setItemnumber] = useState(0)
  const [itemname, setItemname] = useState("")
  const [UOM, setUOM] = useState(0)
  const [HSNcode, setHSNcode] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [rate, setRate] = useState(0)
  const [grossvalue, setGrossvalue] = useState(0)
  const [netvalue, setNetvalue] = useState(0)
  const [date, setDate] = useState(0)
  const [remarks, setRemarks] = useState("")

  const [purchase, setPurchase] = useState([]);
  
  const addPurchase = () => {
    Axios.post("http://localhost:3001/create", {
      itemnumber: itemnumber,
      itemname: itemname,
      UOM: UOM,
      HSNcode: HSNcode,
      quantity: quantity,
      rate: rate,
      grossvalue: grossvalue,
      netvalue: netvalue,
      date: date,
      remarks: remarks,
    }).then(() => {
      setPurchase([
        ...purchase,
        {
      itemnumber: itemnumber,
      itemname: itemname,
      UOM: UOM,
      HSNcode: HSNcode,
      quantity: quantity,
      rate: rate,
      grossvalue: grossvalue,
      netvalue: netvalue,
      date: date,
      remarks: remarks,
        },
      ]);
    });
  };

  const getPurchase = () => {
    Axios.get("http://localhost:3001/purchase").then((response) => {
      setPurchase(response.data);
    });
  };

  const updatePurchase = (itemnumber) => {
    Axios.put("http://localhost:3001/update", {  itemnumber:itemnumber }).then(
      (response) => {
        setPurchase(
          purchase.map((val) => {
            return val.itemnumber == itemnumber
              ? {
                  itemnumber: val.itemnumber,
                  itemname: val.itemname,
                  UOM: val.UOM,
                  HSNcode: val.HSNcode,
                  quantity: val.quantity,
                  rate: val.rate,
                  grossvalue: val.grossvalue,
                  netvalue: val.netvalue,
                  date: val.date,
                  remarks: val.remarks,
                  
                }
              : val;
          })
        );
      }
    );
  };

  const deletePurchase = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setPurchase(
        purchase.filter((val) => {
          return val.itemnumber != itemnumber;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="header">
        You can purchse your order here!!
      </div>
      <br />
      <form className="information">
        <label>Item Number</label>
        <input type="Number"
        onChange={(event) => {
          setItemnumber(event.target.value);
        }} ></input>
        <label>Item Name</label>
        <input type="text"
        onChange={(event) => {
          setItemname(event.target.value);
        }}></input>
        <label>UOM</label>
        <input type="Number"
        onChange={(event) => {
          setUOM(event.target.value);
        }}></input>
        <label>HSN Code</label>
        <input type="Number"
        onChange={(event) => {
          setHSNcode(event.target.value);
        }}></input>
        <label>Quantity</label>
        <input type="Number"
        onChange={(event) => {
          setQuantity(event.target.value);
        }}></input>
        <label>Rate</label>
        <input type="Number"
        onChange={(event) => {
          setRate(event.target.value);
        }}></input>
        <label>Gross value</label>
        <input type="Number"
        onChange={(event) => {
          setGrossvalue(event.target.value);
        }}></input>
        <label>Net value</label>
        <input type="Number"
        onChange={(event) => {
          setNetvalue(event.target.value);
        }}></input>
        <label>Delivery date</label>
        <input type="Date"
        onChange={(event) => {
          setDate(event.target.value);
        }}></input>
        <label>Remarks</label>
        <input type="text"
        onChange={(event) => {
          setRemarks(event.target.value);
        }}></input>
        <button onClick={addPurchase} >Add Order</button>
      </form>
      <div className="purchases">
        <button onClick={getPurchase}>Show Purchase</button>

        {purchase.map((val, key) => {
          return (
            <div className="purchase">
              <div>
                <h3>itemnumber: {val.itemnumber}</h3>
                <h3>itemname: {val.itemname}</h3>
                <h3>UOM: {val.UOM}</h3>
                <h3>HSN: {val.HSN}</h3>
                <h3>Quantity: {val.Quantity}</h3>
                <h3>Rate: {val.Rate}</h3>
                <h3>grossvalue: {val.grossvalue}</h3>
                <h3>netvalue: {val.netvalue}</h3>
                <h3>date: {val.date}</h3>
                <h3>remarks: {val.remarks}</h3>
                
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setPurchase(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updatePurchase(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deletePurchase(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
