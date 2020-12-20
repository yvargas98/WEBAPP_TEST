/// <reference types="react-scripts" />

type EnvironmentStrings = 'REACT_APP_API_URL';
interface Window {
  _env_: {
    [name in EnvironmentStrings]: string
  }
}