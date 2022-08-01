export const getPathnameArrayFromUrl = (url: string): string[] => {
	const urlEntity = new URL(url)
	const { pathname } = urlEntity
	const pathnameArray = pathname.split('/').filter((item) => item !== '')
	return pathnameArray
}
