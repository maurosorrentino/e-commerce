import styled from 'styled-components';

const Pagination = styled.div`

  text-align: center;
  margin: 2rem 0;
  border: 1px solid green;
  border-radius: 10px;
  margin: 1rem;

  li {

    list-style: none;
    display: inline-block;
    margin: 1rem;
    border: 1px solid green;
    border-radius: 5px;

  }

  li:hover, button:hover {

    cursor: pointer;

  }

  button {

    width: auto;
    background: green;
    color: white;
    border: 0;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;

  }

  button:disabled {

    opacity: 0.5;

  }

`;

export default Pagination;