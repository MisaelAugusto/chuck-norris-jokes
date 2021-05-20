import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import api from '../../services/api';

import { useJokes } from '../../hooks/jokes';

import Input from '../../components/Input';

import ChuckNorrisImg from '../../assets/chuck-norris.jpg';

import {
  Container,
  Image,
  JokesFormContainer,
  Title,
  SubTitle,
  Divider,
  Button,
  Select,
  InputContainer,
  Label,
  ChangeCharacterNameForm,
  GetRandomJokesForm,
  JokesContainer,
  Joke,
  JokeContainer
} from './styles';

const Home: React.FC = () => {
  const { jokes, updateJokes, changeName, ChangeFavoriteState } = useJokes();

  const [categories, setCategories] = useState<string[]>([]);

  const [numberOfJokes, setNumberOfJokes] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const [character, setCharacterName] = useState({
    name: '',
    lastname: ''
  });

  useEffect(() => {
    api.get('categories').then(response => {
      setCategories(response.data.value);
    });
  }, []);

  const handleChangeCharacterName = useCallback(() => {
    if (character.name && character.lastname) {
      changeName(character.name, character.lastname);
    }
  }, [changeName, character.name, character.lastname]);

  const handleChangeName = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;

      setCharacterName({ name, lastname: character.lastname });
    },
    [character.lastname]
  );

  const handleChangeLastname = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const lastname = event.target.value;

      setCharacterName({ name: character.name, lastname });
    },
    [character.name]
  );

  const handleChangeNumberOfJokes = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const number = event.target.value;

      setNumberOfJokes(Number(number));
    },
    []
  );

  const handleSelectCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const category = event.target.value;

      setSelectedCategory(category);
    },
    []
  );

  const handleGetRandomJokes = useCallback(() => {
    updateJokes(numberOfJokes, selectedCategory);
  }, [updateJokes, numberOfJokes, selectedCategory]);

  const handleFavoriteAJoke = useCallback(
    (id: string) => {
      ChangeFavoriteState(id);
    },
    [ChangeFavoriteState]
  );

  return (
    <Container>
      <Image src={ChuckNorrisImg} alt="Chuck Norris" />
      <JokesFormContainer>
        <Title>Chuck Norris Jokes</Title>
        <SubTitle>
          You can customize the main character name and last name:
        </SubTitle>
        <ChangeCharacterNameForm>
          <InputContainer>
            <Label>Name</Label>
            <Input
              onChange={event => {
                handleChangeName(event);
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label>Last name</Label>
            <Input
              onChange={event => {
                handleChangeLastname(event);
              }}
            />
          </InputContainer>
          <Button onClick={handleChangeCharacterName}>CHANGE</Button>
        </ChangeCharacterNameForm>
        <Divider />
        <SubTitle>Now you can get one or more random jokes:</SubTitle>
        <GetRandomJokesForm>
          <InputContainer>
            <Label>How many jokes you want?</Label>
            <Input
              type="number"
              min={1}
              max={574}
              onChange={event => {
                handleChangeNumberOfJokes(event);
              }}
            />
          </InputContainer>
          <InputContainer>
            <Label>Select a specific category:</Label>
            <Select
              onChange={event => {
                handleSelectCategory(event);
              }}
            >
              <option value="">Select a category</option>
              {categories.map(category => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </Select>
          </InputContainer>
          <Button onClick={handleGetRandomJokes}>GET JOKES</Button>
        </GetRandomJokesForm>
        <SubTitle>
          {`You've got ${jokes.length} ${jokes.length > 1 ? 'jokes' : 'joke'}`}
        </SubTitle>
        <JokesContainer>
          {jokes.map(joke => {
            return (
              <JokeContainer>
                <Joke key={joke.id}>{joke.text}</Joke>
                <Button
                  onClick={() => {
                    handleFavoriteAJoke(joke.id);
                  }}
                >
                  {joke.favorited ? (
                    <MdFavorite size={24} />
                  ) : (
                    <MdFavoriteBorder size={24} />
                  )}
                </Button>
              </JokeContainer>
            );
          })}
        </JokesContainer>
      </JokesFormContainer>
    </Container>
  );
};

export default Home;
