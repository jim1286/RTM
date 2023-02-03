import React, {Component} from "react";
import { Container,ListGroup,ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup} from 'react-transition-group'
import { connect } from "react-redux";
import { getItems,deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types"

class ShoppingList extends Component {

  componentDidMount(){
    this.props.getItems()
  }

  onDeleteCLick = (id) => {
    this.props.deleteItem(id)
  }

  render(){    
    const { items } = this.props.item
        
    return(
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-List">
            {items.map(({id, name})=>(
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteCLick.bind(this, id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  item: state.item
})

export default connect(mapStateToProps, {getItems,deleteItem})(ShoppingList)