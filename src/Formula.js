import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Formula = () => {
  const [inputs, setInputs] = useState({ a: "", b: "", c: "" });
  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { a, b, c } = inputs;

    if (!a || !b || !c) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      toast.error("Todos los valores deben ser números.");
      return;
    }
    if (Number(a) === 0) {
      toast.error("El coeficiente 'a' no puede ser 0.");
      return;
    }

    const discriminant = Math.pow(b, 2) - 4 * a * c;
    if (discriminant < 0) {
      toast.warning("La ecuación no tiene soluciones reales.");
      setResults(null);
    } else {
      const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      setResults({ x1, x2 });
      toast.success("¡Cálculo realizado con éxito!");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Cálculo de la Fórmula Cuadrática</h2>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="a" className="form-label">
            Coeficiente a
          </label>
          <input
            type="text"
            id="a"
            name="a"
            value={inputs.a}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese el valor de a"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="b" className="form-label">
            Coeficiente b
          </label>
          <input
            type="text"
            id="b"
            name="b"
            value={inputs.b}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese el valor de b"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="c" className="form-label">
            Coeficiente c
          </label>
          <input
            type="text"
            id="c"
            name="c"
            value={inputs.c}
            onChange={handleChange}
            className="form-control"
            placeholder="Ingrese el valor de c"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Calcular
        </button>
      </form>

      {results && (
        <div className="mt-4">
          <h5>Resultados:</h5>
          <p>
            <strong>x1:</strong> {results.x1.toFixed(2)}
          </p>
          <p>
            <strong>x2:</strong> {results.x2.toFixed(2)}
          </p>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Formula;
