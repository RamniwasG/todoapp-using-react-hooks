import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import TodoUsingUseStateHooks from '../using_useState/TodoUsingUseStateHooks';
import TodoUsingUseReducerHooks from '../using_useReducer/TodoUsingUseReducerHooks';

class TodoAppTabs extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      tabs: [
        { tabIndex: '1', tabLabel: 'Using useState' },
        { tabIndex: '2', tabLabel: 'Using useReducer' }
      ],
      activeTab: '1'
    };
  }

  toggle(tab) {
    console.log(tab)
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs>
          { this.state.tabs.map((tab, index) => {
            return (
              <NavItem key={index}>
                <NavLink
                  style={{ backgroundColor: this.state.activeTab === tab.tabIndex ? 'lightgrey' : ''}}
                  onClick={() => { this.toggle(tab.tabIndex) }}>
                  {tab.tabLabel}
                </NavLink>
              </NavItem>
            )
          })
        }
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId='1'>
            <Row>
              <Col sm="12">
                <header className="App-header">
                  <h3><b>Using useState</b></h3>
                  <TodoUsingUseStateHooks />
                </header>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId='2'>
            <Row>
              <Col sm="12">
                <header className="App-header">
                  <h3><b>Using useReducer</b></h3>
                  <TodoUsingUseReducerHooks />
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