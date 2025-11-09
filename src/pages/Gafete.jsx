import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Gafete = () => {
  const { idParticipante } = useParams();
  const navigate = useNavigate();
  const [participante, setParticipante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (idParticipante && idParticipante !== "undefined") {
      cargarParticipante();
    } else {
      setError("ID de participante inválido");
      setLoading(false);
    }
  }, [idParticipante]);

  const cargarParticipante = async () => {
    try {
      const response = await api.getParticipantById(idParticipante);
      if (response.data.success) {
        setParticipante(response.data.data);
      } else {
        setError("Participante no encontrado");
      }
    } catch {
      setError("Error al cargar el participante");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (error || !participante)
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Participante no encontrado"}
          </h2>
          <button
            onClick={() => navigate("/participantes")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Volver al listado
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <button
          onClick={() => navigate("/participantes")}
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300"
        >
          <span className="mr-2">←</span> Volver
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gafete Digital</h1>
          <p className="text-gray-500">Congreso TIC's 2025</p>
        </div>

        {/* CARD GIRATORIA RESPONSIVA */}
        <div
          className={`relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[5/3] mx-auto cursor-pointer transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? "[transform:rotateY(180deg)]" : ""
          }`}
          onClick={() => setFlipped(!flipped)}
        >
          {/* Cara frontal */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-lg border border-gray-200 [backface-visibility:hidden] overflow-hidden hover:shadow-xl transition-shadow duration-500">
            <div className="h-1/3 bg-indigo-600 relative">
              <img
                src={`/uploads/${participante.avatar}`}
                alt={participante.nombre}
                className="absolute left-1/2 -bottom-14 transform -translate-x-1/2 w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full border-4 border-white object-cover shadow-md"
                onError={(e) => (e.target.src = "/uploads/avatar1.png")}
              />
            </div>

            <div className="pt-20 sm:pt-24 pb-6 text-center px-4 sm:px-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                {participante.nombre} {participante.apellidos}
              </h2>
              <p className="text-gray-500 text-sm truncate mb-2">
                {participante.ocupacion}
              </p>
              <p className="text-xs text-gray-400 mt-3">
                Toca para ver información
              </p>
            </div>
          </div>

          {/* Cara trasera */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)] p-5 sm:p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-5">
              <img
                src="/uploads/info.png"
                alt="info"
                className="w-8 sm:w-10 h-8 sm:h-10 opacity-80"
              />
              <img
                src="/uploads/chip.png"
                alt="chip"
                className="w-6 sm:w-8 h-6 sm:h-8 opacity-70"
              />
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-gray-700">
              <div className="flex items-center">
                <img
                  src="/uploads/email.png"
                  alt="email"
                  className="w-4 sm:w-5 h-4 sm:h-5 mr-3 opacity-70"
                />
                <span className="break-all">{participante.email}</span>
              </div>

              <div className="flex items-center">
                <img
                  src="/uploads/work.png"
                  alt="ocupación"
                  className="w-4 sm:w-5 h-4 sm:h-5 mr-3 opacity-70"
                />
                <span>{participante.ocupacion}</span>
              </div>

              <div className="flex items-center">
                <img
                  src="/uploads/twitter.png"
                  alt="twitter"
                  className="w-4 sm:w-5 h-4 sm:h-5 mr-3 opacity-70"
                />
                <a
                  href={`https://twitter.com/${participante.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-indigo-600 truncate"
                >
                  @{participante.twitter}
                </a>
              </div>
            </div>

            <div className="absolute bottom-3 left-0 right-0 text-center text-[10px] sm:text-xs text-gray-400">
              congreso-tics-2025.com
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gafete;
