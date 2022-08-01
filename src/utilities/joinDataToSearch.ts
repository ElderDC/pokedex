export const joinDataToSearch = (...fields: string[]): string => {
	return fields.join('').trim().replace(' ', '').toLocaleLowerCase()
}
