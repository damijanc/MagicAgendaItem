import React, {Component} from "react";
import {Upload, Icon, message, Button} from 'antd';

const Dragger = Upload.Dragger;

class UploadDocuments extends Component {

    constructor(props) {
        super(props);

        // Drag and drop initial settings and onChange event handler.
        this.state = {
            name: 'file',
            multiple: true,
            showUploadList: true,
            currentFileList: [],
            action: '/upload',
            onChange: info => {
                const status = info.file.status;

                if (status === 'done') {
                    console.log('uploaded');
                    this.setState({currentFileList: info.fileList});
                    console.log("current file list", this.state.fileList);
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
    }

    // Method which automatically attach the documents to the existing elements in the
    // agenda list. If there is no connection between the items and documents,
    // then documents are not attached.
    automaticallyAlocateDocuments = () => {
        console.log("Current dataSource array / agenda items", this.props.dataSource);

        let status = 0;

        let currentFileList = this.state.currentFileList;
        console.log("Current file list", currentFileList);
        // Iterate over agenda items and try to find
        // connection with the file name
        for (let agendaItem of this.props.dataSource) {
            console.log(agendaItem);
            for (let fileItem of currentFileList) {
                // if agendaItem name is in the file name,
                // then insert the file to the current agendaItem
                if (fileItem.name.toLowerCase().indexOf(agendaItem.name.toLowerCase()) >= 0) {
                    message.success(`${fileItem.name} attached to the ${agendaItem.name}.`);

                    // remove it from the current list
                    status ++;
                    // update redux store
                    this.props.attachDocument(agendaItem.key, fileItem);
                }
                else {
                    // If there is no name in the file name
                    // then try to find agendaItem in the file name
                    if (fileItem.name.toLowerCase().indexOf(agendaItem.id.toString().toLowerCase()) >= 0) {
                        message.success(`${fileItem.name} attached to the ${agendaItem.name}.`);

                        // remove it from the current list
                        status ++

                        // update redux store
                        this.props.attachDocument(agendaItem.key, fileItem);
                    }
                }
            }
        }

        if(status==0){
            message.warning("Failed to attach documents! Please check filenames and try again!");
        }
    }

    render() {
        const currentFileList = this.state.currentFileList;
        console.log(currentFileList);
        return (
            <div className="upload-documents-wrapper">
                <div style={{marginTop: 16}}>
                    <Dragger {...this.state}>
                        <p className="upload-text"><Icon className="add-icon" type="plus"/>Drop new documents here</p>
                        <div className="upload-hint">or Browse <span>Your computer</span></div>
                    </Dragger>
                </div>
                <div className="popover-footer">
                    <Button type="primary"
                            className="upload-documents"
                            onClick={this.automaticallyAlocateDocuments}
                            disabled={currentFileList.length == 0}>Automatically allocate</Button>
                </div>
            </div>
        );
    }
}

export default UploadDocuments