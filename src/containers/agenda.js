import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addItem, deleteItem, fetchItems, attachDocument} from "../actions/index";

import AgendaList from "../components/agenda-list"

class Agenda extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount(){
        // Fetch agenda items from "DB".
        this.props.fetchItems();
    }

    render() {
        // I intentionally compose container agenda and then add AgendaList as a component just to show
        // the architecture pattern. Agenda is a container, which means, that it communicates with the redux store.
        // The agenda-list is a dummy component, to which, only the props are passed.
        // In this case, AgendaList could be implemented right here, as a container, because it is the only component
        // rendered here.
        return (
            <div className="agenda">
                < AgendaList {...this.props} />
            </div>
        );
    }
}

Agenda.defaultProps = {
    agenda: [],
};

function mapStateToProps(state) {
    return {
        agenda: state.agenda
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addItem,
        deleteItem,
        fetchItems,
        attachDocument
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);