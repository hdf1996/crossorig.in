root = "#{Dir.getwd}"

bind "unix:///home/ubuntu/app/current/tmp/puma/socket"
pidfile "/home/ubuntu/app/current/tmp/puma/pid"
state_path "/home/ubuntu/app/current/tmp/puma/state"
rackup "/home/ubuntu/app/current/config.ru"

threads 4, 8

activate_control_app