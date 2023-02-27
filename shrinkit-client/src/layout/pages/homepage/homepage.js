import React from "react";
import "./homepage.css";
import { useState } from "react";
import Navbar from "../../components/navbar/navbar";
import axios from "axios";
import { nanoid } from "nanoid";
import Lottie from "react-lottie";
import loading_animation from "../../../assets/Test SVG.json";

export default function Homepage() {
  const [longUrl, setLongUrl] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [preferredAlias, setPreferredAlias] = useState("");
  const [loading, setLoading] = useState(false);
  const [copyText, setCopyText] = useState("Copy to Clipboard");
  const [errMsg, setErrMsg] = useState("");

  const generateUrl = () => {
    setGeneratedUrl("");
    setErrMsg("");
    if (longUrl.includes("https://") && longUrl !== "") {
      setLoading(true);
      var generatedKey = nanoid(5);
      if (preferredAlias !== "") {
        generatedKey = preferredAlias;
      }
      var generatedURL = "https://shrinkit.web.app/" + generatedKey;
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/createShortUrl`, {
          longUrl,
          preferredAlias,
          generatedKey,
          shortUrl: generatedURL,
        })
        .then((res) => setGeneratedUrl(res.data.shortUrl))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    } else if (longUrl === "") {
      setErrMsg("Please enter your URL!");
    } else {
      setErrMsg("Please enter valid URL!");
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <h2>Shrink It</h2>
          <div className="input-field">
            <p>Enter Your Long URL</p>
            <input
              type="text"
              placeholder="https://www..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className={errMsg.length && "error-border"}
            />
          </div>
          <p className="error">{errMsg}</p>
          <div className="input-field">
            <p>Your Shrink URL</p>
            <div className="styled-input">
              <p>shrinkit.web.app/</p>
              <input
                type="text"
                placeholder="eg. 3fwias (Optional)"
                value={preferredAlias}
                onChange={(e) => setPreferredAlias(e.target.value)}
              />
            </div>
          </div>
          <button onClick={generateUrl}>
            {loading ? (
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loading_animation,
                }}
                height={20}
                width={20}
              />
            ) : (
              "Shrink It"
            )}
          </button>
          {generatedUrl && (
            <div className="input-field margin">
              <p>Your generated URL is:</p>
              <div className="styled-input">
                <input type="text" disabled value={generatedUrl} />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generatedUrl);
                    setCopyText("Copied!");
                  }}
                >
                  Copy <span className="tooltiptext">{copyText}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
