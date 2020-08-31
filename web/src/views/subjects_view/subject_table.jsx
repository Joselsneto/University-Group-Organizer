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
      data: [],
      visible: false,
      visibleGroupDrawer: false,
      rowIndex: 0,
      title: ''
    };
    this.formRef = React.createRef();
    this.formGroup = React.createRef();
    this.showGroupDrawer = this.showGroupDrawer.bind(this);
  }

  componentDidMount() {
    this.getSubjects();
  }

  getSubjects = async () => {
    try {
      const answer = await fetch(baseUrl + 'getsubjects/' + this.props.universityId, {
        method: 'GET'
      });
      const json = await answer.json();
      this.setState({data:json});
    } catch (error) {
      console.log(error);
    }
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

  addSubject = async () => {
    const initials = this.formRef.current.getFieldValue('initials');
    const subject = this.formRef.current.getFieldValue('subject');
    const professor = this.formRef.current.getFieldValue('professor');

    try {
      const answer = await fetch(baseUrl + 'addsubject', {
        method: 'POST',
        body: JSON.stringify({
          "initials": initials,
          "name": subject,
          "professor": professor,
          "university_id": this.props.universityId 
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(answer);
    } catch (error) {
      console.log(error);
    }

    this.getSubjects();
    this.closeDrawer();
  }

  addGroup = async () => {
    const link = this.formGroup.current.getFieldValue('link');
    const subjectId = this.state.data[this.state.rowIndex].key;

    try {
      const answer = await fetch(baseUrl + 'addgroup', {
        method: 'POST',
        body: JSON.stringify({
          "link": link,
          "subject_id": subjectId
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
      console.log(answer);
    } catch (error) {
      console.log(error);
    }

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
            expandedRowRender: (record, rowIndex) => <p style={{ margin: 0 }}>{<GroupList groups={record.groups} id={record.id} rowIndex={rowIndex} showGroupDrawer={this.showGroupDrawer}/>}</p>,
            rowExpandable: record => true,
          }}
        />
      </div>
    );
  }
}

export default SubjectTable;