import React, { useState, useEffect } from "react"
import { Card, Grid } from "semantic-ui-react"
import avatar from "../images/avatar.png"
import { apiUrl } from "../config"
import { Link } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

import { css } from "@emotion/core"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const res = await fetch(apiUrl + "/clients")
      const data = await res.json()
      setClients(data)
      setLoading(false)
    }
    fetchData()
  }, [])
  if (loading) {
    return (
      <div className="sweet-loading" style={{ textAlign: "center" }}>
        <ClipLoader
          // css={override}
          sizeUnit={"px"}
          size={200}
          color={"#123abc"}
          loading={loading}
        />
      </div>
    )
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap"
      }}
    >
      {clients.map(client => {
        return (
          <Link to={`clients/${client._id}`}>
            <Card
              style={{ margin: 0, marginTop: "30px" }}
              key={client._id}
              image={avatar}
              header={`${client.firstName} ${client.lastName}`}
              meta={client.email}
              extra={`${client.notes ? client.notes.length : 0} notes`}
            />
          </Link>
        )
      })}
    </div>
  )
}

export default Clients
