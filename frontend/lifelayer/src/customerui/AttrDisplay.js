import React from 'react'
import { Grid } from 'semantic-ui-react'
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
  state = {checked: true, provider: 'citi'}
  render() {
    const {attr, required} = this.props
    return <>
      <Grid columns={2}>
        <Grid.Column style={{fontSize:'1.1em'}}>
          If your{' '}
          <span style={{fontWeight: 700}}>
            {attrName(attr)}
          </span>{' '}
          {opName(attr)}{' '}
          {rightSide(attr)}{' '}
          {required && <span style={{color:'red'}}>*</span>}
        </Grid.Column>
        <Grid.Column style={{textAlign: "right"}}>
          <ProviderDropdown required={required}/>
        </Grid.Column>
      </Grid>
    </>;
  }
}