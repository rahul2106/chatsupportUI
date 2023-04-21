import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import SupportChat from "../components/SupportChat";
import "./Chat.css";
const Chat = () => {
  const [list, setList] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getItem();
  }, []);

  useEffect(() => {
    if (!!selectedProduct && !!list) {
      setSelectedProduct((prev) => list.find((item) => item.id === prev.id));
    }
  }, [list]);

  const getItem = async () => {
    await fetch("https://my-json-server.typicode.com/codebuds-fk/chat/chats")
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch(() => console.log("Unable to fetch items."));
  };

  const updateItemChat = ({ message }) => {
    const messagePayload = {
      messageId: `msg${selectedProduct?.messageList.length + 1 ?? 0}`,
      message: message,
      timestamp: new Date().getTime() / 1000,
      sender: "USER",
      messageType: "text",
    };
    console.log(message);

    const newList = list.map((it) => {
      if (it.id === selectedProduct.id) {
        return {
          ...it,
          messageList: [...it.messageList, messagePayload],
        };
      }
      return it;
    });
    setList(newList);
  };

  return (
    <div className="container">
      {!!list && (
        <ItemList
          list={list}
          updateSelectedProduct={(item) => {
            setSelectedProduct(item);
          }}
          selectedProduct={selectedProduct}
        />
      )}
      {!!selectedProduct && (
        <SupportChat
          selectedProduct={selectedProduct}
          updateItemChat={updateItemChat}
        />
      )}
    </div>
  );
};

export default Chat;
