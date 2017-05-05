# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "crossorig.in"

set :repo_url, "git@github.com:hdf1986/crossorig.in.git"
set :branch, :master

set :deploy_to, "/home/ubuntu/app"

set :keep_releases, 2

set :bundle_bins, fetch(:bundle_bins, []).push('sass')

namespace :sass do
  task :compile do
    on roles(:all) do |host|
      execute "sass"
    end
  end
end

after "deploy:updated", "sass:compile"