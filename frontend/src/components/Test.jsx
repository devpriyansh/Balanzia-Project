import axios from "axios";
import React, { useEffect, useState } from "react";

function Test() {
  let [apidata, setApiData] = useState([]);

  let getData = async () => {
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products");
      setApiData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {apidata.map((product) => {
        return <p key={product.id}>{product.title}</p>;
      })}
      <p>hello</p>
    </div>
  );
}

export default Test;
