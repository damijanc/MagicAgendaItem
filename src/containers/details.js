import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchDetails} from "../actions/index";
import {bindActionCreators} from "redux";
import {Row, Col} from "antd"

class Details extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.fetchDetails();
    }

    render() {
        const {title, subtitle, excerpt, longDescription} = this.props.details
        return (
            <div className="details">
                <Row>
                    <Col xs={{span: 22, offset: 1}}>
                        <h2>{title}</h2>
                        <h3>{subtitle}</h3>
                        <p className="excerpt">
                            {excerpt}
                        </p>
                        <p className="long-description">
                            {longDescription}
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}

Details.defaultProps = {
    details: {}
};

function mapStateToProps(state) {
    return {
        details: state.details
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchDetails
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
