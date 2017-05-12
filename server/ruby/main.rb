#!/usr/bin/env ruby

require 'sinatra'
require 'httparty'
require 'logger'
 
set :protection, :except => :path_traversal
set :port, 3000


configure {
  set :server, :puma
}


class Pumatra < Sinatra::Base

  ::Logger.class_eval { alias :write :'<<' }
  access_log = ::File.join('log','access.log')
  access_logger = ::Logger.new(access_log)
  error_logger = ::File.new(::File.join('log','error.log'),"a+")
  error_logger.sync = true
 
  configure do
    use ::Rack::CommonLogger, access_logger
  end
 
   
  before {
    env["rack.errors"] =  error_logger
  }

  NON_PROXIABLE_HEADERS = ["Set-Cookie", "Connection", "Transfer-Encoding"].freeze

  get %r{/(http|https)(:)//(.*)} do
    proxied_response = HTTParty.get("#{params["captures"].first}://#{params['captures'].last}",
      query: request.env['rack.request.query_hash'])
    proxied_response.headers.canonical_each do |k, i|
      next if NON_PROXIABLE_HEADERS.include? k
      headers[k] = i
    end
    proxied_response.body
  end

  run! if app_file == $0
end