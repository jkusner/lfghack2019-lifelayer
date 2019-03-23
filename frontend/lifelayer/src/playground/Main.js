import React from 'react'
import { Container, Grid, Header, Divider, Button } from 'semantic-ui-react'
import DataInput from './DataInput'

function randomAPIKey() {
  const chars = "acbdefghijklmnopqrstuvwxyzABCDEFGHJIJKLMNOPQRSTUVWXYZ1234567890";
  let str = "";
  for (let i = 0; i < 32; i++) {
    str += chars.charAt(Math.floor(Math.random()*chars.length));
  }
  return str;
}

export default class APIPlayground extends React.Component {
  state = {requestData: {
    app_name: "Sample App",
    api_key: randomAPIKey(),
    required: [],
    optional: []
  }}

  _addAttr = (name, isRequired) => {
    const query = {attr_name: name, arguments: [], comparison: "gte", compare_to: 0};
    this.setState(state => ({
      ...state,
      requestData: {
        ...state.requestData,
        required: isRequired ? state.requestData.required.concat([query]) : state.requestData.required,
        optional: !isRequired ? state.requestData.optional.concat([query]) : state.requestData.optional
      }
    }))
  }

  _removeAttr = (name) => {
    this.setState(state => ({
      ...state,
      requestData: {
        ...state.requestData,
        required: state.requestData.required.filter(a => a.attr_name !== name),
        optional: state.requestData.optional.filter(a => a.attr_name !== name),
      }
    }))
  }

  _setAttrComparison = (name, comparison) => {
    this.setState(state => ({
      ...state,
      requestData: {
        ...state.requestData,
        required: state.requestData.required.map(attr => {
          if (attr.attr_name === name) {
            return {...attr, comparison: comparison}
          }
          return attr
        }),
        optional: state.requestData.optional.map(attr => {
          if (attr.attr_name === name) {
            return {...attr, comparison: comparison}
          }
          return attr
        }),
      }
    }))
  }

  _setAttrCompareTo = (name, number) => {
    this.setState(state => ({
      ...state,
      requestData: {
        ...state.requestData,
        required: state.requestData.required.map(attr => {
          if (attr.attr_name === name) {
            return {...attr, compare_to: number}
          }
          return attr
        }),
        optional: state.requestData.optional.map(attr => {
          if (attr.attr_name === name) {
            return {...attr, compare_to: number}
          }
          return attr
        }),
      }
    }))
  }

  _submit = () => {
    
  }

  render() {
    return (
      <Container style={{marginTop:20}}>
        <Header as="h1">LifeLayer Identity Request Playground</Header>
        <Grid columns={2}>
          <Grid.Column>
            <Header as="h2" dividing>Request Data Input</Header>
            <DataInput
              requestData={this.state.requestData}
              onAppNameChange={newName => this.setState(state => ({
                ...state,
                requestData: {
                  ...state.requestData,
                  app_name: newName,
                  api_key: randomAPIKey()
                }
              }))}
              addAttr={this._addAttr}
              setAttrComparison={this._setAttrComparison}
              setAttrCompareTo={this._setAttrCompareTo}
              removeAttr={this._removeAttr}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h2" dividing>Request JSON</Header>
            <pre>
              {JSON.stringify(this.state.requestData, null, 2)}
            </pre>
          </Grid.Column>
        </Grid>
        <Divider />
        <Button onClick={this._submit}>Submit</Button>
      </Container>
    );
  }
}