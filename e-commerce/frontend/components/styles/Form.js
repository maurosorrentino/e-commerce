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

  border: 5px solid white;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin: 1rem;
  text-align: center;
  line-height: 1.5;
  font-weight: 600;
  font-size: 1.5rem;
  background: rgba(0, 0, 0, 0.02);

  img {

    width: 200px;

  }

  .invalid {

    border: 5px solid red;

  }

  label {

    text-align: center;
    margin-bottom: 1rem;
    display: block;

  }

  input,
  textarea,
  select {

    width: 100%;
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid black;
    text-align-last: center;

  }
  
  button,
  input[type='submit'] {

    font-size: 2rem;
    width: auto;
    color: white;
    border: 0;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    margin: 10px;
    background: green;

  }

  button:hover {

    cursor: pointer;

  }

  fieldset {

    padding: 0;
    border: 0;

    &[disabled] {

      opacity: 0.5;

    }

    &::before {

      content: '';
      background-image: linear-gradient(to right, #7FFF00 0%, #20B2AA 50%, #32CD32 100%);
      height: 10px;
      display: block;
    
    }
    
    &[aria-busy='true']::before {
    
      animation: ${loading} 0.5s linear infinite;
      background-size: 50% auto;
     
    }
  }

  @media only screen and (max-width: 330px) {

    img {

      width: 120px;

    }

    h1 {

      font-size: 1rem;

    }

    label {

      font-size: .8rem;

    }

    }

    @media only screen and (min-width: 700px) {

    img {

      width: 400px;

    }

  }

`;

export default Form;
