import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Sección del banner con imagen de fondo extendida */}
      <div className="w-full bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            {/* Logo extendido de orilla a orilla */}
            <div className="w-full mb-6 md:mb-8">
              <img
                src="/uploads/logo-congreso.png"
                alt="Congreso TIC's"
                className="w-full h-auto max-h-48 md:max-h-64 object-contain object-center"
              />
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Congreso de Tecnologías de la Información
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete al evento más importante de tecnología e innovación. Conoce
              a los expertos, comparte conocimientos y haz networking.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="text-center">
          <button
            onClick={() => navigate("/participantes")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Entrar
          </button>

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-indigo-600 font-bold">👥</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Participantes</h3>
              <p className="text-gray-600">
                Conoce a todos los profesionales registrados
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-indigo-600 font-bold">📝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Registro</h3>
              <p className="text-gray-600">
                Únete como participante al congreso
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <span className="text-indigo-600 font-bold">🎫</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Gafetes</h3>
              <p className="text-gray-600">
                Visualiza tu identificación digital
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
