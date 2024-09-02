import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { getProductById } from "../actions/productActions";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Review from "../components/Review";

export default function Productdescscreen({ match }) {
  const productid = match.params.id;
  const dispatch = useDispatch();
  const [quantity, setquantity] = useState(1);

  const getproductbyidstate = useSelector(
    (state) => state.getProductByIdReducer
  );

  const { product, loading, error } = getproductbyidstate;

  function addtocart() {
    dispatch(addToCart(product, quantity));
  }

  useEffect(() => {
    dispatch(getProductById(productid));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error error="Something went wrong" />
      ) : (
        <div>
          {/* Product and Price components */}
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="card p-2 m-3 shadow p-3 mb-5 bg-white rounded">
                <h1>
                  <b>{product.name}</b>
                </h1>
                <hr />
                <img src={product.image} className="img-fluid m-3 bigimg" />
                <p>{product.description}</p>
              </div>
            </div>

            <div className="col-md-6 ">
              <div className="card p-2 m-3 shadow p-3 mb-5 bg-white rounded">
                <h1>
                  <b>Price: ${product.price}</b>
                </h1>

                <hr />

                {product.countInStock > 0 && (
                  <div className="d-flex flex-column">
                    <h1>Select Quantity</h1>
                    <div className="d-flex">
                      <select className="form-select w-auto select-small"
                        value={quantity}
                        onChange={(e) => {
                          setquantity(e.target.value);
                        }}
                      >
                        {[...Array(product.countInStock).keys()].map((x, i) => {
                          return <option value={i + 1}>{i + 1}</option>;
                        })}
                      </select>
                    </div>
                    <hr />
                  </div>
                )}

                {product.countInStock > 0 ? (
                  <div className="d-flex justify-content-center">
                    <button className="btn btn-dark" onClick={addtocart}>
                      ADD TO CART
                    </button>
                  </div>
                ) : (
                  <div>
                    <h1>Out Of Stock</h1>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reviews section */}
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="p-3 mb-5 bg-white rounded">
                <Review product={product} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
