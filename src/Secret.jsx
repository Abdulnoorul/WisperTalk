import React, { useState } from "react";
import "./Secret.css";
import axios from "axios";
import { data, useNavigate } from "react-router-dom";

function Secret() {
  const [message, setMessage] = useState("");
  const [epassword, setEpassword] = useState("");

  const [secretmsg, setSecretmsg] = useState("");

  const [encform, setEncform] = useState(true);
  const [decform, setDecform] = useState(false);
  
  const [decryptedMsg, setDecryptedMsg] = useState('');

  const [secDecryMessage, setSecDecryMessage] =
    useState(""); /* use this state for decrypt input/text area */
  const [decryptPassword, setDecryptPassword] =
    useState(""); /* use this state for decrypt password box */

  const navigate = useNavigate();

  const encryptMessage = () => {
    
      if (message.trim() == "" || epassword.trim() == "") { 
          alert("Message and Password are empty");
      }
      else {
          axios
            .post(
              `https://wispertalk-springboot-production.up.railway.app/encryptMsg?msg=${message}&password=${epassword}`
            )
            .then((response) => {
              const secretmssg = response.data;
              setSecretmsg(secretmssg);
              navigate("/encrypted", { state: { secret_msg: secretmssg } });
            });

          setMessage("");
          setEpassword("");
      }
      
    
    };
    

    const decryptMessage = () => {
      axios
        .post(
          `https://wispertalk-springboot-production.up.railway.app/decryptMsg?secret=${encodeURIComponent(
            secDecryMessage
          )}&password=${encodeURIComponent(decryptPassword)}`
        )
        .then((response) => {
          const secretmssg = response.data;
          setDecryptedMsg(secretmssg);
        });

      setMessage("");
      setEpassword("");
    };


  return (
    <>
      <div id="mainContainer">
        <img src="./WT-main-logo.png" alt="Wisper Talk logo" id="mainLogo" />

        <p id="tagLine">
          From your phone to theirs unreadable to everyone else
        </p>

        <div id="buttons">
          <button
            className={encform ? "active" : "disable"}
            id="topbtnone"
            onClick={() => {
              setEncform(true);
              setDecform(false);
            }}
          >
            Encrypt
          </button>

          <button
            className={decform ? "active" : "disable"}
            id="topbtntwo"
            onClick={() => {
              setDecform(true);
              setEncform(false);
            }}
          >
            Decrypt
          </button>
        </div>

        {/* Here is encrypted form */}

        {encform && (
          <div id="form">
            <label>
              Enter your Message below <span>*</span>{" "}
            </label>

            <textarea
              id="messageArea"
              required
              placeholder="Enter your message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
            />

            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              required
              id="pwd"
              placeholder="Eg:12345"
              value={epassword}
              onChange={(event) => {
                setEpassword(event.target.value);
              }}
            />

            <button id="encBtn" onClick={encryptMessage}>
              Encrypt Text
            </button>
          </div>
        )}

        {/* Write decrypt form code here */}
        {decform && (
          <div id="form">
            <label>
              Enter your Secret Message below <span>*</span>{" "}
            </label>

            <textarea
              id="messageArea"
              required
              placeholder="Enter your secret message"
              value={secDecryMessage}
              onChange={(event) => {
                setSecDecryMessage(event.target.value);
              }}
            />

            <label>
              Password <span>*</span>
            </label>

            <input
              type="password"
              required
              id="pwd"
              placeholder="Eg:12345"
              value={decryptPassword}
              onChange={(event) => {
                setDecryptPassword(event.target.value);
              }}
            />

            <button id="encBtn" onClick={decryptMessage}>
              Decrypt Text
            </button>

            <label>Your Encrypted Message is here</label>

            <input value={decryptedMsg} readOnly id="pwd" />
          </div>
        )}
      </div>
    </>
  );
}

export default Secret;
