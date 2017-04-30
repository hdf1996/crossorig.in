class ProxyController < ApplicationController
  def redirect
    if method == :GET
      response = HTTParty.get(url)
      render plain: response.body, status: response.code
    end
  end

  private

  def query_params
    request.query_parameters
  end

  def method
    request.method.to_sym
  end

  def url
    @url ||= request.path[1..-1].gsub('http:/', 'http://').gsub('https:/', 'https://')
  end
end
