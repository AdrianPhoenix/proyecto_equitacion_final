import { Link } from "react-router-dom";

const beneficios = [
  "Mejora física y motriz",
  "Desarrollo emocional",
  "Fomenta la autoestima",
  "Conexión con la naturaleza",
];

const Equinoterapia = () => {
  return (
    <section
      id="equinoterapia"
      className="py-24 px-4 md:px-8 bg-gradient-to-b from-primary/10 to-background text-center border-y border-solid border-primary/20 min-h-[60vh] flex flex-col items-center"
    >
      <h2 className="text-5xl md:text-6xl font-extrabold text-primary mb-4 font-merriweather relative inline-block">
        Equinoterapia
        <span className="block h-2 w-2/3 mx-auto bg-primary/30 rounded-full mt-2"></span>
      </h2>
      <p className="text-xl md:text-2xl text-custom-text max-w-3xl mx-auto mb-12 font-lora">
        Una experiencia transformadora que une la fuerza y nobleza del caballo con el bienestar físico, emocional y social de las personas.
      </p>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="text-left sm:text-center flex flex-col items-start sm:items-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 font-merriweather">
            ¿Qué es?
          </h3>
          <p className="text-lg md:text-xl text-text-light leading-relaxed mb-8">
            La equinoterapia es una terapia asistida con caballos que ayuda a mejorar la calidad de vida de personas con diversas condiciones físicas, emocionales y cognitivas. 
            <span className="block mt-2">
              Es una oportunidad única para crecer, sanar y conectar con la naturaleza a través de la relación con estos animales extraordinarios.
            </span>
          </p>
          <ul className="mb-8 w-full flex flex-wrap gap-3 justify-start sm:justify-center">
            {beneficios.map((b) => (
              <li
                key={b}
                className="bg-primary/10 text-primary px-4 py-2 rounded-full text-base font-semibold shadow-sm border border-primary/20"
              >
                {b}
              </li>
            ))}
          </ul>
          <Link
            to="/equinoterapia"
            className="inline-block py-3 px-10 bg-gradient-to-r from-primary to-primary-hover text-white text-lg rounded-full shadow-lg font-bold transition-transform hover:scale-105 hover:from-primary-hover hover:to-primary focus:outline-none focus:ring-4 focus:ring-primary/40"
          >
            Ver más sobre la equinoterapia
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <div className="relative group w-full max-w-md">
            <img
              src="./images/equinoterapia.png"
              alt="Equinoterapia en acción"
              className="w-full h-80 md:h-[28rem] object-contain bg-white rounded-3xl shadow-2xl border-4 border-primary/20 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-[0_8px_40px_0_rgba(0,0,0,0.25)]"
            />
            <span className="absolute bottom-4 right-4 bg-primary/80 text-white text-xs px-3 py-1 rounded-full shadow-md font-semibold tracking-wide">
              Terapia con caballos
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equinoterapia;