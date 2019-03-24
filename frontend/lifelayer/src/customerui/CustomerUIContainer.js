import React from 'react'
import { Dimmer, Loader, Modal, Header } from 'semantic-ui-react'
import axios from 'axios'
import CONFIG from '../config'
import CustomerUI from './CustomerUI'

export default class CustomerUIContainer extends React.Component {
  state = {loading: true, modalOpen: false}
  componentDidMount() {
    axios.post(CONFIG.endpoint + '/request', this.props.requestData)
      .then(data => {
        this.setState({key: data, loading: false, modalOpen: true})
      })
  }
  _close = () => {
    this.setState({modalOpen: false})
  }
  render() {
    return (
      this.state.loading ? (
        <Dimmer active>
          <Loader/>
        </Dimmer>
      ) : (
        <Modal open={this.state.modalOpen}>
          <Header>LifeLayer Customer UI Example</Header>
          <Modal.Content>
            <CustomerUI 
              requestData={this.props.requestData}
              llkey={this.state.key}
              onFinished={data => {this._close(); this.props.onFinished(data)}} />
          </Modal.Content>
        </Modal>
      )
    );
  }
}