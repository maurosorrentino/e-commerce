import styled from 'styled-components';

const ItemStyle = styled.div`

  margin: 1rem;
  background: lightgreen;
  opacity: 0.6;
  border-radius: 10px;
  border: 5px solid greenyellow;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;

  img {

    width: 100%;
    height: 200px;
    object-fit: cover;

  }

  p {

    font-size: 12px;
    line-height: .3;
    font-weight: 300;
    flex-grow: 1;
    font-size: 1.5rem;

  }

  h1 {

    text-transform: uppercase;

  }

  .buttonList {

    display: grid;
    width: 100%;
    border-top: 1px solid lightgray;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: lightgray;

    & > * {

      background: white;
      border: 0;
      font-family: 'radnika_next';
      font-size: 1rem;
      padding: 1rem;

    }
  }
`;

export default ItemStyle;