import familia from "@/assets/familia.png"

/** Genograma familiar: imagen provista para el caso (cuadrados = hombres,
 * círculos = mujeres, doble cuadrado = paciente, línea punteada = conviven). */
export function FamilyGenogram() {
  return (
    <figure className="mt-6 flex flex-col items-center gap-2">
      <img
        src={familia}
        alt="Genograma familiar: el paciente de 10 años vive con su madre, su padre, su hermana y su abuela"
        className="w-full max-w-md rounded-xl bg-white/90 p-4"
      />
      <figcaption className="text-center text-sm text-white/50">
        La línea punteada agrupa a quienes conviven con el paciente.
      </figcaption>
    </figure>
  )
}
