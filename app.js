/* Function to toggle the setup guide container */
const toggleArrow = document.querySelector('#dropdown');
const stepContainer = document.querySelector('#step-container');
const allStepContainerItems = Array.from(stepContainer.querySelectorAll('[role="menuitem"]'));

function closeMenu() {
    toggleArrow.setAttribute('aria-expanded', 'false');
    stepContainer.classList.remove('step-active');
    toggleArrow.classList.remove('drop-active');
    toggleArrow.focus(); // Focus back to toggleArrow
    stepContainer.addEventListener('keyup', handleEnterKeyPress);
}

function handleMenuItemNavigation(event, menuItemIndex) {
    const itemCount = allStepContainerItems.length;
    const nextIndex = (event.key === 'ArrowRight' || event.key === 'ArrowDown') ? (menuItemIndex + 1) % itemCount : (menuItemIndex - 1 + itemCount) % itemCount;
    allStepContainerItems[nextIndex].focus();
}

function handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
        openMenu();
    }
}

function handleEscapeKeyPress(event) {
    if (event.key === 'Escape') {
        closeMenu();
    }
}

function openMenu() {
    toggleArrow.setAttribute('aria-expanded', 'true');
    stepContainer.classList.add('step-active');
    toggleArrow.classList.add('drop-active');
    allStepContainerItems[0]?.focus(); // Focus the first menu item

    stepContainer.addEventListener('keyup', handleEscapeKeyPress);

    allStepContainerItems.forEach((menuItem, menuItemIndex) => {
        menuItem.addEventListener('keyup', (event) => handleMenuItemNavigation(event, menuItemIndex));
    });
}

toggleArrow.addEventListener('click', () => {
    toggleArrow.getAttribute('aria-expanded') === 'false' ? openMenu() : closeMenu();
});





/* handles the fuction for removing the select bar menu when the cancel button is clicked */
document.getElementById('cancel-btn').onclick = function () {
    document.getElementById('pricing-container').style.display = "none";
};


/* Script that handles the progress bar and checked count */
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const checkedCountDisplay = document.getElementById('checkedCount');
const progressFill = document.getElementById('progressFill');
let checkedCount = 0;

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            checkedCount++;
        }
        else {
            checkedCount--;
        }
        checkedCountDisplay.textContent = checkedCount;
        // Calculate percentage and update progress bar width
        const percentage = (checkedCount / checkboxes.length) * 100;
        progressFill.style.width = percentage + '%';
    });
});

// Function for the Alert and Menu drop down
document.addEventListener("DOMContentLoaded", function() {
    const getEl = (selector) => document.querySelector(selector);
    const storeContainer = getEl('#store-container');
    const dropDownMenu = getEl('#dropDownMenu');
    const alertContainer = getEl('#alertContainer');
    const notification = getEl('#notification');
    const allStoreItems = Array.from(dropDownMenu.querySelectorAll('[role="menuitem"]'));
    const allAlertItems = Array.from(alertContainer.querySelectorAll('[role="menuitem"]'));

    function closeDropdownsExcept(exceptDropdown) {
        [dropDownMenu, alertContainer].forEach(dropdown => {
            if (dropdown !== exceptDropdown) {
                dropdown.style.display = 'none';
            }
        });
    }

    function handleMenuToggle(event, dropdown, container, items) {
        event.stopPropagation();
        const isExpanded = container.getAttribute('aria-expanded') === 'true';
        closeDropdownsExcept(isExpanded ? null : dropdown);
        container.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
        dropdown.style.display = isExpanded ? 'none' : 'block';
        isExpanded ? closeMenu(dropdown, container, items) : openMenu(dropdown, container, items);
    }

    function closeMenu(dropdown, container, items) {
        container.focus();
        dropdown.style.display = 'none';
        items[0]?.focus();
    }

    function openMenu(dropdown, container, items) {
        container.focus();
        dropdown.style.display = 'block';
        items[0]?.focus();
    }

    function handleKeyEvents(event, dropdown, container, items) {
        const key = event.key;
        if (key === 'Escape') {
            closeMenu(dropdown, container, items);
        } else if (key === 'Enter') {
            openMenu(dropdown, container, items);
        } else if (key.startsWith('Arrow')) {
            const menuItemIndex = items.indexOf(document.activeElement);
            const itemCount = items.length;
            const nextIndex = (key === 'ArrowRight' || key === 'ArrowDown') ? (menuItemIndex + 1) % itemCount : (menuItemIndex - 1 + itemCount) % itemCount;
            items[nextIndex]?.focus();
        }
    }

    storeContainer.addEventListener('click', (event) => handleMenuToggle(event, dropDownMenu, storeContainer, allStoreItems));
    notification.addEventListener('click', (event) => handleMenuToggle(event, alertContainer, notification, allAlertItems));
    document.addEventListener('click', () => closeDropdownsExcept(null));
    [dropDownMenu, alertContainer].forEach(dropdown => {
        dropdown.addEventListener('keyup', (event) => handleKeyEvents(event, dropdown, dropdown === dropDownMenu ? storeContainer : notification, dropdown === dropDownMenu ? allStoreItems : allAlertItems));
    });
});


// Fuction to expand onboarding steps
let currentlyOpen = null;
let currentlyOpenImage = null;

function expandPanel(stepId) {
    const step = document.getElementById(stepId);
    const expandedPanel = step.querySelector('.package');
    const expandedImage = step.querySelector('.step-image');
    const outerDiv = step.closest('.step'); // Select the outer div
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    if (currentlyOpen !== expandedPanel) {
        if (currentlyOpen) {
            currentlyOpen.style.display = 'none';
            currentlyOpen.closest('.step').style.backgroundColor = ''; // Reset background color
        }

        expandedPanel.style.display = 'block';
        outerDiv.style.backgroundColor = '#F3F3F3'; // Set background color
        currentlyOpen = expandedPanel;
    }

    if (screenWidth >= 600) {
        if (currentlyOpenImage !== expandedImage) {
            if (currentlyOpenImage) {
                currentlyOpenImage.style.display = 'none';
            }
            expandedImage.style.display = 'block';
            currentlyOpenImage = expandedImage;
        }
    }
}

window.onload = function() {
    expandPanel('step1');
};

// Expand panel when checkbox is checked
function checkboxChanged(stepId, checkbox) {
    if (checkbox.checked) {
        expandPanel(stepId);
    }
}
                



