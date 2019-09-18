import React from "react";
import { Link } from "react-router-dom";
import { useActions } from "easy-peasy";
const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold"
};

function CartContent(props) {
  let removeFromCart = useActions(actions => actions.vendors.removeFromCart);

  return (
    <li className="collection-item avatar">
      <img src={props.source} alt="" className="circle" />
      <span className="title" style={titleStyle}>
        {props.title}
      </span>
      <br />
      <sub>Category : {props.category.join(",")}</sub>
      <br />
      <ul class="collection">
        {props.subcategories.map(sub =>
          sub.added ? (
            <li key={sub._id} class="collection-item">
              {sub.subcategory} - &#8377;{sub.price}
              <a href="#!" className="right">
                <i
                  onClick={() => {
                    removeFromCart({ profile: { _id: props.id }, id: sub._id });
                  }}
                  className="material-icons close-cart"
                >
                  close
                </i>
              </a>
            </li>
          ) : null
        )}
      </ul>
    </li>
  );
}

export default CartContent;
