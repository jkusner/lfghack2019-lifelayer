import React from 'react'
import { Dimmer, Loader, Modal, Header } from 'semantic-ui-react'
import axios from 'axios'
import CONFIG from '../config'
import CustomerUI from './CustomerUI'

export default class CustomerUIContainer extends React.Component {
  state = {loading: true, modalOpen: false}
  componentDidMount() {
    console.log(this.props.requestData)
    axios.post(CONFIG.endpoint + '/request', this.props.requestData)
      .then(data => {
        this.setState({key: data, loading: false, modalOpen: true})
      })
  }
  render() {
    return (
      this.state.loading ? (
        <Dimmer active>
          <Loader/>
        </Dimmer>
      ) : (
        <Modal open={this.state.modalOpen}>
          <Header>LifeLayer</Header>
          <Modal.Content>
            <CustomerUI requestData={this.props.requestData} key={this.state.key} />
          </Modal.Content>
        </Modal>
      )
    );
  }
}