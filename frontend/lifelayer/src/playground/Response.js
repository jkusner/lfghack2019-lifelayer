import React from 'react'
import { Modal, Header } from 'semantic-ui-react'

export default class CustomerUIContainer extends React.Component {
  render() {
    return (
      <Modal open={true}>
        <Header>LifeLayer API Response</Header>
        <Modal.Content>
          <Header as="h3">Response from LifeLayer service:</Header>
          <pre>{this.props.data
            ? JSON.stringify(this.props.data, null, 2)
            : 'No response from server.'}</pre>
        </Modal.Content>
      </Modal>
    );
  }
}