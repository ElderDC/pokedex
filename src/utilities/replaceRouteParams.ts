export const replaceRouteParams = (route: string, params: object): string => {
	Object.entries(params).forEach(([key, value]) => {
		route = route.replace(`:${key}`, value)
	})
	return route
}
