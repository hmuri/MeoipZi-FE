import React, { ChangeEvent } from "react";
import styled from "styled-components";

interface TextInputProps {
    height?: number;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    multiline?: boolean;
  }

const Input = styled.input<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const TextArea = styled.textarea<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

const TextInput: React.FC<TextInputProps> = ({ height = 40, value, onChange, multiline = false }) => {
    if (multiline) {
      return <TextArea height={height} value={value} onChange={onChange} />;
    }
    return <Input height={height} value={value} onChange={onChange} />;
  };
  
  export default TextInput;
