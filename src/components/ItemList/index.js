import { useEffect, useState } from "react";
import "./ItemList.css";
const ItemList = ({ list, updateSelectedProduct, selectedProduct }) => {
  const [search, setSearch] = useState("");

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    if (!!list && list.length > 0) {
      setItemsList(list);
    }
  }, [list]);

  useEffect(() => {
    if (!!search) {
      const newState = list.filter((item) => item?.title?.includes?.(search));
      //Could have plugged in debouncing to make sure api call doesnt happen on every onChange.
      setItemsList([...newState]);
    }
  }, [search]);

  const sortObjectsByTitleHelper = (objects) => {
    return objects.sort((a, b) => a.title.localeCompare(b.title));
  };
  const sortObjectsByOrderIdHelper = (objects) => {
    return objects.sort((a, b) => a.orderId.localeCompare(b.orderId));
  };

  const sortByTitle = () => {
    const newState = sortObjectsByTitleHelper(list);

    setItemsList(() => [...newState]);
  };
  const sortByOrderId = () => {
    const newState = sortObjectsByOrderIdHelper(list);
    setItemsList(() => [...newState]);
  };

  const formatDate = (epoch) => {
    const date = new Date(Math.round(Number(epoch)));
    const formattedDate =
      date.getUTCDate() +
      "/" +
      (date.getUTCMonth() + 1) +
      "/" +
      date.getUTCFullYear();
    return formattedDate;
  };

  return (
    <div className="list" style={{ width: selectedProduct ? "50%" : "100%" }}>
      <div className="itemListHeader">
        <h2 style={{ textAlign: "left" }}>
          Filter by <button onClick={sortByTitle}>Title</button>/
          <button onClick={sortByOrderId}>Order Id</button>
        </h2>
        <input
          placeholder="Start typing to search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="searchBox"
        />
      </div>
      <div className="listTable">
        {itemsList.map((item) => (
          <div
            className="item"
            onClick={() => {
              updateSelectedProduct(item);
            }}
          >
            <div style={{ width: "2%" }}>
              <img src={item?.imageURL} />
            </div>
            <div className="description">
              <div className="title">
                <h4 style={{ margin: 0 }}>{item?.title}</h4>
                <p style={{ color: "grey" }}>
                  {formatDate(item?.latestMessageTimestamp)}
                </p>
              </div>
              <h5>{item?.orderId}</h5>
              <p style={{ color: "grey" }}>
                {item?.messageList?.at(-1)?.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
