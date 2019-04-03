import React, { useState } from "react"
import { Button, Checkbox, Form } from "semantic-ui-react"
import { apiUrl } from "../config"
import { withRouter } from "react-router-dom"

function NewClient(props) {
  const [clientValues, setClientValues] = useState({
    firstName: "",
    lastName: "",
    email: ""
  })

  function updateValue(e) {
    setClientValues({ ...clientValues, [e.target.name]: e.target.value })
  }

  async function submitClient() {
    const res = await fetch(apiUrl + "/clients", {
      method: "POST",
      body: JSON.stringify(clientValues)
    })
    const data = await res.json()
    setClientValues({ firstName: "", lastName: "", email: "" })
    props.history.push("/clients")
  }
  return (
    <div>
      <h1> Create a New Client</h1>
      <Form onSubmit={submitClient}>
        <Form.Field>
          <label>First Name</label>
          <input
            value={clientValues.firstName}
            onChange={updateValue}
            name="firstName"
            placeholder="First Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Last Name"
            value={clientValues.lastName}
            onChange={updateValue}
            name="lastName"
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            value={clientValues.email}
            onChange={updateValue}
            name="email"
          />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default withRouter(NewClient)
