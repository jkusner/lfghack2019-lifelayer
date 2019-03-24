import React from 'react'
import { Divider, Table } from 'semantic-ui-react'
import AttrDisplay from './AttrDisplay'

export default class CustomerUI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {modalOpen: true, providers: {}}
    for (let attr in this.props.requestData.required.concat(this.props.requestData.optional)) {
      this.state.providers[attr.attr_name] = attr.attr_name === 'age' ? 'PA DMV' : 'Citibank'
    }
  }
  state = {modalOpen: true, providers:{}}
  _onProviderChosen(attr_name, provider) {
    this.setState(state => {
      state.providers[attr_name] = provider
      return state
    })
  }
  render() {
    const {required, optional} = this.props.requestData;
    return <>
      <span style={{fontSize:18}}>
        <span style={{fontWeight:700}}>
          {this.props.requestData.app_name}
        </span>{' '}
        is requesting access to the following information.
      </span>
      <p>You can select which linked providers you would like to retrieve this information from.</p>
      <Divider/>
      <Table basic>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Requested Data
            </Table.HeaderCell>
            <Table.HeaderCell>
              Data provider
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {required.length > 0 && (
            <>
              {required.map(attr =>
                <AttrDisplay attr={attr} required={true} key={attr.attr_name}/>)}
            </>)}
          {optional.length > 0 && (
            <>
              {optional.map(attr =>
                <AttrDisplay attr={attr} required={false} key={attr.attr_name}/>)}
            </>)}
          </Table.Body>
      </Table>
    </>;
  }
}