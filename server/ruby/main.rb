require 'sinatra'
require 'httparty'
require 'pry'

set :protection, :except => :path_traversal
set :port, 3000

NON_PROXIABLE_HEADERS = ["Set-Cookie", "Connection", "Transfer-Encoding"].freeze

before do

end

get %r{/(http|https)(:)//(.*)} do
  proxied_response = HTTParty.get("#{params["captures"].first}://#{params['captures'].last}",
    query: request.env['rack.request.query_hash'])
  proxied_response.headers.canonical_each do |k, i|
    next if NON_PROXIABLE_HEADERS.include? k
    headers[k] = i
  end
  proxied_response.body
end