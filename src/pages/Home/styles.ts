import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  height: 100vh;
  width: 80%;
  object-fit: cover;
`;

export const JokesFormContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Title = styled.h1`
  align-self: center;
`;

export const SubTitle = styled.p`
  margin: 1rem 0;
`;

export const Button = styled.button`
  height: 3rem;
  color: #e7d1be;
  padding: 0 1rem;
  font-weight: bold;
  margin-left: 4rem;
  border-radius: 0.4rem;
  background-color: #260801;
  transition: transform 0.2s;
  align-self: flex-end;

  &:hover {
    transform: scale(1.05);
  }
`;

export const Select = styled.select`
  display: flex;
  width: 12rem;
  height: 3rem;
  color: #48312c;
  padding: 0rem 1rem;
  background: #e7d1be;
  border-radius: 0.4rem;
  justify-content: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  & + div {
    margin-left: 1rem;
  }
`;

export const Label = styled.label`
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

export const ChangeCharacterNameForm = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  margin: 2rem 0 0.4rem;
  background-color: #260801;
`;

export const GetRandomJokesForm = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 2rem;
  align-items: center;
`;

export const JokesContainer = styled.div`
  width: 100%;
  height: 14rem;
  display: flex;
  padding: 0 2rem;
  overflow: scroll;
  overflow-x: hidden;
  padding-bottom: 0.4rem;
  flex-direction: column;
`;

export const JokeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & + div {
    margin-top: 0.8rem;
  }

  button {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Joke = styled.p`
  width: 40rem;
  padding: 0.8rem;
  text-align: center;
  border-radius: 0.4rem;
  background-color: #fbe4cf;
`;
