#!/usr/bin/env ruby

require 'rubygems'

require 'logger'
Logger.class_eval { alias :write :'<<' }
logger = ::Logger.new(::File.new("log/app.log","a+")
 
configure do
  use Rack::CommonLogger, logger
end

require './server/ruby/main'

run Pumatra