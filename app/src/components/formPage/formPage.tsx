import * as React from 'react';
import { Dispatch, SetStateAction } from "react";
import formPage from './formPage.module.css';
import MyForm from './form';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

const FormPage = ({ setRenderFormPage }: {setRenderFormPage: Dispatcher<boolean>}) => {

	const goToMainPage = () => {
		setRenderFormPage(false);
	}

	return (
	  <div className={formPage.form}>
	  	<h3 className={formPage.formHeader}>Hello from FormPage!!</h3>
	  	<MyForm message="hello world" />
	  	<button onClick={goToMainPage} >go to the main page</button>
	  </div>
	);
};

export default FormPage;
