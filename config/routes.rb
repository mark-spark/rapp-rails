Rails.application.routes.draw do
  root 'index#index'

  post "pusher/auth" => "index#pusher_auth"
end
