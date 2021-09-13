import styled from "styled-components";

const SettingsStyle = styled.div`
  a {
    box-shadow: 0 10px 3rem green;
    display: block;
    margin: 4rem auto;
    width: 50%;
    text-align: center;
    padding: 3rem;
    font-size: 2rem;
  }

  a:hover,
  a:focus {
    color: green;
  }

  @media only screen and (max-width: 400px) {
    a {
      font-size: 1.5rem;
      padding: 1rem;
    }
  }
`;

export default SettingsStyle;
