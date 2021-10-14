import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
 
 // Shape of form values
 interface FormValues {
   email: string;
   password: string;
 }
 
 interface OtherProps {
   message: string;
 }
 
 // Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
 const InnerForm = (props: OtherProps & FormikProps<FormValues>) => {
   const { touched, errors, isSubmitting, message } = props;
   return (
     <Form>
       <h1>{message}</h1>
       <div>
       		<div>
	       		<label htmlFor={"email"}>Email: </label>
		        <Field type="email" name={"email"}/>
		        {touched.email && errors.email && <div>{errors.email}</div>}
	       </div>
	       <div>
	       		<label htmlFor={"pwd"}>Password: </label>
	       		<Field type="password" name={"pwd"} label="password"/>
	       		{touched.password && errors.password && <div>{errors.password}</div>}
	       </div>
	 
	       <button type="submit" disabled={isSubmitting}>
	         Submit
	       </button>
       </div>
     </Form>
   );
 };
 
 // The type of props MyForm receives
 interface MyFormProps {
   message: string; // if this passed all the way through you might do this or make a union type
 }
 
 // Wrap our form with the withFormik HoC
 const MyForm = withFormik<MyFormProps, FormValues>({
   // Transform outer props into form values
   mapPropsToValues: props => {
     return {
       email: '',
       password: '',
     };
   },
 
   // Add a custom validation function (this can be async too!)
   validate: (values: FormValues) => {
     let errors: FormikErrors<FormValues> = {};
     if (!values.email) {
       errors.email = 'Required';
     } 
     return errors;
   },
 
   handleSubmit: values => {
     // do submitting things
   },
 })(InnerForm);

export default MyForm;
