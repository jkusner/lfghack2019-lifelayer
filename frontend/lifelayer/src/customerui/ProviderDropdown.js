import React from 'react'
import { Select } from 'semantic-ui-react'
import IdentityProviders from '../IdentityProviders'

const OptionalIdentityProviders = [
  ...IdentityProviders,
  {key: 'none', value: 'hide', text: 'Hide this value'}
]

export default class AttrDisplay extends React.Component {
  state = {provider: 'citi'}
  _onSelectProvider = (provider) => {
    this.setState({provider});
  }
  render() {
    return <>
      <Select
        options={this.props.required ? IdentityProviders : OptionalIdentityProviders}
        value={this.state.provider}
        onChange={(e, {value}) => this._onSelectProvider(value)}/>
    </>;
  }
}