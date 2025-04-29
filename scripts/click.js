// toggle all

const parent = document.querySelector('div[aria-label="My calendars"]');
const targets = parent.querySelectorAll('li > div');

targets.forEach(el => el.click());
