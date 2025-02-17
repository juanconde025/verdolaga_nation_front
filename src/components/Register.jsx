import { useState } from "react";
import { registerUser } from "../services/api";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "", lastname: "", email: "", username: "", password: "",
    age: "", phone: "", bio: "", photo: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let newErrors = {};
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 14) {
      newErrors.age = "Debes tener al menos 14 años.";
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const userData = { ...formData, age: parseInt(formData.age) };
      const response = await registerUser(userData);
      alert(`Usuario registrado con éxito: ${response.username}`);
    } catch (err) {
      setErrors({ general: "Error al registrar el usuario." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Sección de formulario */}
      <div className="auth-form">
        <h2>Registro de Usuario</h2>
        {errors.general && <p className="error">{errors.general}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Apellido" value={formData.lastname} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required />
          <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} required />
          {errors.password && <p className="error">{errors.password}</p>}
          <input type="number" name="age" placeholder="Edad" value={formData.age} onChange={handleChange} required />
          {errors.age && <p className="error">{errors.age}</p>}
          <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleChange} required />
          <textarea name="bio" placeholder="Biografía" value={formData.bio} onChange={handleChange} />
          <input type="text" name="photo" placeholder="URL de Foto" value={formData.photo} onChange={handleChange} />
          <button type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrar"}</button>
        </form>
        <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
      </div>

      {/* Sección de imagen */}
      <div className="auth-image" style={{ backgroundImage: "url('src/images/Hinchada.jpg')" }}>
        <p>Unete a la comunidad Verdolaga!</p>
      </div>
    </div>
  );
}

export default Register;
