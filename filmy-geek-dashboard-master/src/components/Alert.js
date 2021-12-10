import Swal from 'sweetalert2'
const Alert = (
  title="Error",
  text,
  icon='error',
  confirmButtonText='Ok',
  confirmButtonColor='#e85e5e'
) => {

    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: confirmButtonText,
        confirmButtonColor: confirmButtonColor,
    }
    )

}

export default Alert
