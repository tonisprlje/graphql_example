import React, { useState } from "react";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://spacex-production.up.railway.app/",
});

function App() {
  const [data, setData] = useState();

  async function getData() {
    const data = await client
      .query({
        query: gql`
          query ($limit: Int) {
            rockets(limit: $limit) {
              id
              name
              mass {
                kg
              }
              company
              cost_per_launch
              height {
                meters
              }
              first_flight
              type
              wikipedia
            }
          }
        `,
        fetchPolicy: "network-only",
        variables: {
          limit: 10,
        },
      })
      .then((result) => result);

    return data;
  }

  async function handleClick() {
    const res = await getData();
    setData(res.data.rockets);
  }

  return (
    <>
      <div>
        <button onClick={handleClick}>Get data</button>

        <ul>
          {data?.length &&
            data.map((i) => {
              return (
                <>
                  <li key={i.id}>{i.first_flight}</li>
                  <li key={i.id}>{i.type}</li>
                  <li key={i.id}>{i.wikipedia}</li>
                  <br></br>
                  <br></br>
                </>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default App;
