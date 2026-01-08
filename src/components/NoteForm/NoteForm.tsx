import css from "./NoteForm.module.css";

import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useId } from "react";
import { type NoteTag } from "../../types/note.ts";
import * as Yup from "yup";

interface NoteFormProps {
  onSubmit: (content: NoteTag) => void;
  onCancel: () => void;
}

export default function NoteForm({ onSubmit, onCancel }: NoteFormProps) {
  const id = useId();

  const initVal: NoteTag = {
    title: "",
    content: "",
    tag: "Todo",
  };

  function handleSubmit(values: NoteTag, actions: FormikHelpers<NoteTag>) {
    onSubmit(values);
    actions.resetForm();
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Min length 3 simbols.")
      .max(50, "Max length 50 simbols.")
      .required("This field is required"),
    content: Yup.string().max(500, "Max length 500 simbols."),
    tag: Yup.string<
      "Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
    >().required("This field is required"),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initVal}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor={`${id}-title`}>Title</label>
          <Field
            type="text"
            id={`${id}-title`}
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-content`}>Content</label>
          <Field
            as="textarea"
            id={`${id}-content`}
            name="content"
            className={css.textarea}
            rows={8}
          />
          <ErrorMessage name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${id}-tag`}>Tag</label>
          <Field as="select" id={`${id}-tag`} name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button onClick={onCancel} type="button" className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}
