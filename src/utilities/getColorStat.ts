import { ruleOfThree } from '.'

export const getColorStat = (value: number, max: number): string => {
	const statProgress = ruleOfThree(value, max)

	if (statProgress >= 66) return 'bg-green-500'
	if (statProgress >= 33) return 'bg-amber-500'
	return 'bg-red-500'
}
