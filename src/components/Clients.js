import React, { useState, useEffect } from "react"
import { Card } from "semantic-ui-react"
import avatar from "../images/avatar.png"
import { apiUrl } from "../config"

function Clients() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(apiUrl + "/clients")
      const data = await res.json()
      setClients(data)
    }
    fetchData()
  }, [])

  return (
    <div>
      {clients.map(client => {
        return (
          <Card
            key={client._id}
            image={avatar}
            header={`${client.firstName} ${client.lastName}`}
            meta={client.email}
            extra={`Revenue: $400`}
          />
        )
      })}
    </div>
  )
}

export default Clients
