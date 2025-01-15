// src/components/styles.js
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

export const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h3`
  font-size: 18px;
  margin: 0;
`;

export const Email = styled.p`
  font-size: 14px;
  color: #555;
`;

export const CheckboxContainer = styled.div`
  margin-top: 8px;

  label {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;

    input[type="checkbox"] {
      transform: scale(1.2);
    }
  }
`;
