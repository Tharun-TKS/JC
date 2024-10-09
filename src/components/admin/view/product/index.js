import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import Createproduct from './new-add';
import Edit from './edit';


export default class Product extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/create`]} component={Createproduct} />
                    </Switch>
                </main>
            </div>
        );
    }
}