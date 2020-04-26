import styled from 'styled-components/macro'

export const Loader = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

div {
  display: flex;
  flex-direction: row;
}
div div {
  height: 20px;
  width: 5px;
  background: #fe4a49;
  margin: 3px;
  border-radius: 25px;
}
div div:nth-child(1) {
  animation: loader 1s ease-in-out infinite -0.6s;
}
div div:nth-child(2) {
  animation: loader 1s ease-in-out infinite -0.5s;
}
div div:nth-child(3) {
  animation: loader 1s ease-in-out infinite -0.4s;
}
div div:nth-child(4) {
  animation: loader 1s ease-in-out infinite -0.3s;
}
div div:nth-child(5) {
  animation: loader 1s ease-in-out infinite -0.2s;
}
div div:nth-child(6) {
  animation: loader 1s ease-in-out infinite -0.1s;
}
div div:nth-child(7) {
  animation: loader 1s ease-in-out infinite 0s;
}

@keyframes loader {
  0% {
    transform: scaleY(1);
    background: #fed766;
  }
  25% {
    background: #009fb7;
  }
  50% {
    transform: scaleY(2);
    background: #59cd90;
  }
  75% {
    background: #fe4a49;
  }
  100% {
    transform: scaleY(1);
    background: #d91e36;
  }
}
`;