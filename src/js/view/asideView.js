const typeBtns = document.querySelectorAll('.game-type-btn')

export const makeActiveBtn = (button) => {
  typeBtns.forEach(btn => btn.classList.remove('active'))
  button.classList.add('active');
}