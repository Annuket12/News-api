const apikey = "5d2887494e294f26bb88383dd1de6326";

const blogContainer = document.getElementById("blog-container")
const seachField = document.getElementById("search-input")
const seachButton = document.getElementById("search-button")

async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error);
        return []
    }
}

seachButton.addEventListener("click",async()=>{
    const query = seachField.value;
    if(query !== ""){
        try{
            const articles = await fetchNewsQuery(query)
            displayBlogs(articles)
        }catch(err){
            console.log("Error fetching news by querry",err)
        }
    }
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    }catch(error){
        console.error("Error fetching random news",error);
        return []
    }
}




function displayBlogs(articles){
    blogContainer.innerHtml = ""
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card")
        const img = document.createElement("img");
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const truncatedTitlte = article.title.length>30?article.title.slice(0,30) + "....." : article.title;
        title.textContent = truncatedTitlte;
        const description = document.createElement("p")
        const truncateddesc = article.description.length>100?article.description.slice(0,100) + "....." : article.description;
        description.textContent = truncateddesc;
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogContainer.appendChild(blogCard)
    });
}



(async ()=>{
   try{
    const articles = await fetchRandomNews()
    displayBlogs(articles);
   } catch(error){
    console.error("Error fetching random news",error);
   }
})();