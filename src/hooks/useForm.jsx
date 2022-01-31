import { useState } from "react";

const useForm = () => {

    const [formValues, setFormValues ] = useState();

    const handleInputChange = (e) => {
        const { name, value} = e.target

        setFormValues({
            ...formValues,
            [name]: value  
        });
    }

    const resetValues = () => {
        setFormValues();
    }

    return {
        ...formValues,
        handleInputChange,
        resetValues
    }
}

export default useForm;