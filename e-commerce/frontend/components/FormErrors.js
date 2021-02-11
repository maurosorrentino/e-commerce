import styled from 'styled-components';
import React from 'react';

const FormError = styled.div`

    padding: 2rem;
    background: white;
    margin: 2rem auto;
    border: 5px solid lightgreen;
    width: 70%;

    p {

    margin: 0;
    font-weight: 600;
    text-align: center;

    }

`;

const FormErrors = ({ formErrors }) => 

    <FormError>

        {Object.keys(formErrors).map((fieldName, i) => {

            if(formErrors[fieldName].length > 0) {

                return (

                    <p key={i}>Invalid {fieldName}: {formErrors[fieldName]}</p>

                )

            } else {

                return null;

            }

        })}

    </FormError>

;

export default FormErrors;