import { useState } from 'react';
import './App.css';

const TASKS = [
	{ id: 'music-player', name: 'Music Player' },
	{ id: 'time-bomb', name: 'Time Bomb' },
	{ id: 'timer', name: 'Timer' },
	{ id: 'virtual-list', name: 'Virtual List' },
];

function App() {
	const [selectedTask, setSelectedTask] = useState(null);

	return (
		<div className='app-container'>
			<header className='top-bar'>
				<h1>React Demos</h1>
			</header>

			<div className='main-layout'>
				<aside className='left-bar'>
					<nav>
						<h2>Tasks</h2>
						<ul>
							{TASKS.map((task) => (
								<li key={task.id}>
									<button
										className={selectedTask === task.id ? 'active' : ''}
										onClick={() => setSelectedTask(task.id)}>
										{task.name}
									</button>
								</li>
							))}
						</ul>
					</nav>
				</aside>

				<main className='content'>
					{selectedTask ? (
						<div className='task-container'>
							<h2>{TASKS.find((t) => t.id === selectedTask)?.name}</h2>
							<p>Task component will be loaded here.</p>
						</div>
					) : (
						<div className='welcome'>
							<h2>Welcome to React Demos</h2>
							<p>Select a task from the left menu to get started.</p>
						</div>
					)}
				</main>
			</div>

			<footer className='footer'>
				<p>&copy; 2026 React Demos. @KonstrictorMan All rights reserved.</p>
			</footer>
		</div>
	);
}

export default App;
