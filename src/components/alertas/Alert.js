import Swal from "sweetalert2";

export function Alert({ message }) {
    
    Swal.fire({
        icon: 'error',
        title: message
    })

  }