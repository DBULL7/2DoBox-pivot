var data = [];
var importance = ['None', 'Low', 'Normal', 'High', 'Critical']


$(document).ready(function() {
    getToDo();
    printToDo();
    hideOverTen();
})

$('#show-more').on('click', function(){
  clearCardSection()
  printToDo()
})


function hideOverTen() {
  var cards = $('.card')
  cards.each(function(i, card) {
    if(i >= 10) {
      $(card).hide()
    } else {
      $(card).show()
    }
  })
}


function Card(toDoTitle, toDoContent) {
    this.title = toDoTitle;
    this.body = toDoContent;
    this.priority = importance[2];
    this.id = Date.now();
    this.completed = false;
}


function storeToDo() {
    var stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


function getToDo() {
    var storedData = localStorage.getItem("Data Item") || '[]';
    var parsedData = JSON.parse(storedData);
    data = parsedData;  //Undeclared var so it's global
}

$('#show-completed').on('click', function(){
  clearCardSection()
  data.forEach(function(object) {
    if (object.completed == true){

      $("#card-section").append(`
        <article id="${object.id}" class="card grayCard">
        <header class="card-header">
          <h1 class="card-title grayedOut" contenteditable='true'>${object.title}</h1>
          <button class="clear" aria-label="Button to delete ToDo" aria-required="true"></button>
        </header>
        <article class="card-bottom">
          <p class='card-body grayedOut' contenteditable='true'>${object.body}</p>
          <div class="flex-card-bottom">
            <div class="card-bottom-left">
              <button class="upvote" aria-label="Button to upvote ToDo importance" aria-required="true"></button>
              <button class="downvote" aria-label="Button to downvote ToDo importance" aria-required="true"></button>
              <h3 class="quality-text">importance:
                <h4 class="quality">${object.priority}
                </h4>
              </h3>
            </div>
            <button class="completed-task" aria-label="Button to mark ToDo complete" aria-required="true">Completed
            </button>
          </div>
        </article>
        </article>`);
      }

    });
    printToDo()

  })


function printToDo() {
    data.forEach(function(object) {
      if (object.completed == false){
        htmlNormalCard(object)

    }
  })
}


function htmlNormalCard(object) {

  $("#card-section").append(`
<article id="${object.id}" class="card">
  <header class="card-header">
    <h1 class="card-title" contenteditable='true'>${object.title}</h1>
    <button class="clear" aria-label="Button to delete ToDo" aria-required="true"></button>
  </header>
  <article class="card-bottom">
    <p class='card-body' contenteditable='true'>${object.body}</p>
    <div class="flex-card-bottom">
      <div class="card-bottom-left">
        <button class="upvote" aria-label="Button to upvote ToDo importance" aria-required="true">
        </button>
        <button class="downvote" aria-label="Button to downvote ToDo importance" aria-required="true">
        </button>
        <h3 class="quality-text">importance:
          <h4 class="quality">${object.priority}
          </h4>
      </h3>
    </div>
      <button class="completed-task" aria-label="Button to mark ToDo complete" aria-required="true">Completed</button>
    </div>
  </article>
</article>`);
}


$('#card-section').on('click', '.completed-task', function() {
  $(this).closest('.card').find('.card-title').toggleClass('grayedOut')
  $(this).closest('.card').toggleClass('grayCard')
  $(this).closest('.card').find('.card-body').toggleClass('grayedOut')
  $(this).closest('.card').find('.quality-text').toggleClass('grayedOut')
  editCompletedStatus(this);
});


function editCompletedStatus(location) {
  var objectId = $(location).parent().parent().parent().attr('id');
  data = JSON.parse(localStorage.getItem('Data Item'));
  data.forEach(function(object){
    if (object.id == objectId){
      object.completed = !object.completed
      return object.completed;
    }
  })
  stringData = JSON.stringify(data);
  localStorage.setItem("Data Item", stringData);
}


function disableEnter() {
  $("#save-button").prop("disabled", true)
}



$('#title-input, #body-input').on("keyup keydown", function() {
  var countTitle = $('#title-input').val().length
  var countBody = $('#body-input').val().length
  counterTitle(countTitle)
  counterBody(countBody)

  if ((countTitle < 120) && (countBody < 120)) {
    if ((0 < countTitle) && (0 < countBody)) {
      $("#save-button").prop("disabled", false)
      revertInputColor()
    } else {
      $("#save-button").prop("disabled", true)
    }
  } else {
    $("#save-button").prop("disabled", true)
    changeInputColor(countTitle, countBody)
  }

})

function revertInputColor() {
  $('#title-input').css('background-color', 'white')
  $('#body-input').css('background-color', 'white')
}

function changeInputColor(countTitle, countBody) {
  if (countTitle > 120) {
    $('#title-counter').css('color', '#ed5a5a')
  } if (countTitle <= 120) {
    $('#title-counter').css('color', '#6d6e71')
  }
  if (countBody > 120) {
    $('#body-counter').css('color', '#ed5a5a')
  } if (countBody <= 120) {
    $('#body-counter').css('color', '#6D6E71')
  }
}

function counterTitle(count) {
  if (count <= 120) {
    $('#title-counter').text(count)
  }
}

function counterBody(count) {
  if (count <= 120) {
    $('#body-counter').text(count)
  }
}

function resetCounters() {
  $('#body-counter').text(0)
  $('#title-counter').text(0)
}


$("#save-button").on('click', function(e) {
    e.preventDefault();
    $("#card-section").html('')
    var storeToDoTitle = $('#title-input').val();
    var storeToDoContent = $('#body-input').val();
    var card = new Card(storeToDoTitle, storeToDoContent);
    data.unshift(card);
    storeToDo();
    printToDo();
    clearInput();
    resetCounters();
    disableEnter();
})


$("#card-section").on('click', '.upvote', upvote)

function upvote() {
  var qualityVar = $(this).siblings(".quality").text();
    switch (qualityVar) {
      case importance[0]:
        $(this).closest('.card').find('.quality').text("Low")
        qualityVar = "Low"
        changeImportance(this, qualityVar)
        break;
      case importance[1]:
          $(this).closest('.card').find('.quality').text("Normal")
          qualityVar = "Normal"
          changeImportance(this, qualityVar)
        break;
      case importance[2]:
        $(this).closest('.card').find('.quality').text("High")
        qualityVar = "High"
        changeImportance(this, qualityVar);
        break;
      default:
      $(this).closest('.card').find('.quality').text("Critical")
      qualityVar = "Critical"
      changeImportance(this, qualityVar);
    }
}


$("#card-section").on('click', '.downvote', downvote)

function downvote() {
  var qualityVar = $(this).siblings(".quality").text();
    switch (qualityVar) {
      case importance[4]:
        $(this).closest('.card').find('.quality').text("High")
        qualityVar = "High"
        changeImportance(this, qualityVar);
        break;
      case importance[3]:
        $(this).closest('.card').find('.quality').text("Normal")
        qualityVar = "Normal"
        changeImportance(this, qualityVar);
        break;
      case importance[2]:
          $(this).closest('.card').find('.quality').text("Low")
          qualityVar = "Low"
          changeImportance(this, qualityVar);
        break;
      default:
      $(this).closest('.card').find('.quality').text("None")
      qualityVar = "None"
      changeImportance(this, qualityVar);
    }
}


function changeImportance(location, qualityVar) {
    var objectId = $(location).closest('.card').attr("id");
    data = JSON.parse(localStorage.getItem("Data Item"));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.priority = qualityVar;
            return object.priority;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


$('#card-section').on('focus', '.card-title', function() {
  $(this).on('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(this).blur()
      return false
    }
  })
})


$('#card-section').on('focus', '.card-body', function() {
  $(this).on('keyup', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      $(this).blur()
      return false
    }
  })
})


$('#card-section').on('blur', '.card-title', function() {
    var newTitleText = $(this).text();
    editTitleText(this, newTitleText);
});


function editTitleText(location, newText) {
    var objectId = $(location).parent().parent().attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.title = newText;
            return object.title;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


$('#card-section').on('blur', '.card-body', function() {
    var newBodyText = $(this).text();
    editBodyText(this, newBodyText);
});
function editBodyText(location, newText) {
    var objectId = $(location).parent().parent().attr('id');
    data = JSON.parse(localStorage.getItem('Data Item'));
    data.forEach(function(object) {
        if (object.id == objectId) {
            object.body = newText;
            return object.body;
        }
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


$("#card-section").on('click', '.clear', deleteCardFromStorage)


function deleteCardFromStorage() {
  var idOfRemoved = $(this).parent().parent().attr("id")
  deleteCard(this, idOfRemoved);
  $(this).closest('.card').remove();
}


function deleteCard(location, idOfRemoved) {
    var objectId = $(location).parent().parent().attr("id");
    var removedId = idOfRemoved;
    data = JSON.parse(localStorage.getItem("Data Item"));
    data = data.filter(function(object) {
        return object.id != objectId;
    });
    stringData = JSON.stringify(data);
    localStorage.setItem("Data Item", stringData);
}


$('#search').on('keyup', search)

function search() {
  var searchInput = $('#search').val();
  var re = new RegExp(searchInput, 'igm');
  $('.card').each(function() {
      var title = $(this).find(".card-title").text();
      var body = $(this).find("article p").text();
      var match = (title.match(re) || body.match(re));
      if (!match) {
          $(this).hide();
      } else {
          $(this).show();
      }
  })
}


function clearInput() {
    $('#title-input').val('');
    $('#body-input').val('');
}


function clearCardSection() {
  $("#card-section").html('');
}

function clearCardSection() {
  $("#card-section").html('');
}


$('#importance-none').on('click', findImportanceNone)

function findImportanceNone() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.priority === 'None') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-low').on('click', findImportanceLow)

function findImportanceLow() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.priority === 'Low') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-normal').on('click', findImportanceNormal)

function findImportanceNormal() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.priority === 'Normal') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-high').on('click', findImportanceHigh)

function findImportanceHigh() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.priority === 'High') {
      htmlNormalCard(object)
    }
  })
}

$('#importance-critical').on('click', findImportanceCritcal)

function findImportanceCritcal() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.priority === 'Critical') {
      htmlNormalCard(object)
    }
  })
}


$('#importance-all').on('click', findImportanceAll)

function findImportanceAll() {
  clearCardSection()
  data.forEach(function(object) {
    if (object.completed === false) {
      htmlNormalCard(object)
    }
  })
}
