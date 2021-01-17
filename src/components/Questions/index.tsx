import { Button, Container, Typography, Box, Avatar, Badge, Portal, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { IQuestion, IQuestions, IUser, IUsers } from '../../services/declarations'
import { QuestionItem } from '../QuestionItem'
import { Modal } from '../Modal'
import { useStyles } from './styles'

interface DefaultRootState {
	questions: IQuestions
	authedUser: string
	users: IUsers
}

export const Questions: React.FC = (props: any) => {

	const authedUser = useSelector((state: DefaultRootState) => state.authedUser)
	const questions = useSelector((state: DefaultRootState) => state.questions)
	const users = useSelector((state: DefaultRootState) => state.users)
	const [allQuestions, setAllQuestions] = useState(Object.values(questions))
	const [filterSelected, setFilterSelected] = useState(false)
	const classes = useStyles();

	const filteredUsers = Object.values(users).filter((user: IUser) => user.id !== authedUser)

	const filterQuestionsPerUser = (e: any, userID: string) => {
		e.preventDefault()
		const selectedUserQuetions = Object.values(questions).filter((question: IQuestion) => question.author === userID)
		setAllQuestions(selectedUserQuetions)
		setFilterSelected(!filterSelected)
	}
	const theme = useTheme().palette.primary.light
	return (
		<Container className={classes.root}>
			<Box component="div" className={classes.header}>
				<Typography className={classes.heading} variant="h1">Questions</Typography>
				<Box component="div" mt={2} >
					{
						filteredUsers.map((user: IUser) =>
							<Button
								color="primary"
								name={user.id}
								size="small"
								className={classes.button}
								startIcon={<Avatar alt={`Avatar from ${user.name}`} src={user.avatarURL} />}
								onClick={(e: any) => filterQuestionsPerUser(e, user.id)}
							>
								<Badge
									className={classes.badge}
									color={"primary"}
									badgeContent={Object.values(questions).filter((q: IQuestion) => q.author === user.id).length} >
								</Badge>
								{user.name}
							</Button>
						)
					}
				</Box>
			</Box>

			{ allQuestions.map((q: IQuestion) => <QuestionItem key={q.id} id={q.id} />)}

			<Portal>
				<Modal />
			</Portal>
		</Container>
	)
}
