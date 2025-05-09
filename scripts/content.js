// document.addEventListener('DOMContentLoaded', function () {
//     // Your JavaScript code goes here
//     console.log('DOM is fully loaded and parsed!');

function ShowAllAction() {
    // toggle all

    const parent = document.querySelector('div[aria-label="My calendars"]');
    if (!parent) {
        console.warn("Parent element with aria-label 'My calendars' not found.");
        return;
    }

    const targets = parent.querySelectorAll('li > div');
    if (targets.length === 0) {
        console.warn("No target elements found within the parent.");
        return;
    }
    targets.forEach(el => el.click());
}

console.log('Hello');

const ShowAllButton = document.createElement("button");
ShowAllButton.type = 'button';
ShowAllButton.textContent = 'Toggle all';
//ShowAllButton.onclick = ShowAllAction;
ShowAllButton.addEventListener('click', ShowAllAction);

const buttons = document.querySelectorAll('button');
let MyCalendarsButton = null;
for (const button of buttons) {
    if (button.textContent.includes('My calendars')) {
        MyCalendarsButton = button;
        break;
    }
}
if (MyCalendarsButton && MyCalendarsButton.parentElement) {
    MyCalendarsButton.parentElement.parentElement.parentElement.parentElement.insertAdjacentElement("afterbegin", ShowAllButton);
} else {
    console.error("Could not find the 'My calendars' button or its parent to insert 'Toggle all' button.");
}
// });