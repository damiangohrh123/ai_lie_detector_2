import { useState } from "react";
import "./App.css";

function App() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");

    try {
      const res = await fetch("/api/huggingface", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await res.json();
      setOutput(data.output || "No output");
    } catch (err) {
      setOutput("Error calling API");
    }

    setLoading(false);
  };

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Hugging Face API Demo</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <textarea
          rows={4}
          cols={50}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text here..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>

      <h3>Response:</h3>
      <pre>{output}</pre>
    </div>
  );
}

export default App;