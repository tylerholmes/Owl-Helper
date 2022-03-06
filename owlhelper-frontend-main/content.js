function getProfName() {
  var elements = document.getElementsByTagName("a");
  var searchText = "mailto:";
  var found = [];
  var foundElements = [];
  for (var i = 0; i < elements.length; i++) {
    if (elements[i].href.includes(searchText)) {
      found.push(elements[i].target);
      foundElements.push(elements[i]);
    }
  }

  fetch(`https://polar-castle-81292.herokuapp.com/professors`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(found)
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
      injectRatings(data, foundElements);
    });
}

function injectRatings(ratings, found) {
  for (let x = 0; x<found.length; x++) {
    let professorName = found[x].target.split(' ').join('%20');
    found[x].insertAdjacentHTML('afterend', `<a target="_blank" href="https://www.ratemyprofessors.com/search/teachers?query=${professorName}&sid=U2Nob29sLTQ4MQ==" id="two">${ratings[x]}</a>`);
    console.log(found[x]);
  }
}

// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  // If the received message has the expected format...
  if (msg.text === 'report_back') {
    // Call the specified callback, passing
    // the web-page's DOM content as argument
    console.log("Hello");
    getProfName();
  }
});