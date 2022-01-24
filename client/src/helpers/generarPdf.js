import { saveAs } from 'file-saver';

export const parseAndGenerarPDF = (data) => {
    const pdfBlob = new Blob([data], { type: 'application/pdf' });
    saveAs(pdfBlob, `Inventario${new Date().getFullYear()}`);
}