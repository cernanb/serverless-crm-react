import React, { useEffect, useState } from "react"
import { apiUrl } from "../config"
import { Card, Table, Form, Button } from "semantic-ui-react"
import { withRouter } from "react-router-dom"
import { format } from "date-fns"
import ClipLoader from "react-spinners/ClipLoader"

import { css } from "@emotion/core"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

function ClientPage(props) {
  const [client, setClient] = useState({ notes: [] })
  const [noteValue, setNoteValue] = useState({ content: "" })
  const [loading, setLoading] = useState(false)
  console.log(props.match.params.id)
  useEffect(() => {
    setLoading(true)
    async function getClient() {
      const res = await fetch(`${apiUrl}/clients/${props.match.params.id}`)
      const data = await res.json()
      setClient(data)
      setLoading(false)
    }
    getClient()
  }, [])

  async function submitNote() {
    const res = await fetch(
      `${apiUrl}/clients/${props.match.params.id}/notes`,
      {
        method: "POST",
        body: JSON.stringify(noteValue)
      }
    )
    const data = await res.json()
    setNoteValue({ content: "" })
    setClient({ ...client, notes: client.notes.concat(data) })
  }

  function updateValue(e) {
    setNoteValue({ content: e.target.value })
  }
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
    <div>
      <h1>
        {client.firstName} {client.lastName}
      </h1>
      <Card centered>
        <Card.Content header="Information" />
        <Card.Content>
          <p>Email: {client.email}</p>
          <p>Address: 123 Main Street</p>
        </Card.Content>
      </Card>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Note</Table.HeaderCell>
            <Table.HeaderCell>Entered</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {client.notes.map(note => (
            <Table.Row>
              <Table.Cell>{note.content}</Table.Cell>
              <Table.Cell>{format(note.createdAt, "MM/DD/YYYY")}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Form onSubmit={submitNote}>
        <Form.Field>
          <label>New Note</label>
          <input
            value={noteValue.content}
            onChange={updateValue}
            name="content"
            placeholder="Content"
          />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  )
}

export default withRouter(ClientPage)
