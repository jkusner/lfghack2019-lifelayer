import React from 'react'
import { Modal, Header } from 'semantic-ui-react'

export default class CustomerUIContainer extends React.Component {
  state={open: true}
  render() {
    return (
      <Modal open={this.state.open} onClose={() => this.setState({open: false})}>
        <Header>LifeLayer API Response</Header>
        <Modal.Content>
          <Header as="h3">Response from LifeLayer service:</Header>
          <pre>{this.props.data
            ? JSON.stringify(this.props.data.data.AnswersResponse, null, 2)
            : 'No response from server.'}</pre>
        </Modal.Content>
      </Modal>
    );
  }
}