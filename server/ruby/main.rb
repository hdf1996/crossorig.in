#!/usr/bin/env ruby

require 'sinatra'
require 'httparty'

set :protection, :except => :path_traversal
set :port, 3000


configure {
  set :server, :puma
}


class Pumatra < Sinatra::Base

  configure do
    enable :logging
    file = File.new("/home/ubuntu/app/current/log/#{settings.environment}.log", 'a+')
    file.sync = true
    use Rack::CommonLogger, file
  end

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

  run!
end