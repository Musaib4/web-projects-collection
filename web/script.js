document.querySelectorAll('.mega-menu__item').forEach(item => {
  const link = item.querySelector('.mega-menu__link');
  const dropdown = item.querySelector('.mega-menu__dropdown');

  // Open/close on click
  link.addEventListener('click', e => {
    e.preventDefault();

    // Close all others first
    document.querySelectorAll('.mega-menu__dropdown').forEach(menu => {
      if (menu !== dropdown) menu.classList.remove('active');
    });

    // Toggle this one
    dropdown.classList.toggle('active');
  });
});

// Optional: close menu if clicked outside
document.addEventListener('click', e => {
  if (!e.target.closest('.mega-menu__item')) {
    document.querySelectorAll('.mega-menu__dropdown').forEach(menu => {
      menu.classList.remove('active');
    });
  }
});

