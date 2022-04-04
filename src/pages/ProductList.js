import React, { useState, useEffect, useRef } from "react";
import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { DATA } from "./data";
import "./layout.css";
import Card from "../components/Card";

export default function ProductList() {
  const [products, setProducts] = useState(null);
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const rows = useRef(12);
  const datasource = useRef([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    setTimeout(() => {
      isMounted.current = true;
      datasource.current = DATA;
      setTotalRecords(DATA.length);
      setProducts(datasource.current.slice(0, rows.current));
      setLoading(false);
    }, 1000);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onPage = (event) => {
    setLoading(true);
    //imitate delay of a backend call
    setTimeout(() => {
      const startIndex = event.first;
      const endIndex = Math.min(event.first + rows.current, totalRecords - 1);

       let newProducts =
        startIndex === endIndex
          ? datasource.current.slice(startIndex)
          : datasource.current.slice(startIndex, endIndex);
      setFirst(startIndex);
      setProducts(newProducts);
      setLoading(false);
    }, 1000);
  };

  const renderListItem = (data) => {
    return (
      <div className="col-12">
        <div className="product-list-item">
          <img
            src={`images/product/${data.image}`}
            onError={(e) =>
              (e.target.src =
                "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
            }
            alt={data.name}
          />
          <div className="product-list-detail">
            <div className="product-name">{data.name}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
            <i className="pi pi-tag product-category-icon"></i>
            <span className="product-category">{data.category}</span>
          </div>
          <div className="product-list-action ">
            <span className="product-price">${data.price}</span>
            <Button
              className="p-button-text"
              icon="pi pi-shopping-cart"
              label="Add to Cart"
              disabled={data.inventoryStatus === "OUTOFSTOCK"}
            ></Button>
            <span
              className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}
            >
              {data.inventoryStatus}
            </span>
          </div>
        </div>
      </div>
    );
  };


  const itemTemplate = (product, layout) => {
    if (!product) {
      return;
    }
    if (layout === "list") return renderListItem(product);
    else if (layout === "grid") return <Card data ={product}/>
  };

  const renderHeader = () => {
    let onOptionChange = (e) => {
      setLoading(true);
      setLayout(e.value);
    };

    return (
      <div style={{ textAlign: "left" }}>
        <DataViewLayoutOptions layout={layout} onChange={onOptionChange} />
        <div className="grid"></div>
      </div>
    );
  };

  const header = renderHeader();

  return (
    <div className="dataview-demo">
      <div className="card">
        <DataView
          value={products}
          layout={layout}
          header={header}
          itemTemplate={itemTemplate}
          lazy
          paginator
          paginatorPosition={"bottom"}
          rows={rows.current}
          totalRecords={totalRecords}
          first={first}
          onPage={onPage}
          loading={loading}
        />
      </div>
    </div>
  );
}
