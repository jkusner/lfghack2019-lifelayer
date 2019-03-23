import React from 'react'
import { Button, Table, Select, Input } from 'semantic-ui-react'
import Attributes from '../Attributes'
import Comparisons from '../Comparisons'

function unusedAttributes(required, optional) {
  const activeAttrs = required.concat(optional)
    .map(a => a.attr_name);

  return Attributes.filter(a => activeAttrs.indexOf(a.name) < 0);
}

export default class AttributePool extends React.Component {
  getAttrData(attr_name) {
    const {required, optional} = this.props.requestData;
    const reqRes = required.filter(a => a.attr_name === attr_name)[0];
    const optRes = optional.filter(a => a.attr_name === attr_name)[0];
    return reqRes || optRes;
  }

  render() {
    const type = this.props.type;
    const {required, optional} = this.props.requestData;
    const pool = type === 'unused' ? unusedAttributes(required, optional) : (
      type === 'required' ? required : optional
    );
    return (
      <Table>
        <Table.Body>
          {pool.map(attr =>
            <Table.Row key={attr.name || attr.attr_name}>
              <Table.Cell>
                {attr.name || attr.attr_name} {attr.type && `(${attr.type})`}
              </Table.Cell>
              <Table.Cell style={{textAlign:'right'}}> {
                type === 'unused' ? (<>
                  <Button size='mini' onClick={() => this.props.addAttr(attr.name, true)} primary>Make Required</Button>
                  <Button size='mini' onClick={() => this.props.addAttr(attr.name, false)} secondary>Make Optional</Button>
                </>) : (<>
                  <Select
                    onChange={(_, {value}) => this.props.setAttrComparison(attr.attr_name, value)}
                    options={Comparisons}
                    value={this.getAttrData(attr.attr_name).comparison}
                    style={{minWidth:0, marginRight:10}} />
                  <Input 
                    type="number"
                    onChange={e => this.props.setAttrCompareTo(attr.attr_name, e.target.value)}
                    value={this.getAttrData(attr.attr_name).compare_to}
                    style={{width:150, marginRight:10}}/>
                  <Button onClick={() => this.props.removeAttr(attr.attr_name)} icon='delete'/>
                </>)
              }
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }
}