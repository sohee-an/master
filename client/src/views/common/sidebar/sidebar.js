export function sidebar() {
  const navButton = document.querySelector('.navbar-burger');
  const sideMenu = document.querySelector('.side-menu');
  const closeButton = document.querySelector('.side-menu i');

  navButton.addEventListener('click', () => {
    sideMenu.classList.remove('hidden');
    document.body.insertAdjacentHTML('beforeend', `
      <div class="sidebar-bg"></div>
    `)

    const background = document.querySelector('.sidebar-bg');
    background.addEventListener('click', () => {
      sideMenu.classList.add('hidden');
      background.remove();
    })

    closeButton.addEventListener('click', () => {
      sideMenu.classList.add('hidden');
      background.remove();
    })
  })
}