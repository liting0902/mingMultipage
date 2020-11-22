import React, { PureComponent } from 'react'
import styled from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  color: ${props => props.primary ? 'white' : 
        'palevioletred'};
  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;
const Container = styled.div`
  text-align: center;
`

const Element = ({ red, className }) => {
  return (
    <div className={className}>
      <div className="element__img" />
      <div className="element__info">
        <div className="element__title" skyblue>
          Cute Puppy
        </div>
        <div className="element__description">
          Sed ut voluptatem neque cumque. Qui sed ut itaque est doloribus qui.
          Eos perferendis autem qui fugiat.
        </div>
      </div>
    </div>
  )
}

const StyledElement = styled(Element)`
  width: 80%;
  height: 300px;
  box-shadow: 0 0 5px 2px #ccc;
  .element__img {
    display: inline-block;
    width: 300px;
    height: 100%;
    background-image: url('this is background url');
  }
  .element__info {
    display: inline-block;
    vertical-align: top;
    width: calc(100% - 300px);
    height: 100%;
    text-align: left;
    .element__title {
      padding: 20px 0 0 20px;
      font-size: 48px;
      color: ${props => (props.red ? 'red' : 'black')};
    }
    .element__description {
      padding: 20px;
      font-size: 30px;
      font-style: italic;
      color: #888888;
    }
  }
`


export default class StyledComponents extends PureComponent {
  render() {
    return (
      <Container>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </Container>
    )
  }
}
