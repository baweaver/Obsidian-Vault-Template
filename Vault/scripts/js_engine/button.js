export function button (parent, text, callback) {
  const button = parent.container.createEl('button', { text });

  button.addEventListener('click', async (event) => {
    event.preventDefault();
    callback(event);
  });

  return button;
}
