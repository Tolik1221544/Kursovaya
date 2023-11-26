window.onload = function() {
  $('.submit.btn').on('click', (e) => call(e));

  const menuList = document.querySelectorAll('.menu-element');
  menuList.forEach(function(element) {
    element.addEventListener('click', (event) => {
      event.preventDefault();
      const elementLink = element.dataset.link;
      document.getElementById(elementLink).scrollIntoView({ behavior: 'smooth'});
    });
  });
}

function call (e) {
  e.preventDefault();
  const msg = $('#exampleForm').serialize();
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8000/predict',  // Обновленный URL
    cache: false,
    timeout:3000,
    data: msg,
    success: (data) => {
      $('#status').html('');
      console.log(data);
      showResult(data);
    },
    beforeSend: (data) => {
      $('#status').html('<p>Ожидание данных...</p>');
    },
    dataType:"json",  // json вместо html
    error: (data) => {
      $('#status').html('<p>Возникла неизвестная ошибка. Пожалуйста, попробуйте чуть позже...</p>');
    }
  });
}
function showResult(data) {
  const dataJSON = JSON.parse(data);
  $('#result').html('<p>Предсказанная цена: ' + dataJSON.predicted_price + '</p>');
}