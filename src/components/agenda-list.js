import React, {Component} from "react";
import {Table, Button, Popover, Popconfirm, Input, Icon, Row, Col} from 'antd';

const InputGroup = Input.Group;

import AgendaCell from "./agenda-cell"
import Documents from "./documents"
import UploadDocuments from "./upload-documents"

class AgendaList extends Component {
    constructor(props) {
        super(props);

        // Read dataSource from props and copy it on the state
        // It is important, because table data could be changed in the local/component scope only.
        this.state = {
            dataSource: this.props.agenda,
            newAgendaItemName: '',
            count: this.props.agenda.length,
            visible: false,
        };

        // Columns initialization and table behaviour
        this.columns = [{
            title: 'id',
            dataIndex: 'id',
            width: '100px',
            render: (text, record) => (
                <AgendaCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'id')}
                />
            ),
        }, {
            title: 'name',
            dataIndex: 'name',
            width: '',
            render: (text, record) => (
                <AgendaCell
                    value={text}
                    onChange={this.onCellChange(record.key, 'name')}
                />
            ),
        }, {
            title: 'operation',
            dataIndex: 'operation',
            width: '100px',
            fixed: 'right',
            render: (text, record) => {
                // Implementation of the popconfirm component when delete button is pressed,
                // Delete button implementation when popconfirm is "ok".
                return (
                    this.state.dataSource.length > 0 ?
                        (
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                                <a href="#">Delete</a>
                            </Popconfirm>
                        ) : null
                );
            },
        }];
    }

    componentWillReceiveProps(nextProps) {
        // Update state when redux store changes
        this.setState({
            dataSource: nextProps.agenda,
            newAgendaItemName: '',
            count: nextProps.agenda.length,
        });
    }

    hide = () => {
        this.setState({
            visible: false,
        });
    }

    handleVisibleChange = (visible) => {
        this.setState({visible});
    }

    // Method which updates state data for the currently changed field.
    onCellChange = (key, dataIndex) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            const target = dataSource.find(item => item.key === key);
            if (target) {
                target[dataIndex] = value;
                this.setState({dataSource});
            }
        };
    }

    // Delete method deletes record from the dataSource and updates state.
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.props.deleteItem(key);
    }

    // Event method, which creates new element in the table
    handleAdd = () => {
        const {count, dataSource, newAgendaItemName} = this.state;
        const newData = {
            key: count,
            name: newAgendaItemName,
            id: count + 1,
            documents: []
        };
        this.props.addItem(newData);
    }

    render() {
        const {dataSource, addItemDefaultValue, count} = this.state;
        const columns = this.columns;
        return (
            <div className="agenda-list">
                <div className="agenda-table">
                    {count > 0 ?
                        <Table showHeader={false}
                               dataSource={dataSource}
                               columns={columns}
                               pagination={false}
                               scroll={{x: 700}}
                               rowKey={record => record.key}
                               rowClassName={record => record.documents.length > 0 ? '' : 'hide-expand-icon'}
                               expandedRowRender={record => {
                                   if (record.documents.length > 0) {
                                       return (<Documents documents={record.documents}/>);
                                   }
                               }}
                        /> :
                        <Row>
                            <Col xs={{span: 22, offset: 1}}>
                                <div className="no-table-data">Would you like to insert new agenda item?</div>
                            </Col>
                        </Row>
                    }
                </div>
                <div className="add-item-footer-holder">
                    <Row>
                        <Col xs={{span: 22, offset: 1}} sm={{span: 8, offset: 1}}>
                            <InputGroup compact>
                                <Input style={{width: '70%'}}
                                       defaultValue=""
                                       value={this.state.newAgendaItemName}
                                       onChange={e => {
                                           this.setState({newAgendaItemName: e.target.value})
                                       }}
                                       onPressEnter={this.handleAdd}
                                       placeholder='Enter new agenda item...'/>
                                <Button style={{width: '30%'}}
                                        type="primary"
                                        onClick={this.handleAdd}
                                        disabled={(this.state.newAgendaItemName == "") ? true : false}>Add</Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </div>
                <div className="upload-footer-holder">
                    <Row>
                        <Col xs={{span: 11, offset: 1}}>
                            <Button type="primary">Publish</Button>
                        </Col>
                        <Col xs={{span: 11, offset: 0}}>
                            <Popover
                                content={<UploadDocuments dataSource={dataSource} {...this.props}/>}
                                title={<div className="popover-title">
                                    <div className="left">Add documents to agenda items</div>
                                    <div className="right"><Icon className="close-popover" type="close"
                                                                 onClick={this.hide}/></div>
                                </div>}
                                trigger="click"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                                placement="topRight"
                            >
                                <Button type="primary" className="upload-documents">Upload documents</Button>
                            </Popover>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AgendaList