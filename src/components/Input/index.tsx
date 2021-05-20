import React, {
  useRef,
  useState,
  useCallback,
  InputHTMLAttributes
} from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
}

const Input: React.FC<InputProps> = ({ name, type = 'text', ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <Container isFocused={isFocused} data-testid="input-container">
      <input
        {...rest}
        name={name}
        type={type}
        ref={inputRef}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div />
    </Container>
  );
};

export default Input;
