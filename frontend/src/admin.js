import { JsonToTable } from "react-json-to-table";
import { useState } from "react";

export default function Admin() {
  const [data, setData] = useState({});

  const getData = async (username, password) =>
    await (
      await fetch("http://localhost:5010/api/v1/admin/list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${
            (
              await (
                await fetch("http://localhost:5010/api/v1/admin/login", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                })
              ).json()
            ).token
          }`,
        },
      })
    ).json();

  getData("admin", "admin").then((d) => {
    setData(d);
  });

  // let data = { test: "test" };
  // REACT SUCKS
  return <JsonToTable json={data} />;
}
