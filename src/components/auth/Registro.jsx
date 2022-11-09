import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../alertas/Alert";
import "../../style/components/auth/registro.css";
import { app } from '../../firebase/fb';

export function Register() {
  const { signup } = useAuth();

  const [user, setUser] = useState({
    email: "",
    password: "",
    nombre: "",
    imagen: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(user.email, user.password);
      await registrarUsuario(e);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const registrarUsuario = async(e) => {

    e.preventDefault();

        let request = {
            "name":user.nombre,
            "email":user.email,
            "img": user.imagen,
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };

        await fetch("http://localhost:1234/user/create", requestOptions)
        .then(response => response.json(response))
        .catch(error => console.error('Error:', error))
        .then(data => {
            const coleccionRef = app.firestore().collection("archivos");
            coleccionRef.doc(data._id).set({ id: data._id, url: user.imagen })
        })
    };


  

  const archivoHandler = async(e) => {

    if(e.target.files[0] === undefined) return;

    const img = e.target.files[0];
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(img.name);

    await archivoPath.put(img);

    const imgUrl = await archivoPath.getDownloadURL();
    setUser({...user, imagen: imgUrl});
}



  return (
    <div id="registro">
      {error && <Alert message={error} />}

      <img
        className="imgregistro"
        src="https://agrotendencia.tv/wp-content/uploads/2018/03/22-4-800x445.jpg"
      />

      <div className="divFormR">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <h1>Registro</h1>
          </div>

          <div>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              name="nombre"
              onChange={(e) => setUser({ ...user, nombre: e.target.value })}
              placeholder="Nickname"
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="example@example.com"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="*************"
            />
          </div>

          <div>
            <label htmlFor="imagen">Imagen</label>
            <input
              id="imgReg"
              type="file"
              accept='image/*'
              name="imagen"
              onChange={(e) => archivoHandler(e)}
              placeholder="example@example.com"
            />
          </div>

          <div>
            <button type="submit">Registrarse</button>
          </div>

            <div>
          <p>
            ¿Ya tienes una cuenta? &nbsp; 
            <Link to="/login">Login</Link>
          </p>
          </div>
        </form>
      </div>
    </div>
  );
}
