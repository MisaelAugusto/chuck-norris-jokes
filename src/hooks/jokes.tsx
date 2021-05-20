import React, { createContext, useCallback, useContext, useState } from 'react';
import api from '../services/api';

export interface Joke {
  id: string;
  text: string;
  favorited: boolean;
}

interface JokesState {
  name: string;
  lastname: string;
  jokes: Joke[];
}

interface JokesContextData {
  jokes: Joke[];
  ChangeFavoriteState(id: string): void;
  updateJokes(numberOfJokes: number, category: string): void;
  changeName(name: string, lastname: string): void;
}

const JokesContext = createContext<JokesContextData>({} as JokesContextData);

const JokesProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<JokesState>({
    name: '',
    lastname: '',
    jokes: []
  });

  const updateJokes = useCallback(
    async (numberOfJokes: number, category: string) => {
      let url = `jokes/random/${numberOfJokes}`;

      if (category) {
        url += `?limitTo=[${category}]`;
      }

      if (data.name && data.lastname) {
        url += url[-1] === ']' ? '&' : '?';

        url += `firstName=${data.name}&lastName=${data.lastname}`;
      }

      const response = await api.get(url);

      const jokes = response.data.value;

      const parsedJokes = jokes.map((joke: { id: number; joke: string }) => {
        return {
          id: joke.id,
          text: joke.joke,
          favorited: false
        };
      });

      setData({ name: data.name, lastname: data.lastname, jokes: parsedJokes });
    },
    [data]
  );

  const ChangeFavoriteState = useCallback(
    (id: string) => {
      const updatedJokes = data.jokes.map(joke => {
        if (joke.id === id) {
          return { id: joke.id, text: joke.text, favorited: !joke.favorited };
        }
        return joke;
      });

      setData({
        name: data.name,
        lastname: data.lastname,
        jokes: updatedJokes
      });
    },
    [data]
  );

  const changeName = useCallback(
    (name: string, lastname: string) => {
      if (name && lastname) {
        setData({ name, lastname, jokes: data.jokes });
      }
    },
    [data]
  );

  return (
    <JokesContext.Provider
      value={{
        jokes: data.jokes,
        updateJokes,
        changeName,
        ChangeFavoriteState
      }}
    >
      {children}
    </JokesContext.Provider>
  );
};

function useJokes(): JokesContextData {
  const context = useContext(JokesContext);

  if (!context) {
    throw new Error('useRecyclings must be used within a AuthProvider');
  }

  return context;
}

export { JokesProvider, useJokes };
