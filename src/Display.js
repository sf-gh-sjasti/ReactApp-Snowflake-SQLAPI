import React, { useEffect, useState } from 'react';
import bearerToken from "./Token";

export default function Locations() {
  const [data, setData] = useState([]);

function getDataFromSnowflake() {
  /**
   * If you are located in us-west region, Update SNOWFLAKE_ACCOUNT_IDENTIFIER with your Snowflake Account 
   * (or) If you are located outside the us-west region, Update SNOWFLAKE_ACCOUNT_IDENTIFIER as ‘.'. 
   * To get the snowflake_account value from Snowflake, run SELECT CURRENT_ACCOUNT() in Snowsight. 
   * To get the region value from Snowflake, run SELECT CURRENT_REGION() in Snowsight. 
   * SNOWFLAKE_ACCOUNT_IDENTIFIER and SNOWFLAKE_ACCOUNT would be same for us-west.
   */
  fetch('https://<SNOWFLAKE ACCOUNT IDENTIFIER>.snowflakecomputing.com/api/v2/statements', {
      method: 'POST',
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-Snowflake-Authorization-Token-Type': 'KEYPAIR_JWT',
      Authorization: 'Bearer ' + bearerToken()
      },
      body: JSON.stringify({
      "statement": "<SQL Query>",
      "timeout": 1200,
      "database": "<DATABASE>",
      "schema": "<SCHEMA>",
      "warehouse": "<WAREHOUSE>",
      "role": "<ROLE>"
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
