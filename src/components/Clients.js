import React, { useState, useEffect } from "react"
import { Card, Icon } from "semantic-ui-react"
import avatar from "../images/avatar.png"

const extra = <p>Revenue: $400</p>

function Clients() {
  const [clients, setClients] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        "https://serverlesscrmapi.azurewebsites.net/api/clients"
      )
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
            extra={extra}
          />
        )
      })}
    </div>
  )
}

export default Clients
