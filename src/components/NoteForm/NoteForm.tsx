import css from "./NoteForm.module.css";

import { Field, Form, Formik } from "formik";
import { useId } from "react";

export default function NoteForm() {
  const id = useId();

  return (
    <Formik initialValues={} onSubmit={}>
      <Form className={css.from}></Form>
      <div className={css.formGroup}>
        <label htmlFor={`${id}-title`}>Title</label>
        <Field
          type="text"
          id={`${id}-title`}
          name="title"
          className={css.input}
        />
        <span name="title" className={css.error} />
      </div>
    </Formik>
  );
}
