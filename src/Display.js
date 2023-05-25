import React, { useEffect, useState } from 'react';
import bearerToken from "./Token";

export default function Locations() {
  const [data, setData] = useState([]);

function getDataFromSnowflake() {
  fetch('https://kpb58668.snowflakecomputing.com/api/v2/statements', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
      Authorization: 'Bearer ' + bearerToken()
      },
      body: JSON.stringify({
      "statement": "SELECT top 50 date, shift, city,  location_name, street_address, " + 
                    "udf_predict_location_sales_prod(MONTH, DAY_OF_WEEK, LATITUDE, LONGITUDE," +
                      "COUNT_LOCATIONS_WITHIN_HALF_MILE, CITY_POPULATION, AVG_LOCATION_SHIFT_SALES, SHIFT) " +
                    "AS predicted_shift_sales " + 
                    "FROM frostbyte_tasty_bytes.analytics.shift_features " +
                    "where shift = " + 0 + " " +
                    "and city = (select PRIMARY_CITY " +
                      "from frostbyte_tasty_bytes.raw_pos.truck " +
                      "where truck_id = "+ 256 + " ) " +
                    "order by predicted_shift_sales desc;",
      "timeout": 1200,
      "database": "FROSTBYTE_TASTY_BYTES",
      "schema": "ANALYTICS",
      "warehouse": "TASTY_DATA_APP_WH",
      "role": "TASTY_DATA_APP_TEST"
      }),
    }).then(response => response.json()).then((json) => { console.error(json);setData(json.data)});
}

useEffect(() => {
  getDataFromSnowflake();
}, []);

return (
  <div className="App">
    <div>
      {data.map(item => (
        <p>{item[0]}</p>
      ))}
    </div>
    </div>
);
};