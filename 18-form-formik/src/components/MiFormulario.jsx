import { useFormik } from "formik";
import * as yup from "yup";
import "animate.css";

export const MiFormulario = () => {
  //Validaciones
  const formValidation = yup.object().shape({
    nombre: yup
      .string()
      .min(2, "El nombre es muy corto")
      .max(40, "El nombre es muy largo")
      .required("Campo obligatorio"),
    email: yup.string().email("Email invalido").required("Campo requerido"),
  });

  const formik = useFormik({
    initialValues: {
      nombre: "",
      email: "",
    },
    validationSchema: formValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h2>Mi formulario de formik</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <br />
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.nombre}
            name="nombre"
            id="nombre"
          />
          {formik.errors.nombre && formik.touched.nombre && (
            <div className="error animate__animated animate__bounceInDown" style={{ color: "red" }}>
              {formik.errors.nombre}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            id="email"
          />
          <div className="error" style={{ color: "red" }}>
            {formik.errors.email && formik.touched.email && formik.errors.email}
          </div>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
