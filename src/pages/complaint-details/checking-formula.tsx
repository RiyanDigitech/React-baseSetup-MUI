import { useState } from "react";

const MATH_SYMBOLS = [
  { symbol: "/", display: "Fraction" },
  { symbol: "sqrt", display: "Square Root" },
  { symbol: "^", display: "Power" },
  { symbol: "3.12", display: "Pi" },
  //   { symbol: "\\alpha", display: "Alpha" },
  { symbol: "()", display: "Bracket" },
  //   { symbol: "\\theta", display: "Theta" },
  { symbol: "+", display: "+" },
  { symbol: "-", display: "-" },
  { symbol: "*", display: "*" },
];

function AdvancedFormulaEditor() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    formula: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const insertSymbol = (symbol) => {
    const textarea = document.querySelector('textarea[name="formula"]');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    setFormData({
      ...formData,
      formula:
        formData.formula.substring(0, startPos) +
        symbol +
        formData.formula.substring(endPos),
    });

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = startPos + symbol.length;
      textarea.selectionEnd = startPos + symbol.length;
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix formula errors before submitting");
      return;
    }
    console.log("Submitted data:", formData);
    // API call or further processing here
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Formula Editor:
          </label>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "5px",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f5f5f5",
              borderRadius: "4px",
            }}
          >
            {MATH_SYMBOLS.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => insertSymbol(item.symbol)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                {item.display}
              </button>
            ))}
          </div>

          <textarea
            name="formula"
            value={formData.formula}
            onChange={handleChange}
            rows={5}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              border: `1px solid "#ddd"}`,
              fontFamily: "monospace",
              fontSize: "16px",
            }}
            placeholder="Enter your formula here (e.g., \\frac{1}{2} or x^2 + y^2 = z^2)"
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Submit Formula
        </button>
      </form>
    </div>
  );
}

export default AdvancedFormulaEditor;
