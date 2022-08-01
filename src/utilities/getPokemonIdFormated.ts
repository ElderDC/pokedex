export const getPokemonIdFormated = (id: number): string => {
	return id.toString().padStart(4, '0')
}
