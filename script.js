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


			let tagList = ""
			for (var tag in tags) {
				tagList += `<a class="px-2" href="#">${tags[tag]}</a>`
			}

			var post = `
				<div class="row py-4">
					<div class="col-lg-11">
							<div class="hero-post shadow">
								<img class="col-md-4 img-fluid" alt="" src="${heroImage}">
								<div class="hero-post-badges">
									<a href="#"><i class="fa fa-calendar-o" aria-hidden="true"></i>28 June 2021</a>
									${tagList}
								</div>
								<div class="hero-post-content">
									<div class="row">
										<div class="col-md-3">
											<img alt="Author"class="img-fluid rounded-circle" src="${profileImage}">
										</div>
										<div class="col-md-9">
											${title}
										</div>
									</div>
								</div>
							</div>
					</div>

					</div>
				</div>
			`

			wrapper.innerHTML += post
		}
	})
}