import React from 'react'
import { Header, Input } from 'semantic-ui-react'
import AttributePool from './AttributePool'

export default class DataInput extends React.Component {
  render() {
    const {requestData, addAttr} = this.props;
    return (
      <>
        <p>App name: <Input onChange={this.props.onAppNameChange} value={requestData.app_name}/></p>
        <Header as="h3" dividing>Required Attributes</Header>
        <AttributePool
          type="required"
          requestData={requestData}
          setAttrComparison={this.props.setAttrComparison}
          setAttrCompareTo={this.props.setAttrCompareTo}
          removeAttr={this.props.removeAttr}/>
        <Header as="h3" dividing>Optional Attributes</Header>
        <AttributePool
          type="optional"
          requestData={requestData}
          setAttrComparison={this.props.setAttrComparison}
          setAttrCompareTo={this.props.setAttrCompareTo}
          removeAttr={this.props.removeAttr}/>
        <Header as="h3" dividing>Attribute Pool</Header>
        <AttributePool
          type="unused"
          requestData={requestData}
          addAttr={addAttr}/>
      </>
    );
  }
}