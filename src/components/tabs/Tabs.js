import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import TodoUsingUseStateHooks from '../TodoUsingUseStateHooks';
import TodoUsingUseReducerHooks from '../TodoUsingUseReducerHooks';
// import classnames from 'classnames';

class TodoAppTabs extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    // className={classnames({ active: this.state.activeTab === '1' })}
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              style={{ backgroundColor: this.state.activeTab === '1' ? 'lightgrey' : ''}}
              onClick={() => { this.toggle('1'); }}
            >
              Using useState
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              onClick={() => { this.toggle('2'); }}
            >
              Using useReducer
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <header className="App-header">
                  <TodoUsingUseStateHooks  userReducer={false}/>
                </header>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <header className="App-header">
                  <TodoUsingUseReducerHooks userReducer={true}/>
                </header>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

export default  TodoAppTabs;