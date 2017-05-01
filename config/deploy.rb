# config valid only for current version of Capistrano
lock "3.8.1"

set :application, "crossorig.in"
set :repo_url, "git@github.com:hdf1986/crossorig.in.git"

set :branch, "api/master"

set :deploy_to, "/home/ubuntu/crossorig.in"

set :rbenv_type, :user
set :rbenv_ruby, File.read('.ruby-version').strip
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"
set :rbenv_map_bins, %w{rake gem bundle ruby rails puma pumactl}
set :rbenv_roles, :all # default value

set :bundle_binstubs, -> { shared_path.join('bin') }

# set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
# set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
# set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
# set :puma_access_log, "#{release_path}/log/puma.error.log"
# set :puma_error_log,  "#{release_path}/log/puma.access.log"
# set :puma_preload_app, true
# set :puma_worker_timeout, nil
# set :puma_init_active_record, false  # Change to true if using ActiveRecord

set :linked_files, fetch(:linked_files, []).push('.env.production')

# namespace :puma do
#   desc 'Create Directories for Puma Pids and Socket'
#   task :make_dirs do
#     on roles(:app) do
#       execute "mkdir #{shared_path}/tmp/sockets -p"
#       execute "mkdir #{shared_path}/tmp/pids -p"
#     end
#   end

#   before :start, :make_dirs
# end

namespace :nginx do
  task :restart do
    on roles(:app) do
      execute "sudo service nginx restart"
    end
  end
end

after "deploy:finished", "nginx:restart"