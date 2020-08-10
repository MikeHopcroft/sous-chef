import { Cart, ItemInstance, LogicalCart, World } from 'prix-fixe';
import React from "react";
import Button from 'react-bootstrap/Button';
import { FaMicrophone, FaMicrophoneSlash } from 'react-icons/fa';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { ApplicationState, AnyAction, ordersPerSession } from '../actions';

import RoundControl from './round-control';
import RoundFeedbackControl from './round-feedback-control'
import RoundRecordControl from './round-record-control';

import styles from './controls.module.css';

interface Props {
  application: ApplicationState;
};

class OrderControl extends React.Component<Props> {
  render() {
    const cart1: Cart = {
      items: [
        {
          uid: 0,
          quantity: 1,
          key: '302:1:1',
          children: [],
        }
      ]
    };

    const cart2: Cart = {
      items: [
        {
          uid: 0,
          quantity: 1,
          key: '302:1:2',
          children: [],
        }
      ]
    };

    const world = this.props.application.bluePlateWorld.prixFixeWorld;
    const order = this.props.application.currentOrder;
    const round = this.props.application.currentRound;
    const cart = round.resultCart || round.initialCart;

    const orderNumber = this.props.application.orders.length + 1;

    return (
      <div>
        <h1>Order {orderNumber} of {ordersPerSession}</h1>
        <div style={{display:"flex", flexDirection:"row"}}>
          <div style={{fontWeight: 'bold'}}>Desired Order: </div>
          <div style={{marginLeft: '1ex', marginRight: '1ex'}}>
            {renderCart(world, order.expectedCart)}
          </div>
          <div style={{fontWeight: 'bold'}}>Your order so far: </div>
          <div style={{marginLeft: '1ex'}}>
            {renderCart(world, cart)}
          </div>
        </div>
        <RoundControl/>
        {/* <RoundFeedbackControl/>
        <RoundRecordControl/> */}
        {/* <div>
          <b>Transcription: </b>
          <i>"I'd like a grande iced latte"</i>
        </div>
        <div>
          We transcribed your speech as, "<i>I'd like a grande iced latte</i>."
          Did we get the transcription right? (yes/no)
        </div>
        <div>
          It looks like your order contains the right items.
          Is the order what you expected at this point? (yes/no)
        </div>
        <div>
          Feel free to add comments on this round. (text)
        </div>
        <div>
          <Button
              className="btn btn-success btn-sm"
              // disabled={
              //   !this.props.application.speechConfig.speechSupport ||
              //   this.props.application.isRecording
              // }
              // onClick={this.startRecognition}
            >
              <FaMicrophone />
              Modify this order
          </Button>
          <Button
              className="btn btn-danger btn-sm"
              // disabled={
              //   !this.props.application.speechConfig.speechSupport ||
              //   this.props.application.isRecording
              // }
              // onClick={this.startRecognition}
            >
              Try another order
          </Button>
          <Button
              className="btn btn-normal btn-sm"
              // disabled={
              //   !this.props.application.speechConfig.speechSupport ||
              //   this.props.application.isRecording
              // }
              // onClick={this.startRecognition}
            >
              I'm done
          </Button>
        </div> */}
      </div>
     )
  }
}

function renderCart(world: World, cart: Cart) {

  function renderItemList(items: ItemInstance[]) {
    function renderItem(item: ItemInstance) {
      // for (const e of world.catalog.specificEntities()) {
      //   console.log(`"${e.name}" (${e.key})`);
      // }
      const specific = world.catalog.getSpecific(item.key);
      return (
        <div className={styles.cartItem} key={item.uid}>
          {`${item.quantity} ${specific.name} (${specific.sku})`}
          {renderItemList(item.children)}
        </div>
      )
    }

    return (
      <div>
        { items.map(renderItem) }
      </div>
    )
  }

  return (
    <div style={{backgroundColor: 'lightskyblue'}}>
      { cart.items.length > 0 ? renderItemList(cart.items) : 'Cart is empty'}
    </div>
  );
}

function mapStateToProps(application: ApplicationState) {
  return { application };
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderControl);
