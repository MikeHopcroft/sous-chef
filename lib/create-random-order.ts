import { BluePlateWorld, Order } from "../actions";

export function createRandomOrder(bpWorld: BluePlateWorld): Order {
  const expectedCart = {
    items: [
      {
        uid: 0,
        quantity: 3,
        key: '302:1:2',
        children: []
      }
    ]
  };

  const order: Order = {
    isPractice: false,
    expectedCart,
    rounds: []
  }

  return order;
}