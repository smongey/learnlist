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

10. add embedded ruby in the about view to create a link like so

	<%= link_to "here", "#" %>


11. Installing gems
* open Gemfile
* add 'gem [gemname]'
* stop server and run bundle install
* restart server
* update files as per specific gem docs

12. Page partials
* views/layouts/application.html.erb is the main application file
* make files like _nav.html.erb and save it into the layouts folder
* then use <%= render 'layouts/nav' %> to render that partial

13. Adding attributes to links like so
	
	<%= link_to "link text", "link location", class: "class-name-here" %>


14. 
