export const checkCampos = (values) => {
    let ArraySets = Object.values(values);

    for (let set of ArraySets) {
        if ( set === '' || set === 'default' ) return 'error';
    }

    return 'exito';
}