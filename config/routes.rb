Rails.application.routes.draw do
  get 'home/index'

  resources :events

  root 'home#index'
end
