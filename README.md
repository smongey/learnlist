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


14. Make development, text and production versions in Gemfile
* made two group blocks like so
	group :development, :test do
		gem 'sqlite3'
	end
* this makes a development and testing version for local use
* then make a production block too
	group :production do
		gem 'pg'
		gem 'rails_12factor'
	end
* this is the production version that’ll be used up on heroku
* run 'bundle install --without production' and from now on just user 'bundle install' again. It will remember to leave out the gems in the production group

15. Heroku setup
* run 'heroku login' in the root of the project
* then run 'heroku create', this will give you the url of the new heroku project
* then run 'heroku keys:add' which will hook up your settings
* if theres trouble with the heroku setup remove the heroku 'git remote rm heroku'
* then add the git url from the 'heroku create' command 'git remote add heroku git@heroku.com:app_name'
* then push the files up to heroku like so 'git push heroku master'
* 'heroku open' will open the app in browser
* rename the app like so 'heroku rename app-name'
* add custom domain like so 'heroku domains:add web-address'

16. Devise for user management
* add the gem to the gemfile 'gem device', get the version from rubygems.org
* the github page has full instructions but this is the next required command 'rails generate devise:install' which will giv you a list of things you need to do next
* then generate devise views like so 'rails generate devise:views' which will spit out a folder inside views with all the files needed for users
* you can write a flash block into the application file like so
	<% flash.each do |name, msg| %>
		<%= content_tag(:div, msg, :class: "alert alert-#{name}") %>  
	<% end %>
* then make a user model like so 'rails generate devise user'
* reverse the generate with destroy like so 'rails destroy devise user'
* after youve made the model run 'rake db:migrate' to create the database tables
* restart the server for changes to take effect

17. Make Signup & Signin
* 'rake routes' check for all the routes in the app
* then use the the logic block in the home view like so
	<% if user_signed_in? %>
        # do something
    <% else %>
    	<p>
        	<%= link_to "Log in", new_user_session_path, class: "link_class" %>
        	<%= link_to "Sign up", new_user_registration_path, class: "link_class" %>
    	</p>
    <% end %> 
* you can see above the links are going to the url paths for different devise functionality




