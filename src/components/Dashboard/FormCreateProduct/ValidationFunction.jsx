export const validationFunction = (input) => {
    let errors = {}

    if(!input.title || /^([0-9])*$/.test(input.title)) errors.title = "Title is required and it can't be just numbers"


    if(input.price <= 0) errors.price = 'Price greater than 0'

    if(input.cantidad < 0 || input.cantidad % 1 !== 0) errors.cantidad = 'Stock must be an integer number greater than or equal to 0'

    if(!input.description || /^([0-9])*$/.test(input.description)) errors.description = "Description is required and it can't be just numbers"

    if(!input.categoriaId) errors.categoriaId = 'Category is required'

    if(!input.image || input.image.slice(0, 4) !== 'http' ) errors.image ='Image is required and must be an URL'

    return errors;
}