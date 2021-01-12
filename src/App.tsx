import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import { initiliazer } from "./actions";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { NavigationBar } from "./components/NavigationBar";
import { QuestionDetail } from "./components/QuestionDetail";
import { Questions } from "./components/Questions";

interface DefaultRootState {
	questions: any;
	users: any;
	authedUser: string
}

export const App: React.FC = React.memo(() => {
	const dispatch = useDispatch();
	const authedUser = useSelector((state: DefaultRootState) => state.authedUser)
	const users = useSelector((state: DefaultRootState) => state.users)
	const questions = useSelector((state: DefaultRootState) => state.questions)
	const isAuthed = authedUser != null
	const isInitialized = [Object.keys(users), Object.keys(questions)].every((el: any[]) => el.length > 0)

	useEffect(() => {
		dispatch(initiliazer())
	}, [dispatch])
	return jsx(isInitialized, isAuthed)
})

const jsx = (isInitialized: any, isAuthed: any) =>
	<>
		{
			(isAuthed && isInitialized) && <NavigationBar />
		}
		<Switch>
			{
				(isAuthed && isInitialized) &&
				<>
					<Route exact path="/" component={Questions} />
					<Route exact path="/questions" component={Questions} />
					<Route path="/questions/:id" component={QuestionDetail} />
					<Route path="/leaderboard" component={Dashboard} />
					{/* <Route path="/new" component={NewQuestion} /> */}
				</>
			}
			{
				(!isAuthed && isInitialized) &&
				<Route redirect="/login" component={Login} />
			}
		</Switch>
	</>
