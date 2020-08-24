import React from 'react';
import { List, Button, Row, Drawer, Input } from 'antd';
import Form from 'antd/lib/form/Form';

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
    this.formRef = React.createRef
  }

  openDrawer = () => {
    this.setState({
      visible: true
    })
  }

  closeDrawer = () => {
    this.setState({
      visible: false
    })
  }

  addGroup = async () => {
    const link = this.formRef.current.getFieldValue('link')
    console.log(link)
  }

  render() {
    return (
      <div>
        <List
          size="small"
          header={
            <Row style={{justifyContent: "space-between"}}>
              <strong>Grupos</strong>
              <Button style={{alignSelf: 'end'}} type='primary' onClick={this.props.showGroupDrawer}>
                Adicionar
              </Button>
            </Row>
          }
          bordered
          dataSource={this.props.groups}
          renderItem={item => 
            <List.Item>
              <td onClick={() => window.open(item.link, '_blank')}>
                <a>
                  {item.link}
                </a>
              </td>
            </List.Item>
          }
        />
      </div>
    );
  }
}

export default GroupList;