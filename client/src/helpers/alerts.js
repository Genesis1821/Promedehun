import Swal from 'sweetalert2';

export const pdfEnProcesoAlert = () => {
    Swal.fire({
        title: 'Generando PDF',
        html: 'Por favor espere un momento...',
        timerProgressBar: true,
        didOpen: () => Swal.showLoading()
    })
}


export const pdfGeneradoAlert = () => {
    Swal.fire({
        title: 'PDF Generado',
        icon: 'success',
        html: 'El inventario ha sido descargado.',
        confirmButtonColor: '#e0a371',
        confirmButtonText: 'Continuar',
    })
}
