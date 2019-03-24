import React from 'react'
import { Select } from 'semantic-ui-react'
import IdentityProviders from '../IdentityProviders'
import paIcon from '../paflag.png'

// :(
const AgeProviders = [
  {key: 'PA DMV', value: 'PA DMV', text: 'PA DMV', image: paIcon}
]

function optional(ip) {
  return [...ip, {key: 'none', value: 'hide', text: 'Hide this value'}]
}

export default class AttrDisplay extends React.Component {
  render() {
    const {attr} = this.props;
    const providers = attr.attr_name === "age" ? AgeProviders : IdentityProviders;
    return <>
      <Select
        options={this.props.required ? providers : optional(providers)}
        value={this.props.provider}
        onChange={(e, {value}) => this.props.onProviderChosen(value)}/>
    </>;
  }
}