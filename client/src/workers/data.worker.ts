addEventListener('message', (event) => {
  var message = event.data + ' hi';
  postMessage(message, null);
  close();
})