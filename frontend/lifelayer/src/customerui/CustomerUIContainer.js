import React from 'react'
import { Dimmer, Loader, Modal } from 'semantic-ui-react'
import axios from 'axios'
import CONFIG from '../config'
import CustomerUI from './CustomerUI'

export default class CustomerUIContainer extends React.Component {
  state = {loading: true, modalOpen: false}
  componentDidMount() {
    axios.post(CONFIG.endpoint + '/request', this.props.requestData)
      .then(data => {
        console.log('DATA IS HERE!', data)
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
        <Modal>
          <CustomerUI requestData={this.props.requestData} />
        </Modal>
      )
    );
  }
}