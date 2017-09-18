import {Menu, Icon} from 'antd';
import { withRouter } from 'react-router'
import React, {Component} from "react";


class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: this.props.history.location.pathname,
        }
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
        this.props.history.push(e.key);
    }

    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    <Menu.Item key="/details">
                        Details
                    </Menu.Item>
                    <Menu.Item key="/agenda">
                        Agenda
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}

export default withRouter(Navigation)