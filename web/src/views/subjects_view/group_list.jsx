import React from 'react';
import { List, Button, Row } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { baseUrl } from '../../apiConfig';

class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      groups: []
    }
    this.formRef = React.createRef
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups = async () => {
    try {
      const answer = await fetch(baseUrl + 'getgroups/' + this.props.id, {
        method: 'GET'
      });
      const json = await answer.json();
      this.setState({groups:json});
    } catch (error) {
      console.log(error);
    }
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

  showGroupDrawer = () => {
    this.props.showGroupDrawer(this.props.rowIndex);
  }

  render() { 
    return (
      <div>
        <List
          size="small"
          header={
            <Row style={{justifyContent: "space-between"}}>
              <strong>Grupos</strong>
              <Button style={{alignSelf: 'end'}} type='primary' onClick={this.showGroupDrawer} icon={<PlusOutlined />}>
                Adicionar
              </Button>
            </Row>
          }
          bordered
          dataSource={this.state.groups}
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