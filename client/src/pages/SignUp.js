import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import { signup, removeMsg } from '../redux/actions/user/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: calc(100vh - 6rem);
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Form = styled.form`
	background-color: var(--color-primary);
	min-height: 20rem;
	width: 35rem;
	border-radius: 1rem;
	padding: 2rem 2rem;
`;

const Title = styled.h2`
	font-size: 2rem;
	margin: 0;
	padding: 0 0 2rem;
	color: #262626;
	text-align: center;
`;

const InputWrapper = styled.div`
	position: relative;
	& span {
		position: absolute;
		top: 1rem;
		left: 0;
	}
`;

const Input = styled.input`
	width: 100%;
	margin-bottom: 2rem;
	border: none;
	border-bottom: 2px solid #262626;
	outline: none;
	height: 4rem;
	color: #262626;
	background: transparent;
	font-size: 1.6rem;
	padding-left: 2rem;

	&:focus {
		border-bottom: 2px solid #e04c4c;
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const Button = styled.button`
	color: var(--color-primary);
	width: 80%;
	margin: 2rem auto;
	font-size: 1.6rem;
	border-radius: 1rem;

	&:hover {
		background-color: #e04c4c;
		opacity: 0.8;
	}
`;

const ErrorMsg = styled.h3`
	font-size: 1.4rem;
	color: var(--color-secondary);
	margin-bottom: 1rem;
	text-align: center;
`;

const SignupSchema = Yup.object({
	email: Yup.string().email('Invalid email').required(),
	password: Yup.string().required('Invalid password'),
});

const Signup = ({ errorMsg, signup }) => {
	const history = useHistory();

	const handleSubmit = async (values) => {
		await signup(values);
	}

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit:  async (values) => {
			handleSubmit(values);
		},
		validationSchema: SignupSchema,
	});
	return (
		<Wrapper>
			<Form onSubmit={formik.handleSubmit}>
				<Title>Sign up</Title>
				<ErrorMsg>{errorMsg && errorMsg}</ErrorMsg>
				<InputWrapper>
					<span>
						<FontAwesomeIcon icon="user" />
					</span>
					<Input
						id="email"
						name="email"
						type="email"
						onChange={formik.handleChange}
						value={formik.values.email}
						placeholder="Email"
					/>
				</InputWrapper>
				<InputWrapper>
					<span>
						<FontAwesomeIcon icon="key" />
					</span>
					<Input
						id="password"
						name="password"
						type="password"
						onChange={formik.handleChange}
						value={formik.values.password}
						placeholder="Password"
					/>
				</InputWrapper>
				<ButtonWrapper>
					<Button type="submit">Sign up</Button>
				</ButtonWrapper>
			</Form>
		</Wrapper>
	);
};

const mapStateToProps = ({ user }) => {
	return { errorMsg: user.errorMsg };
};


export default connect(mapStateToProps, { signup })(Signup);
