import React, { useState } from "react";
import { useStore, useActions } from "easy-peasy";
import CartContent from "./CartContent";

function Cart() {
  let resultArray = useStore(state => state.vendors.cartItems);
  let cartContents = resultArray.filter(item =>
    item.subcategories.some(sub => sub.added)
  );
  let toggleAdded = useActions(actions => actions.vendors.toggleAdded);
  let submitCart = useActions(actions => actions.vendors.submitCart);
  let [isDone, setDone] = useState(false);

  return (
    <div className="row" style={{ height: "100vh" }}>
      <ul className="collection col s10 offset-s1 card-panel">
        {cartContents.length === 0 && !isDone ? (
          <li className="collection-item avatar">
            <i className="material-icons circle">local_grocery_store</i>
            <span
              className="title"
              style={{ fontSize: "25px", fontWeight: "bold" }}
            >
              How empty!
            </span>
            <p>Cart is empty. Please add some items first</p>
          </li>
        ) : (
          cartContents.map(item => (
            <CartContent
              cart={cartContents}
              title={item.title}
              category={item.category}
              subcategories={item.subcategories}
              source={item.picsource}
              key={item._id}
              id={item._id}
            />
          ))
        )}
        {(function() {
          if (cartContents.length > 0 && !isDone) {
            return (
              <li className="collection-item avatar">
                <i className="material-icons circle red white-text">
                  local_grocery_store
                </i>
                <span
                  className="title"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Total price
                </span>
                <p>
                  {cartContents.reduce((prev, curr) => {
                    prev += curr.subcategories.reduce((prev, curr) => {
                      prev += curr.added ? parseInt(curr.price) : 0;
                      return prev;
                    }, 0);
                    return prev;
                  }, 0)}
                </p>
                <a
                  href="#!"
                  onClick={e => setDone(true)}
                  className="secondary-content"
                >
                  <i className="material-icons">email</i>
                </a>
              </li>
            );
          }
        })()}
        {(function() {
          if (isDone) {
            return (
              <li className="collection-item avatar">
                <i className="material-icons circle red white-text">
                  local_grocery_store
                </i>
                <span
                  className="title"
                  style={{ fontSize: "20px", fontWeight: "bold" }}
                >
                  Confirm your selection
                </span>
                <p>Your number is essential for the vandors to contact you.</p>
                <div className="input-field col s12 l6">
                  <i class="material-icons prefix">phone</i>
                  <input id="icon_telephone" type="tel" class="validate" />
                  <label for="icon_telephone">Telephone</label>
                  <button
                    className="btn waves-effect"
                    onClick={e =>
                      submitCart(
                        document.querySelector("#icon_telephone").value
                      )
                    }
                  >
                    Submit
                  </button>
                </div>
                <a
                  href="#!"
                  className="secondary-content brown-text center-align"
                >
                  <i className="material-icons">close</i>
                  <br />
                  Press this to cancel your selection
                </a>
                <a
                  href="#!"
                  onClick={e => setDone(false)}
                  className="secondary-content brown-text center-align"
                >
                  <i className="material-icons">close</i>
                  <br />
                  Press this to cancel your selection
                </a>
              </li>
            );
          }
        })()}
      </ul>
    </div>
  );
}

export default Cart;
