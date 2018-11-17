import { configure } from "@storybook/react";

const req = require.context("../stories", true, /.(stories)|(story).js$/);

function loadStories() {
  require('./welcome');
  req.keys().forEach(file => req(file));
}

configure(loadStories, module);