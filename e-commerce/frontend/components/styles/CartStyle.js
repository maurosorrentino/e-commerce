import styled from 'styled-components';

const CartStyle = styled.div`

    ul {

        list-style: none;
        padding: 0;
        margin: auto;
        width: 45rem;

    }

    li {

        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        margin-bottom: 1rem;

    }

    h1, p {

        margin: 1rem;
        text-align: center;
        font-weight: 600;
        color: green;

    }

    button {

        width: auto;
        background: red;
        color: white;
        border: 0;
        font-size: .7rem;
        font-weight: 600;
        padding: 0.5rem 1.2rem;
        border-radius: 4px;
        
      }

`;

export default CartStyle;