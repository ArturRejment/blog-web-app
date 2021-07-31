function getCookie(name) {
			let cookieValue = null;
			if (document.cookie && document.cookie !== '') {
				const cookies = document.cookie.split(';');
				for (let i = 0; i < cookies.length; i++) {
					const cookie = cookies[i].trim();
					// Does this cookie string begin with the name we want?
					if (cookie.substring(0, name.length + 1) === (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
const csrftoken = getCookie('csrftoken');

fetchBlogPosts()

function fetchBlogPosts() {
	var url = 'http://127.0.0.1:7000/post'

	fetch(url).then((resp) => resp.json()).then(function (data) {

		var list = data["posts"]

		var wrapper = document.getElementById("content-wrapper")

		for (var i in list) {
			var title = `<h2> ${list[i]["title"]} </h2>`
			var heroImage = list[i]["imageURL"]
			var profileImage = list[i]["author"]["imageURL"]
			var tags = list[i]["tagList"]
			var personalData = list[i]['author']['first_name'] + " " + list[i]["author"]["last_name"]
			let description = list[i]['description']


			let tagList = ""
			if (tags.length == 1) {
				tagList += `<a class="px-2" href="#">${tags[0]}</a>`
			}
			else {
				tagList += `<a class="px-2" href="#">${tags[0]}</a>`
				tagList += `<a class="px-2" href="#">${tags[1]}</a>`
			}

			var post = `
				<article class="blog__post shadow">
						<div class="row">
							<div class="col-lg-5">
								<img alt="" class="img-fluid" style="height: 100%" src="${heroImage}">
							</div>
							<div class="col-7 ">
								<div class="row pt-2 blog__post__content">
									<div class="col-3 col-lg-2">
										<img alt="" class="img-fluid rounded-circle blog-image" src="${profileImage}">
									</div>
									<p class="col-4 col-lg-6"> by ${personalData}</p>
									<div class="col-4 col-lg-3 blog__post__tags">
										${tagList}
									</div>
								</div>
								<h2>${title}</h2>
								<p>${description}</p>
							</div>
						</div>
					</article>
			`

			wrapper.innerHTML += post
		}
	})
}