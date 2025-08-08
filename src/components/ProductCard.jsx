import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const options = ["1", "2", "3"];
const count = 10; // Dummy count for the product quantity as the API do not have any attribute to see the SKU or product in stock count

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState({});
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const handleOptionChange = (pid, option) => {
    //in order to save the respective size for the product, but cant use because addCart funstion was out of the requirment to update
    setSelectedVariant((prev) => ({
      ...prev,
      [pid]: option,
    }));
  };

  return (
    <>
      <div
        id={product.id}
        key={product.id}
        className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
      >
        <div className="card text-center h-100 shadow" key={product.id}>
          {count < 1 && (
            <span class="badge text-bg-danger stock-label">Out Of Stock</span>
          )}
          <img
            className="card-img-top object-fit-contain p-3"
            src={product.image}
            alt="Card"
            height={300}
          />
          <div className="card-body">
            <h5 className="card-title">{product.title.substring(0, 12)}...</h5>
            <p className="card-text fs-6">
              {product.description.substring(0, 90)}...
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center mx-2 border-top pt-2">
            <p className="fw-semibold fs-4 mb-0">$ {product.price}</p>
            <select
              className="form-select form-select-sm w-auto border border-primary rounded px-5 py-1 text-primary fw-semibold"
              value={selectedVariant[product.id] || ""}
              onChange={(e) => handleOptionChange(product.id, e.target.value)}
            >
              <option value="" disabled>
                {product.category === "women's clothing" ||
                product.category === "men's clothing"
                  ? "Size"
                  : "Option"}
              </option>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="card-body">
            <Link
              to={"/product/" + product.id}
              className={`btn btn-dark m-1 ${count<1 ? "disabled" : ""}`} 
            >
              Buy Now
            </Link>

            <button
              className="btn btn-dark m-1"
              disabled={count < 1}
              onClick={() => {
                toast.success("Added to cart");
                addProduct(product);
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
