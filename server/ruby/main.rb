#!/usr/bin/env ruby

require 'sinatra'
require 'httparty'

set :protection, :except => :path_traversal
set :port, 3000


configure {
  set :server, :puma
}


class Pumatra < Sinatra::Base

  enable :logging
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