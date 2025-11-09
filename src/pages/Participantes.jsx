import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";

const Participantes = () => {
  const [participantes, setParticipantes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    cargarParticipantes();
  }, [searchParams]);

  const cargarParticipantes = async () => {
    setLoading(true);
    setError(null);
    try {
      const query = searchParams.get("search");
      let response = query
        ? await api.searchParticipants(query)
        : await api.getParticipants();

      const data = response.data.data;
      if (Array.isArray(data)) {
        setParticipantes(data);
      } else {
        setParticipantes([]);
      }
    } catch (error) {
      console.error("Error cargando participantes:", error);
      setError("Error al cargar los participantes");
      setParticipantes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ search: searchTerm.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchParams({});
  };

  const handleAvatarClick = (participante) => {
    const id =
      participante.idparticipante ||
      participante.idParticipante ||
      participante.id ||
      participante.ID;

    if (id && id !== "undefined") {
      navigate(`/gafete/${id}`);
    } else {
      alert("Error: No se pudo encontrar el ID del participante");
    }
  };

  const participantesSeguros = Array.isArray(participantes)
    ? participantes
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Participantes</h1>
        <p className="text-gray-600">
          Conoce a todos los profesionales registrados en el congreso
        </p>
      </div>

      {/* BUSCADOR */}
      <div className="mb-8">
        <form
          onSubmit={handleSearch}
          className="flex gap-4 flex-col sm:flex-row"
        >
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar participantes por nombre, apellido o correo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="px-4 py-2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 whitespace-nowrap"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => navigate("/registro")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition duration-300 whitespace-nowrap"
            >
              Nuevo Registro
            </button>
          </div>
        </form>
      </div>

      {/* MENSAJES DE ERROR O CARGA */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
          <button
            onClick={cargarParticipantes}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando participantes...</p>
        </div>
      ) : (
        <>
          {searchParams.get("search") && (
            <div className="mb-4 text-sm text-gray-600 text-center">
              Resultados para: "{searchParams.get("search")}"
              <button
                onClick={handleClearSearch}
                className="ml-2 text-indigo-600 hover:text-indigo-800"
              >
                Limpiar búsqueda
              </button>
            </div>
          )}

          {/* GRID DE PARTICIPANTES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {participantesSeguros.map((participante, index) => (
              <div
                key={participante.idparticipante || participante.id || index}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Imagen cubriendo la mitad superior */}
                <div
                  className="relative w-full h-48 cursor-pointer overflow-hidden"
                  onClick={() => handleAvatarClick(participante)}
                >
                  <img
                    src={`/uploads/${participante.avatar || "avatar1.png"}`}
                    alt={participante.nombre}
                    className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/uploads/avatar1.png";
                    }}
                  />
                </div>

                {/* Info del participante */}
                <div className="p-6 text-center">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1 truncate">
                    {participante.nombre} {participante.apellidos}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {participante.ocupacion || "Sin ocupación"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {!loading && !error && participantesSeguros.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <p className="text-gray-500 text-lg mb-4">
            {searchParams.get("search")
              ? "No se encontraron participantes con ese nombre"
              : "No hay participantes registrados aún"}
          </p>
          <button
            onClick={() => navigate("/registro")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            {searchParams.get("search")
              ? "Registrar nuevo participante"
              : "Ser el primero en registrarse"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Participantes;
