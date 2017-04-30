Rails.application.routes.draw do
  match "/http:*path", controller: :proxy, action: :redirect, via: [:get, :post, :put, :delete]
  match "/https:*path", controller: :proxy, action: :redirect, via: [:get, :post, :put, :delete]
end
