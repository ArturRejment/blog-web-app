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

fetchData()

function fetchData() {
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


			let tagList = ""
			for (var tag in tags) {
				tagList += `<a class="px-2" href="#">${tags[tag]}</a>`
			}

			var post = `
					<div class="col-md-9 mb-5">
						<article class="blog-post shadow">
							<div class="row ">
								<div class="col-sm-4">
									<img alt="" class="img-fluid" style="height: 100%" src="${heroImage}">
								</div>
								<div class="col-sm-8">
									<div class="row pt-2">
										<img alt="" class="img-fluid rounded-circle col-md-2 " src="${profileImage}">
										<p class="col-sm-6 mt-4"> by ${personalData}</p>
										<div class="col-sm-3">
											${tagList}
										</div>
									</div>
									<h2>${title}</h2>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
								</div>
							</div>
						</article>
					</div>
			`

			wrapper.innerHTML += post
		}
	})
}