import React from 'react';
import { Table, Input, Button, Drawer, Row, Form } from 'antd';
import { baseUrl } from '../../apiConfig';
import { RightOutlined } from '@ant-design/icons';

const { Search } = Input;


class UniversitiesTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 0,
          name: 'Universidade Federal de Itajubá',
          initials: 'UNIFEI'
        },
        {
          id: 1,
          name: 'Universidade de São Paulo',
          initials: 'USP'
        },
      ],
      visible: false,
    }
    this.formRef = React.createRef();
  }

  closeDrawer = () => {
    this.setState({
      visible: false
    })
  }

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }

  // componentDidMount() {
  //   this.getAllUniversities();
  // }

  getAllUniversities = async () => {
    try {
      const answer = await fetch(baseUrl + 'getalluniversities', {
        method: 'GET'
      })

      const json = await answer.json()
      this.setState({
        data: json
      })
    } catch (error) {

    }
  }

  addUniversity = async () => {
    const initials = this.formRef.current.getFieldValue("initials")
    const name = this.formRef.current.getFieldValue("name")
    console.log(initials)
    console.log(name)
    
    this.closeDrawer();
  }
  

  render() {
    const columns = [
      {
        title: 'Sigla',
        dataIndex: 'initials',
        key: 'initials',
        width: '15%',
      },      
      {
        title: 'Nome',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '',
        dataIndex: 'id',
        align: 'right',
        render: (text, record) => {
          return (
            <RightOutlined />
          );
        }
      }
    ];
    return <div>
      <Drawer
        visible={this.state.visible}
        onClose={this.closeDrawer}
        width={300}
        title="Adicionar universidade"
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={this.closeDrawer} style={{ marginRight: 8 }}>
              Cancelar
            </Button>
            <Button onClick={this.addUniversity} type="primary">
              Adicionar
            </Button>
          </div>
        }
      >
        <Form layout="vertical" hideRequiredMark ref={this.formRef}>
          <Form.Item 
            name="initials"
            label="Sigla"
            rules={[{ required: true, message: 'Por favor entre com a sigla' }]}
          >
            <Input placeholder="Entre com a sigla da universidade"/>
          </Form.Item>
          <Form.Item 
            name="name"
            label="Nome"
            rules={[{ required: true, message: 'Por favor entre com o nome da universidade' }]}
          >
            <Input placeholder="Entre com o nome da universidade"/>
          </Form.Item>
        </Form>
      </Drawer>

      <Row style={{marginBottom: 12, justifyContent: "space-between"}}>
        <Search
            placeholder="Entre com o nome da sua universidade"
            onSearch={value => console.log(value)}
            onChange={value => console.log(value.target.value)}
            style={{width: "auto", flex: 1}}
          />

        <Button style={{type: "primary", alignSelf: "end", marginLeft: 12}} onClick={this.showDrawer}>
          Add
        </Button>
      </Row>

      <Table columns={columns} dataSource={this.state.data} 
        onRow={(record, rowIndex) => {
            return{
              onClick: event => {console.log(record.id)}
            };
          }
        }
      />
    </div>;
  }
}

export default UniversitiesTable;