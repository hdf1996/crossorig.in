require 'sinatra'
require 'httparty'
require 'pry'

set :protection, :except => :path_traversal
set :port, 3000

NON_PROXIABLE_HEADERS = ["Set-Cookie", "Connection", "Transfer-Encoding"].freeze

get '/http//:route_to_proxy' do
  @proxied_response = HTTParty.get("http://" + params['route_to_proxy'])
  @proxied_response.headers.canonical_each do |k, i|
    puts k unless NON_PROXIABLE_HEADERS.include? k
    next if NON_PROXIABLE_HEADERS.include? k
    headers[k] = i
  end
  @proxied_response.body
end
