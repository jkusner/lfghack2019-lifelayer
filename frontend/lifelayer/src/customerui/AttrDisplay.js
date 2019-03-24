import React from 'react'
import { Table } from 'semantic-ui-react'
import ProviderDropdown from './ProviderDropdown'

// I'm sorry. Running out of time
function attrName(attr) {
  const name = attr.attr_name
  if (name === "accountBalance") {
    return "Total Account Balance"
  } else if (name === "accountStatus") {
    return "Account Status"
  } else if (name === "age") {
    return "Age"
  } else if (name === "creditLimit") {
    return "Credit Limit"
  }
}

function opName(attr) {
  const op = attr.comparison
  if (op === "gt") {
    return ">"
  } else if (op === "gte") {
    return "≥"
  } else if (op === "lt") {
    return "<"
  } else if (op === "lte") {
    return "≤"
  } else if (op === "eq") {
    return "is"
  }
}

function rightSide(attr) {
  if (attr.attr_name === "accountStatus") {
    return attr.compare_to == 1 ? "Active" : "Inactive"
  }
  return attr.compare_to
}

export default class AttrDisplay extends React.Component {
  state = {provider: 'Citibank'}
  render() {
    const {attr, required} = this.props
    return <>
      <Table.Row>
        <Table.Cell style={{fontSize:'1.1em'}}>
          If your{' '}
          <span style={{fontWeight: 700}}>
            {attrName(attr)}
          </span>{' '}
          {opName(attr)}{' '}
          <span style={{fontWeight: 700}}>{rightSide(attr)}</span>{' '}
          {required && <span style={{color:'red'}}>*</span>}
          <p style={{fontSize: '.75em'}}>Here's a reason.</p>
        </Table.Cell>
        <Table.Cell style={{textAlign: "left"}}>
          <ProviderDropdown
            attr={attr}
            value={this.state.provider}
            required={required}
            onChange={(e, {value}) => this.props.onProviderChosen(attr.attr_name, value)}/>
        </Table.Cell>
      </Table.Row>
    </>;
  }
}