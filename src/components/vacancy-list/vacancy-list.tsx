import { useEffect, useState } from 'react'
import { VacancyMock } from '../utils/mock'
import { IVacancy } from '../utils/types'
import './vacancy.css'

export function VacancyList() {
	const [searchQuery, setSearchQuery] = useState('');
	const [minSalary, setMinSalary] = useState('');
	const [maxSalary, setMaxSalary] = useState('');
	const [noExperienceRequired, setNoExperienceRequired] = useState(false);
	const [noSalarySpecified, setNoSalarySpecified] = useState(false);
	const [vacancies, setVacancies] = useState<IVacancy[]>([]);

	useEffect(() => {
		const mockData = VacancyMock(100);
		setVacancies(mockData);
	}, []);

	const filteredVacancies = vacancies.filter((vacancy) => {
		const matchName = vacancy.name.toLowerCase().includes(searchQuery.toLowerCase());
		const matchSalaryRange =
			(!minSalary || vacancy.salary >= parseInt(minSalary)) &&
			(!maxSalary || vacancy.salary <= parseInt(maxSalary));
		const matchNoExperience = !noExperienceRequired || vacancy.experience === 0;
		const matchNoSalary = !noSalarySpecified || vacancy.salary > 0;

		return matchName && matchSalaryRange && matchNoExperience && matchNoSalary;
	});

	return (
		<div>
			<div className="search-container">
				<input
					type="text"
					placeholder="Поиск по имени"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="search-input"
				/>
			</div>
			<div className="filter-container">
				
				<div className="salary-inputs">
					<input
						type="number"
						placeholder="От зарплаты"
						value={minSalary}
						onChange={(e) => setMinSalary(e.target.value)}
						className="salary-input"
					/>
					<input
						type="number"
						placeholder="До зарплаты"
						value={maxSalary}
						onChange={(e) => setMaxSalary(e.target.value)}
						className="salary-input"
					/>
				</div>
				<div className='checkbox'>
				<label>
					<input
						type="checkbox"
						checked={noExperienceRequired}
						onChange={(e) => setNoExperienceRequired(e.target.checked)}
					/>
					Не требуется опыт
				</label>
				<label>
					<input
						type="checkbox"
						checked={noSalarySpecified}
						onChange={(e) => setNoSalarySpecified(e.target.checked)}
					/>
					Нет указанной зарплаты
				</label>
				</div>
				
			</div>
			<ul>
				{filteredVacancies.map((vacancy) => (
					<li key={vacancy.id} className="vacancy-card">
						<h2>{vacancy.name}</h2>
						<p>Опыт: {vacancy.experience}</p>
						<p>Зарплата: {vacancy.salary} RUB</p>
						<p>Навыки: {vacancy.keySkills}</p>
						<p>Компания: {vacancy.company}</p>
						<p>Адрес: {vacancy.location}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
