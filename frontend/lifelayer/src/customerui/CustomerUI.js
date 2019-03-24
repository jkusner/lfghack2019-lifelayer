import React from 'react'
import { Divider, Table, Select, Input, Modal, Header } from 'semantic-ui-react'
import AttrDisplay from './AttrDisplay'

export default class CustomerUI extends React.Component {
  state = {modalOpen: true}
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
      {required.length > 0 && (
        <>
          {required.map(attr => (<AttrDisplay attr={attr} required={true} key={attr.attr_name}/>))}
        </>)}
      {optional.length > 0 && (
        <>
          {optional.map(attr => (<AttrDisplay attr={attr} required={false} key={attr.attr_name}/>))}
        </>)}
    </>;
  }
}