import React, { useEffect, useRef, useState } from "react";

const ChatComponent = () => {
  const arr = [
    "U-Hello",
    "P-Hi, How can we help you?",
    "U-I want to know is medicine available?",
    "P-Certainly yes!",
    "U-sldfsldkfsflkj",
    "P-sdjadsssssssssssssssssssssssslskjfsdljfwoefijmnwlskd,ziskmcsdifjsodlivnmslidmvs",
    "U-I want to know is medicine available?",
    "P-Certainly yes!",
    "U-sldfsldkfsflkj",
    "P-sdjadsssssssssssssssssssssssslskjfsdljfwoefijmnwlskd,ziskmcsdifjsodlivnmslidmvs",
  ];

  const [messages, setMessages] = useState(arr);
  const [inputMsg, setInputMsg] = useState("");

  const divRef = useRef(null);

  const sendHandler = () => {
    if (inputMsg !== "") {
      setMessages((prev) => [...prev, `U-${inputMsg}`]);
      setInputMsg("");
    }
  };

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="h-[79vh] w-[90vw] max-w-[500px] mx-auto rounded-lg shadow-xl">
      {/* top */}
      <div className="flex items-center  pl-5 gap-3 bg-[#ffffff] border-b-2 h-[10%] rounded-t-lg">
        <div className="w-4 h-4 rounded-full bg-green-500"></div>
        <h2 className="text-xl font-medium">Pharmacist</h2>
      </div>

      {/* middle */}
      <div
        className="h-[80%] bg-white px-3 overflow-y-scroll scrollbar-thin
                  scrollbar-thumb-rounded-full scrollbar-track-rounded-full
                  scrollbar-thumb-[#e8e8e8] scrollbar-track-white"
        ref={divRef}
      >
        {messages.map((msg) => {
          const prefix = msg.substring(0, 2);
          const message = msg.substring(2);
          if (prefix === "P-") {
            return (
              <div className="bg-[#e8e8e8] my-2 left-0 w-fit px-2 py-1 max-w-[270px] h-fit break-words rounded-xl">
                {message}
              </div>
            );
          } else {
            return (
              <div className="w-full flex justify-end">
                <div className="bg-blue-500 text-white my-2 right-0 w-fit px-2 py-1 max-w-[270px] h-fit break-words rounded-xl">
                  {message}
                </div>
              </div>
            );
          }
        })}
      </div>

      {/* bottom */}
      <div className="flex items-center h-[10%] pl-5 gap-3 bg-[#ffffff] border-t-2 rounded-b-lg">
        <input
          type="text"
          placeholder="Write something ..."
          className="w-full bg-gray-100 rounded-lg outline-none px-2 py-1 text-lg"
          onChange={(e) => setInputMsg(`${e.target.value}`)}
          onKeyDown={(e) => e.key === "Enter" && sendHandler()}
          value={inputMsg}
        />
        <span
          class="material-symbols-outlined text-[#5D94E7] text-3xl pr-3"
          onClick={sendHandler}
        >
          send
        </span>
      </div>
    </div>
  );
};

export default ChatComponent;
