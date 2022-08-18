// Variabel target manipulasi DOM
const searchBox = document.querySelector(".search-box");
const element = document.getElementById("news");

//Link newsAPI
var options = 'https://newsapi.org/v2/top-headlines?country=us';

// Meninstansiasi promise
const displayNewsPromise = (url) => {
  return new Promise((resolve, reject) => {
    if (url != null) {
      let parsedData = "";
      fetch(url, {
        headers: {
          'x-api-key': 'dfb0aebf0cb64552b1a1da8efe1d6002'
        }
      })
        .then((response) => response.json())
        .then((data) => parsedData = data)
        .then(() => resolve(parsedData['articles']));
    } else {
      reject('Error');
      element.innerHTML = "<h5>No news data!</h5>";
    }
  })
};

const displayNews = async function(url) {
  try {
    let parsedData = await displayNewsPromise(url);
    let parsedNews = await parseNews(parsedData);
    let renderedNews = await renderNews(parsedNews);
  } catch (error) {
    console.log("Error: " + error);
  }
}

//Fungsi untuk mengumpulkan berita dalam HTML
function parseNews(data) {
  let parsedData = "";
  element.innerHTML = "<h5 class='text-center'>Loading data</h5>";

  if (data.length != 0) {
    data.forEach((datum) => {
      parsedData += `<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3">
      <div class="card mx-auto card-custom">
        <img src="${datum['urlToImage']}" class="card-img-top" alt="${datum['title']}">
        <div class="card-body">
          <h5 class="card-title">${datum['title']}</h5>
          <p class="card-text fs-6">${new Date(datum['publishedAt']).toLocaleDateString()} - ${new Date(datum['publishedAt']).toLocaleTimeString()}</p>
          <p class="card-text">${datum['description']}</p>
          <a href="${datum['url']}" class="btn btn-primary">Read More</a>
        </div>
    </div>
</div>`;
    });
    return parsedData;
  } else {
    parsedData = "<h5 class='text-center'>News not found!</h5>";
    return parsedData;
  }
}

//Fungsi untuk menampilkan berita yang sudah dikumpulkan
function renderNews(data) {
  return element.innerHTML = data;
}


//Fitur live search berita
searchBox.addEventListener('input', changeUrl);

function changeUrl(inputText) {
  let textUrl = inputText.target.value;
  if (textUrl.length >= 1) {
    options = `https://newsapi.org/v2/everything?q=${textUrl}&searchIn=title`;
    displayNews(options);   
  } else {
    options = `https://newsapi.org/v2/top-headlines?country=us`;
    displayNews(options);
  }
  console.log(options);
}

//Memanggil fungsi utama
displayNews(options);
