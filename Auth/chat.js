const PERSON_IMG = "https://koloro.ua/files/images/service-page/2461509417298.png";
var socket;
function appendMessage(name, img, side, text) {
    const msgHTML = `
      <div class="msg ${side}-msg">
        <div class="msg-img" style="background-image: url(${img})"></div>

        <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>

          <div class="msg-text">${text}</div>
        </div>
      </div>`;
    document.getElementById('chat').insertAdjacentHTML("beforeend", msgHTML);
    document.getElementById('chat').scrollTop += 500;
  }

  function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();
    return `${h.slice(-2)}:${m.slice(-2)}`;
  }

  function AddMessageClick(){
    event.preventDefault();
    var msgerInput = document.getElementById('input');
    const msgText = msgerInput.value;
    if (!msgText) return;
    appendMessage("Me", PERSON_IMG, "right", msgText);
    msgerInput.value = "";
    socket.emit(
        'sendMessage',
        {
            from: "User",
            text: msgText
        }
    )
  }

$(document).ready(function(){
    // під'єднуємось до сервера - створюєм новий сокет
    socket=io.connect('http://localhost:8080');
    //відправляємо повідомлення про під'єднання нового користувача
    socket.emit('joinclient', "is connected!");
    socket.on('toAllUsers', message => {
        console.log('toAllUsers -- client side', message);

    });
    socket.on('joinserver', message => {
        console.log('joinserver -- client side', message);
    });
    socket.on('sendMessage', message => {
        console.log('sendMessage -- client side', message);
        appendMessage(message.user, PERSON_IMG, "left", message.msg);
    });
});
