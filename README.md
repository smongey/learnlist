// Rails Instructions

1. 'rails new [your app name]'

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
* the [github page](https://github.com/plataformatec/devise) has full instructions but this is the next required command 'rails generate devise:install' which will giv you a list of things you need to do next
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
* push this all up to git and then heroku
* then the 'rake db:migrate' needs to be run on heroku, 'heroku run rake db:migrate'
* then feel free to style and update the devise views to get it all lookin nice
* delete the functionality we wont be using
* add account settings to the logged in navbar
	<li><%= link_to "Account Settings", edit_user_registration_path %></li>

18. Scaffolding
* run 'rails generate scaffold links description:string' will create a 'links' table in the db with one field 'desctiption' which is a string. 
* you can pass multiple fields in here which will be associated with 'links'
* 'links' could be anything really, posts, pins, whatever.
* by default the scaffold command will generate a scaffold.css.scss stylesheet which we dont really need, so next time make sure to pass in '--skip-stylesheets' with the generate scaffold command.
* try adding new items now and mess with creating, reading, editing, deleting them. CRUD, yea
* in the tutorial he scraps all the json stuff, which you don’t really have to do. It means you can also request this 'url/links.json' and it will return the json for the data. Whoop instant api.
* make sure you run 'rake db:migrate' to update the database. The push it all to github then push it to heroku and run 'heroku run rake db:migrate' also to update the heroku database
* if heroku gets out of date from local you can force push using 'git push -f heroku master'

19. Assocations
* Rails guides on (Assocations)[http://guides.rubyonrails.org/association_basics.html]
* run 'rails console' to inspect the data on the database, user 'Ctrl + D' to close the console down
* in console you can run 'User' to see all users and related info. Try 'user = User.first' and the 'user' to just see the first users info.
* to link the users and the links together you need to do a few things,
A. Edit the model files for user and link. For link do this
	belongs_to :user
B. then this for the user
	has_many :links
C. then through the rails console run 'rails generate migration add_user_id_to_pins user_id:integer:index' which will make a migration file with adds a user_id column to
D. now in the console you can set the user_id of a Link like so (dont forget to save)
	link = Link.first
	link #Check out the pin!
	link.user_id = 1
	link.save
* in order to add the userid with each new created link change 'Link.new' in links_controller.rb to
	current_user.pins.build

20. Authentication
* use if statements to check if items belong to the current user so only the signed in user can edit
	<% if link.user == current_user %>	
* add this code as another method within the links controller
	def correct_user
      @pin = current_user.pins.find_by(id: params[:id])
      redirect_to pins_path, notice: "Not authorized to edit this pin" if @pin.nil?
    end
* then add the before_action in the same file
	before_action :correct_user, only: [:edit, :update, :destroy]
	before_action :authenticate_user!, except: [:index, :show]
* below are two ways to do the same thing, show nothing if an item doesnt have a value rather than break the page and get an error
	<%= link.user.try(:email) %>
	<%= link.user.email if link.user %>

21. Images
* install [imagemagick](http://cactuslab.com/imagemagick/) on your machine
* install the [paperclip gem](https://github.com/thoughtbot/paperclip) in the project
* 'bundle install' and see the paperclip documentation for adding the following to the link model
	has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/:style/missing.png"
* then run 'rake db:migrate' to add this to the database
* then add the field to the link form
	<%= f.file_field :image, class: "field-class" %>
* then add multipart to the form_for do block like so
	form_for @pin, html: { multipart: true } do |f|
* then add ':image' to the link params in the links controller
* show the image on the page after upload like so
	<%= image_tag @link.image.url %>
* also add the image on the links index page and pass in different sizes like so
	<%= image_tag pin.image.url(:medium) %>
* then use the console to navigate and delete links if necessary
	rails console
	Link.first
	link = Link.first
	link.destroy
	Link.first.destroy
* heroku by default doesnt store images (or will but they’ll be removed after a bit) [this article](https://devcenter.heroku.com/articles/paperclip-s3) covers handling imagery using Amazon S3. 
