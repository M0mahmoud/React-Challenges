import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const API_URL = "https://api.shrtco.de/v2/shorten?url=";

const InputShort = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(API_URL + originalUrl);

      if (!res.data.ok) {
        throw new Error("Could not retrieve");
      }

      setResultUrl(res.data.result.full_short_link);
      setLoading(false);
      setOriginalUrl("");
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };

  const submitShorten = (e: SyntheticEvent) => {
    e.preventDefault();
    fetchData();
  };

  const UrlInput = () => (
    <form onSubmit={submitShorten}>
      <input
        type="text"
        placeholder="Enter your URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button>Shorten</button>
    </form>
  );

  const ResultDisplay = () => (
    <>
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : error ? (
        <div className="error-message">Error </div>
      ) : (
        <>
          <div className={`result-container `}>
            <div>{resultUrl}</div>
            <CopyToClipboard
              text={resultUrl}
              onCopy={() => {
                console.log("DONE");
              }}
            >
              <button>Copy</button>
            </CopyToClipboard>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <UrlInput />
      <ResultDisplay />
    </>
  );
};

export default InputShort;
