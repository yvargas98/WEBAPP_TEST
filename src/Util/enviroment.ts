export default (environment:EnvironmentStrings) => {
  const value = window._env_[environment];
  return value;
};