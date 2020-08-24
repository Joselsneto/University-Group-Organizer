import React, {useState} from 'react';
import { Table, Input, Button, Drawer, Row, Form } from 'antd';
import { baseUrl } from '../../apiConfig';
import { RightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;


function UniversitiesTable(props) {


  const formRef = React.createRef();
  const [data, setData] = useState([
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
  ]);
  const [visible, setVisible] = useState(false);

  const closeDrawer = () => {
    setVisible(false);
  }

  const showDrawer = () => {
    setVisible(true);
  }

  // componentDidMount() {
  //   this.getAllUniversities();
  // }

  const getAllUniversities = async () => {
    try {
      const answer = await fetch(baseUrl + 'getalluniversities', {
        method: 'GET'
      })

      const json = await answer.json()
      setData(json);
    } catch (error) {

    }
  }

  const addUniversity = async () => {
    const initials = formRef.current.getFieldValue("initials")
    const name = formRef.current.getFieldValue("name")
    console.log(initials)
    console.log(name)
    
    closeDrawer();
  }

  const history = useHistory();

  const routeChange=(path)=>{
    history.push(path);
  }

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
      visible={visible}
      onClose={closeDrawer}
      width={300}
      title="Adicionar universidade"
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button onClick={addUniversity} type="primary">
            Adicionar
          </Button>
        </div>
      }
    >
      <Form layout="vertical" hideRequiredMark ref={formRef}>
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

      <Button type="primary "style={{alignSelf: "end", marginLeft: 12}} onClick={showDrawer} icon={<PlusOutlined />}>
        Adicionar
      </Button>
    </Row>

    <Table columns={columns} dataSource={data} 
      onRow={(record, rowIndex) => {
          return{
            onClick: event => {
              let path = '/university/'.concat(record.id);
              routeChange(path);
            }
          };
        }
      }
    />
  </div>;
  
}

export default UniversitiesTable;