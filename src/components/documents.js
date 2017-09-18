import React, {Component} from "react";

class Documents extends Component {

    document = (fileName, key) => {
        return (
            <div key={key}>{fileName}</div>
        )
    }


    render() {
        const documents = this.props.documents.map(document => this.document(document.name, document.name));
        return (
            <div className="documents">
                {documents}
            </div>
        );
    }
}

export default Documents