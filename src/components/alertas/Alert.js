import { useEffect } from "react";
import Swal from "sweetalert2";

export function Alert({ message, setError }) {

    useEffect(() => {
        msj();
    }, []);
    

    const msj = async() => {

        await Swal.fire({
            icon: 'error',
            title: message
        });

        setError("")
    }
    
   

  }