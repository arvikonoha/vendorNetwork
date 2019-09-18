import React from "react";

function Test() {
  return (
    <div>
      <header id="profile">
        <div className="container">
          <h2>Vender Profile</h2>
        </div>
      </header>
      <div className="profile-container">
        <div className="profile-description">
          <img src="./images/topRight.svg" alt="" srcSet width="40px" />
          <img src="./images/topLeft.svg" alt="" srcSet width="40px" />
          <img src="./images/bottomRight.svg" alt="" srcSet width="40px" />
          <img src="./images/bottomLeft.svg" alt="" srcSet width="40px" />
          <section>
            <h3>
              About us{" "}
              <button className="edit-btn">
                <div className="edit-text">Edit</div>
                <img src="./images/edit.svg" alt="" width="20px" />
              </button>{" "}
            </h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Distinctio velit possimus voluptatum, nesciunt, dolores
              praesentium officiis excepturi iste ipsa ad veritatis consequatur,
              corrupti aspernatur fuga molestias commodi saepe. Iure, at!
            </p>
          </section>
          <section>
            <h3>
              Categories{" "}
              <button className="edit-btn">
                <div className="edit-text">Edit</div>
                <img src="./images/edit.svg" alt="" width="20px" />
              </button>{" "}
            </h3>
            <ul className="categories">
              <li>Photography</li>
              <li>Decorators</li>
            </ul>
          </section>
          <section>
            <h3>
              Services offered{" "}
              <button className="edit-btn">
                <div className="edit-text">Edit</div>
                <img src="./images/edit.svg" alt="" width="20px" />
              </button>{" "}
            </h3>
            <ul className="categories">
              <p>Press on the subcategory to add to the cart</p>
              <br />
              <li>
                Photo - Rs.20000
                <img src="./images/Arrow.svg" alt="" width="100px" />
                <br />
              </li>
              <li>
                Photo + Video - Rs.35000{" "}
                <img src="./images/Arrow.svg" alt="" width="100px" /> <br />
              </li>
            </ul>
          </section>
          <section>
            <h3>Gallery</h3>
            <div className="gallery-flex">
              <div className="gallery-box" />
              <div className="gallery-box" />
              <div className="gallery-box" />
              <div className="gallery-box">
                <div>+</div>
                <p>Add to the gallery</p>
              </div>
            </div>
          </section>
          <section>
            <h3>
              Vendor details{" "}
              <button className="edit-btn">
                <div className="edit-text">Edit</div>
                <img src="./images/edit.svg" alt="" width="20px" />
              </button>{" "}
            </h3>
            <div className="profile-flex">
              <div className="primary-box">
                <div className="heading">
                  <h4>Email</h4>
                </div>
                generic@gmail.com
              </div>
              <div className="primary-box">
                <div className="heading">
                  <h4>Phone</h4>
                </div>
                9829123217
              </div>
              <div className="secondary-box">
                <div className="heading">
                  <h4>Address</h4>
                </div>
                The generic, common road, dreramville - 453234
              </div>
              <div className="secondary-box">
                <div className="heading">
                  <h4>User Rating</h4>
                </div>
                <span className="rating">4.3</span>
              </div>
            </div>
          </section>
          <h3>Vendor schedule</h3>
          <ul className="schedule">
            <li>
              <h4>Event title</h4>
              <br />
              <p>From - 12/07/2018</p>
              <p>To - 12/07/2018</p>
            </li>
            <li>
              <h4>Event title</h4>
              <br />
              <p>From - 12/07/2018</p>
              <p>To - 12/07/2018</p>
            </li>
            <li>
              <h4>Event title</h4>
              <br />
              <p>From - 12/07/2018</p>
              <p>To - 12/07/2018</p>
            </li>
          </ul>
          <section>
            <h3>User reviews</h3>
            <ul className="reviews">
              <li>
                <h4> User Name</h4>
                <br />
                <p className="rate">
                  Rating - 4.2{" "}
                  <img src="./images/star.svg" alt="" width="20px" />{" "}
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem ab suscipit doloribus ducimus expedita
                  laudantium.
                </p>
              </li>
              <li>
                <h4> User Name</h4>
                <br />
                <p className="rate">
                  Rating - 4.4{" "}
                  <img src="./images/star.svg" alt="" width="20px" />{" "}
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem ab suscipit doloribus ducimus expedita
                  laudantium.
                </p>
              </li>
              <li>
                <h4> User Name</h4>
                <br />
                <p className="rate">
                  Rating - 4.1{" "}
                  <img src="./images/star.svg" alt="" width="20px" />{" "}
                </p>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Exercitationem ab suscipit doloribus ducimus expedita
                  laudantium.
                </p>
              </li>
              {/* <li style="width: 220px">
            <p>Read more reviews...</p>
          </li> */}
            </ul>
          </section>
        </div>
        <div className="profile-pic" />
        <h2 className="profile-title">
          <img src="./images/topRight.svg" alt="" srcSet />
          <img src="./images/bottomLeft.svg" alt="" srcSet />
          Generic services
          <br />
          <sub style={{ fontSize: "15px", fontWeight: "normal" }}>
            Location <br />{" "}
            <button className="edit-btn">
              <div className="edit-text">Edit</div>
              <img src="./images/edit.svg" alt="" width="20px" />
            </button>
          </sub>
        </h2>
      </div>
    </div>
  );
}

export default Test;
