import styled from "styled-components";

const inputStyleTemplate = () => {
  return `
    width: 100%;
    padding: 16px 22px;
    font-size: 14px;
    border: 1px solid transparent;
    border-radius: 5px;
    box-shadow: 0px 1px 4px rgba(25, 54, 54, 0.5);
    -webkit-appearance: none;
    transition: all .3s ease;
  
    &:focus, &:active {
      border: 1px solid rgba(25, 54, 54, 0.5);
      box-shadow: 0px 10px 14px rgba(25, 54, 54, 0.4);
    }
    
    &::placeholder {
      opacity: 0.55;
    }
    
    /*&:-webkit-autofill {
      -webkit-box-shadow: inset 0 0 0 50px black;
      -webkit-text-fill-color: blue;
    }*/
    
    &:read-only {
      color: gray;
    }
    
    &:read-only:focus{
      box-shadow: none;
      background-color: transparent;
    }
  `;
};

export const StyledInputGroup = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  ${({type}) => type === 'hidden' && `
    height: 0;
    margin: 0 !important;
    visibility: hidden;
    opacity: 0;
  `};
`;

export const StyledLabel = styled.label`
  padding-bottom: 3px;
  color: #717A86;
  font-size: 14px;
  text-align: left;
`;

export const StyledTextarea = styled.textarea`
  height: 200px;
  font-family: inherit;
  resize: none;
  border: none;
  outline: none;
  ${inputStyleTemplate}
`

export const StyledInput = styled.input`
  ${inputStyleTemplate}
`;

export const StyledDelayInput = styled.div`
  input {
    font-family: inherit;
    ${inputStyleTemplate}
  }
`;

export const StyledInputWrapper = styled.div`
  position: relative;
  ${({error}) =>
  error && `input, textarea {
      color: #D25C65;
      border: 1px solid #D25C65;
      box-shadow: 0 1px 4px rgb(219 36 36 / 50%);
      &:focus, &:active {
        border: 1px solid #D25C65;
        box-shadow: 0 5px 10px rgb(219 36 36 / 40%)
      }
    }`
  };
`;

export const StyledPasswordEye = styled.span`
  margin: 0;
  padding: 0;
  color: rgba(25, 54, 54, 0.5);
  font-size: 20px;
  position: absolute;
  bottom: 14px;
  right: 16px;
  cursor: pointer;
  opacity: 0.55;
  &:hover {
    opacity: 1;
  }
`;

export const StyledError = styled.div`
  padding-top: 3px;
  color: #D25C65;
  font-size: 12px;
  text-align: left;
`;

export const StyledSkeletonInput = styled.div`
  width: 100%;
  height: 49px;
  padding: 10px 12px;
  background-color: transparent;
  border: 1px solid #9DA6B6;
  border-radius: 5px;
  & > div {
    margin: 0;
  }
`;