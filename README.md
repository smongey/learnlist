// Rails Instructions

1. $ rails new [your app name]

2. cd into the project folder

3. rails server

4. Set yo Git shit up

5. rails generate controller pages home
* add in the address when you run the server url/pages/home
* this command creates a controller and a view for this url address
* to undo/remove this run 'rails destroy controller pages'

6. set the home route in config/routes.rb 
* the home view from the pages controller will be added in here
* replace this with root pages#home to set the homepage to our generated homepage

7. set the page in the pages controller like so

	def about 
	end 

8. make a new view with the same naming convention
9. add the route to config/routes.rb like so

	get "about" => "pages#about"



