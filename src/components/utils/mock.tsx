import { faker } from '@faker-js/faker'
import { IVacancy } from './types'

export function VacancyMock (n: number): IVacancy[] {
	const res = []

	for (let i = 0; i < n; i++) {
		res.push({
      id: faker.string.uuid(),
      name: faker.word.adjective(),
			keySkills: faker.word.noun(),
			experience: faker.number.int({max: 6}),
			salary: faker.number.int({max: 100000}),
			location: faker.address.city(),
      company: faker.company.name(),
    })
	}
	return res
}