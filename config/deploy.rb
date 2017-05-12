# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "crossorig.in"

set :repo_url, "https://github.com/hdf1986/crossorig.in.git"
set :branch, :master

set :deploy_to, "/home/ubuntu/app"

set :keep_releases, 2

set :bundle_bins, fetch(:bundle_bins, []).push('sass')

set :rbenv_type, :user
set :rbenv_ruby, File.read('.ruby-version').strip
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails sass puma pumactl}
set :rbenv_roles, :all # default value

set :bundle_binstubs, -> { shared_path.join('bin') }

namespace :sass do
  task :compile do
    on roles(:all) do |host|
      within release_path do
        execute :sass, 'public/css/main.scss public/css/main.css'
      end
    end
  end
end

namespace :nginx do
  task :restart do
    on roles(:app) do
      execute "sudo service nginx restart"
    end
  end
end

namespace :puma do
  task :restart do
    on roles(:app) do
      within release_path do
        execute "kill $(cat tmp/puma/pid)"
        execute "bundle", " install --quiet --path vendor/bundle"
        execute "bundle", "exec puma -d --config config/puma.rb"
      end
    end
  end
end

after "deploy:published", :compile do
  invoke "sass:compile"
  invoke "puma:restart"
  invoke "nginx:restart"
end