const fetchUser = (e) => {
  fetch("https://randomuser.me/api/")
    .then((response) => {
      if(!response.ok)
      {
        // Passing in the error handling part.
        throw new Error('Request failed')
      }
      return response.json();
    })
    .then((user) => {
      showUser(user);
      //  Note:- Everything is there inside the results[0] array of the api, so we need that.
      bgColor(user.results[0].gender);
    })
    .catch((error)=>{
      showError(error)
    })
}

const showError = (error)=>{
  document.querySelector('#parent').innerHTML = `<strong>${error}</strong>`
  document.querySelector('#image').src = ''
  document.querySelector('#image').alt = 'Error in Fetching'
}

function showUser(person) {
  const img = document.querySelector('#image')
  img.src = `${person.results[0].picture.large}`
  const parent = document.querySelector('#parent')
//   We've given the id='parent' to the div in which all of the elements are stored except for the image. 
  parent.childNodes[1].innerHTML = `<span>Name:</span>  ${person.results[0].name.first} ${person.results[0].name.last}`
  parent.childNodes[3].innerHTML = `<span>Age:</span> ${person.results[0].dob.age}`
  parent.childNodes[5].innerHTML = `<span>Gender:</span> ${person.results[0].gender}`
  parent.childNodes[7].innerHTML = `<span>Phone Number:</span> ${person.results[0].phone}`
  parent.childNodes[9].innerHTML = `<span>Location:</span> ${person.results[0].location.city}, ${person.results[0].location.country}`
}

function bgColor(gender) {
  if (gender === "male") {
    document.body.style.backgroundColor = "cadetblue";
  }
  if (gender === "female") {
    document.body.style.backgroundColor = "pink";
  }
}

const btn = document.getElementById("userGenerate")
btn.addEventListener("click",fetchUser)