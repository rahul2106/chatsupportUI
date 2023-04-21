import { useState } from "react";
import { formatDate } from "../../helper";
import "./SupportChat.css";
import OptionedMessage from "./OptionedMessage";

const BOT = "BOT";
const SupportChat = ({ selectedProduct, updateItemChat }) => {
  const [message, setMessage] = useState("");

  const onRequestCall = () => {
    updateItemChat({ message: "I request a callback from Flipkart." });
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="chatHeader">
        <div style={{ width: "2%" }}>
          <img src={selectedProduct?.imageURL} />
        </div>
        <h2 style={{ textAlign: "left", paddingLeft: "32px" }}>
          {selectedProduct?.title}
        </h2>
      </div>
      <div
        style={{
          backgroundColor: "#f1f3f6",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {selectedProduct?.messageList.length === 0 ? (
          <div style={{ width: "100%" }}>
            <p style={{ top: "50%", position: "absolute", left: "50%" }}>
              Send a message to start chatting
            </p>
            <tr>
              <OptionedMessage onRequestCall={onRequestCall} />
            </tr>
          </div>
        ) : (
          <table style={{ width: "100%" }}>
            {selectedProduct?.messageList?.length === 0 ? (
              <tr>
                <OptionedMessage onRequestCall={() => {}} />
              </tr>
            ) : null}
            {selectedProduct?.messageList?.map((item) =>
              item?.sender === BOT ? (
                <>
                  <tr className="botMessage">
                    <div
                      style={{ width: "max-content", backgroundColor: "white" }}
                      className="botChat"
                    >
                      <p>{item.message}</p>
                      <p style={{ color: "#878787" }}>
                        {formatDate(item.timestamp)}
                      </p>
                    </div>
                  </tr>
                </>
              ) : (
                <>
                  <tr className="userMessage">
                    <div
                      style={{
                        width: "max-content",
                        backgroundColor: "#027CD5",
                      }}
                      className="userChat"
                    >
                      <p>{item.message}</p>
                      <p>{formatDate(item.timestamp)}</p>
                    </div>
                  </tr>
                  <tr>
                    <OptionedMessage onRequestCall={onRequestCall} />
                  </tr>
                </>
              )
            )}
          </table>
        )}
        <div style={{ display: "flex" }}>
          <input
            style={{ width: "100%", height: "40px" }}
            placeholder="Type a message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setMessage("");
              updateItemChat({ message: message });
            }}
          >
            {">>>"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default SupportChat;
