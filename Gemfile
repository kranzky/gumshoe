# frozen_string_literal: true

source 'https://rubygems.org'

# Language
ruby '2.6.6'

# Framework
gem 'punk', '~> 0.4.1'
# gem 'punk', path: '../punk'

# Procedural Generation
# gem "weld", git: "https://github.com/jackcasey/weld.git", branch: "main"

# Development
group :development do
  gem 'gemfile_updater', '~> 0.1.0'
end

# Testing
group :test do
  gem 'capybara', '~> 3.35.3'
  gem 'coveralls_reborn', '~> 0.20.0'
  gem 'factory_bot', '~> 6.1.0'
  gem 'faker', '~> 2.17.0'
  gem 'rack-test', '~> 1.1.0'
  gem 'rspec', '~> 3.10.0'
  gem 'rspec-its', '~> 1.3.0'
  gem 'rubocop', '~> 1.11.0'
  gem 'rubocop-rails', '~> 2.9.1'
  gem 'rubocop-rspec', '~> 2.2.0'
  gem 'rubocop-sequel', '~> 0.2.0'
  gem 'selenium-webdriver', '~> 3.142.7'
  gem 'timecop', '~> 0.9.4'
  gem 'vcr', '~> 6.0.0'
  gem 'webmock', '~> 3.12.1'
end

# Non-production
group :development, :test do
  gem 'amazing_print', '~> 1.3.0'
  gem 'byebug', '~> 11.1.3'
  gem 'launchy', '~> 2.5.0'
end
