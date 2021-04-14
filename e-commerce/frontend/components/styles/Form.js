import styled, { keyframes } from 'styled-components';

const loading = keyframes`

  from {

    background-position: 0 0;
    /* rotate: 0; */
  }

  to {

    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`

  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  text-align: center;

  img {

    width: 200px;

  }

  @media only screen and (max-width: 300px) {

    img {

      width: 150px;

    }

  }

  .invalid {

    border: 5px solid red;

  }

  label {

    display: block;
    margin-bottom: 1rem;
    text-align: center;

  }

  input,
  textarea,
  select {

    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    text-align-last: center;
    border: 1px solid black;

  }
  
  button,
  input[type='submit'] {

    width: auto;
    background: green;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
    margin: 10px;

  }

  fieldset {

    border: 0;
    padding: 0;

    &[disabled] {

      opacity: 0.5;

    }

    &::before {

      height: 10px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #7FFF00 0%, #20B2AA 50%, #32CD32 100%);
    
    }
    
    &[aria-busy='true']::before {
    
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
     
    }
  }
`;

export default Form;
