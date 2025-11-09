import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Registro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    twitter: "",
    ocupacion: "",
    avatar: "avatar1.png",
    terminos: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terminos) {
      setError("Debes aceptar los términos y condiciones");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Enviando datos:", formData);

      // Enviar los datos dentro del objeto "participante" como espera el backend
      const response = await api.registerParticipant(formData);
      console.log("Respuesta del servidor:", response.data);

      navigate("/participantes");
    } catch (error) {
      console.error("Error registrando participante:", error);

      if (error.response) {
        const serverError = error.response.data;
        setError(serverError.message || "Error al registrar participante");
      } else if (error.request) {
        setError("No se pudo conectar con el servidor");
      } else {
        setError("Error de configuración: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const avatars = [
    { id: "avatar1.png", name: "Avatar 1" },
    { id: "avatar2.png", name: "Avatar 2" },
    { id: "avatar3.png", name: "Avatar 3" },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-sm border p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Registro de Participante
        </h1>
        <p className="text-gray-600 mb-8">
          Únete al congreso como participante
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellidos *
              </label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Tus apellidos"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario de Twitter *
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                @
              </span>
              <input
                type="text"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                required
                className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="usuario"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ocupación *
            </label>
            <input
              type="text"
              name="ocupacion"
              value={formData.ocupacion}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Ej. Desarrollador, Diseñador, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Selecciona tu avatar *
            </label>
            <div className="grid grid-cols-3 gap-4">
              {avatars.map((avatar) => (
                <label
                  key={avatar.id}
                  className={`relative border-2 rounded-lg p-4 cursor-pointer transition duration-300 ${
                    formData.avatar === avatar.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="avatar"
                    value={avatar.id}
                    checked={formData.avatar === avatar.id}
                    onChange={handleChange}
                    className="sr-only"
                    required
                  />
                  <img
                    src={`/uploads/${avatar.id}`}
                    alt={avatar.name}
                    className="w-16 h-16 mx-auto rounded-full object-cover"
                    onError={(e) => {
                      console.log("Error cargando imagen:", avatar.id);
                      e.target.src = "/uploads/avatar1.png";
                    }}
                  />
                  <div className="mt-2 text-center text-sm text-gray-600">
                    {avatar.name}
                  </div>
                  {formData.avatar === avatar.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              className="mt-1 mr-3"
              required
            />
            <label className="text-sm text-gray-600">
              Acepto los términos y condiciones del congreso y autorizo el
              tratamiento de mis datos personales.
            </label>
          </div>

          <div className="flex gap-4 pt-4 flex-col sm:flex-row">
            <button
              type="button"
              onClick={() => navigate("/participantes")}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition duration-300"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registrando...
                </>
              ) : (
                "Guardar Registro"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
