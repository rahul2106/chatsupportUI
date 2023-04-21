const OptionedMessage = ({ onRequestCall }) => {
  console.log(onRequestCall);
  return (
    <div
      style={{
        width: "300px",
        boxShadow: "0px 4px 8px 0 rgba(0,0,0,0.2)",
        borderRadius: "10px",
        background: "#e8e8e8",
        margin: "16px",
      }}
    >
      <div style={{ textAlign: "left", background: "white", padding: "8px" }}>
        Give me a moment while I connect you to one of our customer support
        executive. How would you like to contact us?
      </div>
      <div style={{ padding: "8px", borderBottom: "1px solid #f5f5f5" }}>
        <p
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => onRequestCall()}
        >
          Request a call
        </p>
        <p> Response Time: 5 minutes</p>
      </div>
      <div style={{ padding: "8px" }}>
        <p style={{ color: "blue" }}>Go to my orders</p>
      </div>
    </div>
  );
};

export default OptionedMessage;
