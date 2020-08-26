import React from 'react';
import { Table, Input, Button, Drawer, Row, Form } from 'antd';
import { baseUrl } from '../../apiConfig';
import GroupList from './group_list';
import { PlusOutlined } from '@ant-design/icons';

const { Search } = Input;

class SubjectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: 0,
          initials: 'ECOT03',
          name: 'Banco de dados',
          professor: 'Enzo Seraphim',
          groups: [
            { link: 'https://google.com' },
            { link: 'https://chat.whatsapp.com/BANCODEDADOS2' },
          ]
        },
        {
          key: 1,
          initials: 'EEL105',
          name: 'Circuitos elétricos I',
          professor: 'Jose Vitor Bernardes Junior',
          groups: [
            { link: 'https://chat.whatsapp.com/CIRCUITOS1' }
          ]
        },
        {
          key: 2,
          initials: 'ECOM06',
          name: 'Compiladores',
          professor: 'Thatyana de Faria Piola Seraphim',
          groups: [
            { link: 'https://chat.whatsapp.com/COMPILADORES' }
          ]
        },
      ],
      visible: false,
      visibleGroupDrawer: false,
      rowIndex: 0,
      title: ''
    };
    this.formRef = React.createRef();
    this.formGroup = React.createRef();
    this.showGroupDrawer = this.showGroupDrawer.bind(this);
  }

  closeDrawer = () => {
    this.setState({ visible: false });
    this.formRef.current.resetFields();
  }

  showDrawer = () => {
    this.setState({ visible: true });
  }

  closeGroupDrawer = () => {
    this.setState({ visibleGroupDrawer: false });
    this.formGroup.current.resetFields();
  }

  showGroupDrawer = (id) => {
    let title = 'Adicionar grupo na matéria '.concat(this.state.data[id].initials, ' - ', this.state.data[id].name, ' com ', this.state.data[id].professor);
    this.setState({ title: title, rowIndex: id, visibleGroupDrawer: true });
  }

  addSubject = () => {
    const initials = this.formRef.current.getFieldValue('initials');
    const subject = this.formRef.current.getFieldValue('subject');
    const professor = this.formRef.current.getFieldValue('professor');

    console.log(initials);
    console.log(subject);
    console.log(professor);

    this.closeDrawer();
  }

  addGroup = () => {
    const link = this.formGroup.current.getFieldValue('link');
    const subjectId = this.state.data[this.state.rowIndex].key;

    console.log(link);
    console.log(subjectId);

    this.closeGroupDrawer();
  }

  render() {
    const columns = [
      { title: 'Sigla', dataIndex: 'initials', key: 'initials' },
      { title: 'Materia', dataIndex: 'name', key: 'name' },
      { title: 'Professor', dataIndex: 'professor', key: 'professor' },
    ];

    return (
      <div>
        <Drawer
          width={300}
          visible={this.state.visible}
          title='Adicionar matéria'
          onClose={this.closeDrawer}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.closeDrawer} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button onClick={this.addSubject} type="primary">
                Adicionar
              </Button>
            </div>
          }
        >
          <Form ref={this.formRef} layout='vertical'>
            <Form.Item
              name='initials'
              label='Sigla da matéria'
            >
              <Input placeholder='Entre com a sigla da matéria' />
            </Form.Item>

            <Form.Item
              name='subject'
              label='Matéria'
            >
              <Input placeholder='Entre com o nome da matéria' />
            </Form.Item>

            <Form.Item
              name='professor'
              label='Professor'
            >
              <Input placeholder='Entre com o nome do professor' />
            </Form.Item>

          </Form>

        </Drawer>

        <Drawer
          visible={this.state.visibleGroupDrawer}
          width={300}
          onClose={this.closeGroupDrawer}
          title={<p>{this.state.title}</p>}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.closeGroupDrawer} style={{ marginRight: 8 }}>
                Cancelar
              </Button>
              <Button onClick={this.addGroup} type="primary">
                Adicionar
              </Button>
            </div>
          }
        >
          <Form ref={this.formGroup} layout='vertical'>
            <Form.Item
              name='link'
              label='Link'
            >
              <Input placeholder='Entre com o link do grupo' />
            </Form.Item>
          </Form>

        </Drawer>

        <Row style={{ marginBottom: 12, justifyContent: "space-between" }}>
          <Search
            placeholder="Entre com a sigla da matéria ou o nome da matéria ou nome do professor"
            onSearch={value => console.log(value)}
            onChange={value => console.log(value.target.value)}
            style={{ width: "auto", flex: 1 }}
          />

          <Button
            type="primary"
            style={{ alignSelf: "end", marginLeft: 12 }}
            onClick={this.showDrawer}
            icon={<PlusOutlined />}
          >
            Adicionar
          </Button>
        </Row>

        <Table
          tableLayout='auto'
          columns={columns}
          dataSource={this.state.data}
          expandable={{
            expandedRowRender: (record, rowIndex) => <p style={{ margin: 0 }}>{<GroupList groups={record.groups} id={rowIndex} showGroupDrawer={this.showGroupDrawer} closeModal={this.closeModal} />}</p>,
            rowExpandable: record => true,
          }}
        />
      </div>
    );
  }
}

export default SubjectTable;