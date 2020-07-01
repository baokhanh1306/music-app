import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object({
	email: Yup.string().email('Invalid email').required(),
	password: Yup.string()
		.required('Invalid password')
		.min(4, 'Password is too short - should be 4 chars minimum.'),
});

const Login = () => {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
		validationSchema: LoginSchema,
	});
	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="email">Email</label>
			<input
				id="email"
				name="email"
				type="email"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			{formik.errors.email ? formik.errors.email : null}
			<label htmlFor="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				onChange={formik.handleChange}
				value={formik.values.password}
			/>
			{formik.errors.password ? formik.errors.password : null}
			<button type="submit">Submit</button>
		</form>
	);
};

export default Login;
