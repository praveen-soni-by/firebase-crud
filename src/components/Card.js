import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating'
import React from 'react'

export default function Card({data}) {
    let isSoldOut = data.inventoryStatus === "SoldOut" ;
    return (
    <div className="p-col-12 p-md-6 p-lg-3">
        <div className="product-grid-item card">
          <div className="product-grid-item-top">
            <div>
              <i className="pi pi-tag product-category-icon"></i>
              <span className="product-category">{data.category}</span>
            </div>
            <div
              className={`${isSoldOut ? "product-badge soldOut" : '' }`}
            >
              <span>{isSoldOut ? data.inventoryStatus : ''}</span>
            </div>
          </div>
          <div className="product-grid-item-content">
            <img
              src={`https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKUQ3_VW_34FR+watch-45-alum-midnight-nc-7s_VW_34FR_WF_CO?wid=750&hei=712&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171067000,1631661671000`}
              onError={(e) =>
                (e.target.src =
                  "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
              }
              alt={data.name}
            />
            <div className="product-name">{data.name}</div>
            <Rating
              className="mb-2"
              value={data.rating}
              readOnly
              cancel={false}
            ></Rating>
          </div>
          <div className="product-grid-item-bottom">
            <span className="product-price">${data.price}</span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-text"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
          </div>
        </div>
      </div>
  )
}
